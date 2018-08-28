import connection from '../knexfile';
import {
  formatKnexQueryError,
  cleanKnexQueryArgs,
  isEmpty,
  first,
  last,
  get,
  isNil,
} from '../utils/utils';

const DEFAULT_LIMIT = 10; // the same defined by react-admin
const SEARCHABLE_ATTRIBUTES = {
  workshops: ['name'],
  gourmets: ['first_name', 'last_name', 'username'],
  cooks: ['gourmets.first_name', 'gourmets.last_name', 'gourmets.username'],
  kitchens: ['name'],
};
const JOIN_QUERIES = { cooks: { gourmets: ['id', 'id'] } };

const knex = require('knex')(connection[process.env.NODE_ENV]);

async function findFirstWhere(tableName, value) {
  try {
    const query = knex(tableName)
      .whereNull('deleted_at')
      .where('id', value)
      .first();
    const result = await query;
    if (result) {
      return { data: result };
    }
  } catch (err) {
    console.error(err);
    return { userError: formatKnexQueryError(err) };
  }
  return { userError: 'resource not found' };
}

async function findWhere(tableName, value, field = 'id') {
  let result = [];
  try {
    const query = knex(tableName)
      .whereNull('deleted_at')
      .where(field, value);
    result = await query;
  } catch (err) {
    console.error(err);
    return { userError: formatKnexQueryError(err) };
  }
  return { data: result };
}

const cursorCreatedAt = (tableName, cursorId) => `(SELECT created_at FROM ${tableName} WHERE id = '${cursorId}')`;

const addRangeClause = (query, tableName, args) => {
  if (args.after && args.before) {
    return `${query} WHERE created_at > ${cursorCreatedAt(tableName, args.after)} AND created_at < ${cursorCreatedAt(tableName, args.before)} AND deleted_at IS NULL`;
  }
  if (args.after) {
    return `${query} WHERE created_at > ${cursorCreatedAt(tableName, args.after)} AND deleted_at IS NULL`;
  }
  if (args.before) {
    return `${query} WHERE created_at < ${cursorCreatedAt(tableName, args.before)} AND deleted_at IS NULL`;
  }
  return `${query} WHERE deleted_at IS NULL`;
};

const addLimitClause = (query, args) => {
  if (!isNil(args.first)) {
    return `${query} ORDER BY created_at ASC LIMIT ${args.first}`;
  }
  if (!isNil(args.last)) {
    return `${query} ORDER BY created_at DESC LIMIT ${args.last}`;
  }
  return `${query} ORDER BY created_at ASC`;
};

async function getConnection(tableName, args) {
  if (!isNil(args.first) && !isNil(args.last)) {
    return { userError: 'first and last cannot be specified at the same time' };
  }
  if (args.first < 0) {
    return { userError: 'first cannot have a negative value' };
  }
  if (args.last < 0) {
    return { userError: 'last cannot have a negative value' };
  }

  let query = addRangeClause(`SELECT * FROM ${tableName}`, tableName, args);
  query = addLimitClause(query, args);

  try {
    query = knex.raw(query);
    const { rows } = await query;

    let hasNextPage = false;
    let hasPreviousPage = false;

    if (!isNil(args.last)) {
      let countQuery = addRangeClause(`SELECT COUNT(*) FROM ${tableName}`, tableName, args);
      countQuery = knex.raw(countQuery);
      const result = await countQuery;
      hasPreviousPage = result.rows[0].count > rows.length;
    } else if (args.after) {
      let countQuery = `SELECT COUNT(*) FROM ${tableName} WHERE created_at <= ${cursorCreatedAt(tableName, args.after)} AND deleted_at IS NULL`;
      countQuery = knex.raw(countQuery);
      const result = await countQuery;
      hasPreviousPage = result.rows[0].count > 0;
    }

    if (!isNil(args.first)) {
      let countQuery = addRangeClause(`SELECT COUNT(*) FROM ${tableName}`, tableName, args);
      countQuery = knex.raw(countQuery);
      const result = await countQuery;
      hasNextPage = result.rows[0].count > rows.length;
    } else if (args.before) {
      let countQuery = `SELECT COUNT(*) FROM ${tableName} WHERE created_at >= ${cursorCreatedAt(tableName, args.before)} AND deleted_at IS NULL`;
      countQuery = knex.raw(countQuery);
      const result = await countQuery;
      hasNextPage = result.rows[0].count > 0;
    }

    const pageInfo = {
      hasNextPage,
      hasPreviousPage,
      startCursor: get(first(rows), 'id'),
      endCursor: get(last(rows), 'id'),
    };

    return {
      data: {
        pageInfo,
        edges: rows.map(result => ({
          cursor: result.id,
          node: result,
        })),
      },
    };
  } catch (err) {
    console.error(err);
    return { userError: formatKnexQueryError(err) };
  }
}

function computeJoins(tableName) {
  const result = [];
  const tablesToJoin = [];

  SEARCHABLE_ATTRIBUTES[tableName].forEach((attr) => {
    const chunks = attr.split('.');
    if (chunks.length > 1 && !tablesToJoin.includes(chunks[0])) {
      tablesToJoin.push(chunks[0]);
    }
  });

  tablesToJoin.forEach((table) => {
    const joinAttrs = JOIN_QUERIES[tableName][table];
    result.push(`INNER JOIN ${table} ON ${tableName}.${joinAttrs[0]} = ${table}.${joinAttrs[1]} AND ${table}.deleted_at IS NULL`);
  });

  return result;
}

async function getPage(tableName, args) {
  if (args.page <= 0) {
    return { userError: 'page must be strictly positive' };
  }
  if (args.limit < 0) {
    return { userError: 'limit cannot have a negative value' };
  }

  const conditions = [`${tableName}.deleted_at IS NULL`];
  const joins = [];

  if (!isEmpty(get(args, 'filter.ids'))) {
    conditions.push(`id IN (${args.filter.ids.map(id => `'${id}'`).join(',')})`);
  } else {
    // search filters
    if (Object.keys(SEARCHABLE_ATTRIBUTES).includes(tableName) && get(args, 'filter.q')) {
      conditions.push(`${SEARCHABLE_ATTRIBUTES[tableName].map(attr => `${attr} ILIKE '%${args.filter.q}%'`).join(' OR ')}`);
      joins.push(...computeJoins(tableName));
    }

    // workshops has_bookings filter
    if (tableName === 'workshops' && args.filter && 'has_bookings' in args.filter) {
      if (args.filter.has_bookings) {
        joins.push('INNER JOIN bookings ON bookings.workshop_id = workshops.id AND bookings.deleted_at IS NULL');
      } else {
        joins.push('LEFT JOIN bookings ON bookings.workshop_id = workshops.id AND bookings.deleted_at IS NULL');
        conditions.push('bookings.workshop_id IS NULL');
      }
    }
  }

  let totalQuery = `SELECT ${tableName}.* FROM ${tableName} ${joins.join(' ')} WHERE ${conditions.join(' AND ')}`;
  let subsetQuery = totalQuery;

  if (!isEmpty(args.orderBy)) {
    subsetQuery = `${subsetQuery} ORDER BY ${args.orderBy.field} ${args.orderBy.order}`;
  }

  if (args.page) {
    const limit = args.limit || DEFAULT_LIMIT;
    subsetQuery = `${subsetQuery} LIMIT ${limit} OFFSET ${(args.page - 1) * limit}`;
  }

  try {
    let result;

    subsetQuery = knex.raw(subsetQuery);
    result = await subsetQuery;
    const rows = result.rows;

    if (subsetQuery !== totalQuery) {
      totalQuery = knex.raw(totalQuery);
      result = await totalQuery;
    }

    const rowCount = result.rowCount;

    return {
      data: {
        items: rows,
        total: rowCount,
      },
    };
  } catch (err) {
    console.error(err);
    return { userError: formatKnexQueryError(err) };
  }
}

/* Checks if the object already exists and has been deleted */
async function objectExists(tableName, args) {
  switch (tableName) { // eslint-disable-line
    case 'gourmets':
    case 'cooks':
      return knex(tableName)
        .whereNotNull('deleted_at')
        .where('id', args.id)
        .first();
    case 'bookings':
      return knex(tableName)
        .whereNotNull('deleted_at')
        .where('gourmet_id', args.gourmet_id)
        .where('workshop_id', args.workshop_id)
        .first();
    case 'evaluations':
      return knex(tableName)
        .whereNotNull('deleted_at')
        .where('cook_id', args.cook_id)
        .where('author_id', args.author_id)
        .first();
  }
  return false;
}

async function insertObject(tableName, args) {
  try {
    let query;
    let result = await objectExists(tableName, args);
    if (result) {
      const updateArgs = {
        ...args,
        deleted_at: null,
        created_at: result.created_at,
        updated_at: knex.fn.now(),
      };
      query = knex(tableName)
        .where('id', result.id)
        .update(updateArgs)
        .returning('*');
    } else {
      const createArgs = cleanKnexQueryArgs(args);
      query = knex(tableName).insert(createArgs).returning('*');
    }
    result = await query;
    if (result.length) {
      return { data: result[0], message: 'success' };
    }
    return { userError: 'creation has failed' };
  } catch (err) {
    console.error(err);
    return { userError: formatKnexQueryError(err) };
  }
}

async function updateObject(tableName, args) {
  try {
    const updateArgs = cleanKnexQueryArgs(args);
    delete updateArgs.id;
    if (isEmpty(updateArgs)) {
      return { message: 'nothing to update' };
    }
    const query = knex(tableName)
      .whereNull('deleted_at')
      .where('id', args.id)
      .update(updateArgs)
      .returning('*');
    const result = await query;
    if (result.length) {
      return { data: result[0], message: 'success' };
    }
    return { userError: 'could not be updated (you should check the resource exists)' };
  } catch (err) {
    console.error(err);
    return { userError: formatKnexQueryError(err) };
  }
}

async function deleteObject(tableName, value) {
  try {
    const query = knex(tableName)
      .whereNull('deleted_at')
      .where('id', value)
      .update({ deleted_at: knex.fn.now() });
    const result = await query;
    if (result > 0) {
      return { message: 'success' };
    }
    return { userError: 'could not be deleted (you should check the resource exists)' };
  } catch (err) {
    console.error(err);
    return { userError: formatKnexQueryError(err) };
  }
}

async function performOperation(args, resourcePromise, operationPromise, authorKey = 'author_id') {
  const { is_admin: isAdmin, request_author_id: requestAuthorId } = args;
  let result;
  let isAllowed = isAdmin;
  if (!isAllowed) {
    result = await resourcePromise;
    isAllowed = result.data && result.data[authorKey] === requestAuthorId;
  }
  if (isAllowed) {
    result = await operationPromise;
  } else {
    result = { userError: 'cannot perform operation' };
  }
  return result;
}

async function performPagination(tableName, args) {
  let result;
  if (!isNil(args.page) || !isEmpty(args.filter) || !isEmpty(args.orderBy)) {
    result = await getPage(tableName, args);
  } else {
    result = await getConnection(tableName, args);
  }
  return result;
}

export {
  findFirstWhere,
  findWhere,
  insertObject,
  deleteObject,
  updateObject,
  performOperation,
  performPagination,
};
