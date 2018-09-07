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
const JOINS_STRUCTURE = {
  cooks: { gourmets: ['id', 'id'] },
  workshops: { bookings: ['id', 'workshop_id'] },
};

const knex = require('knex')(connection[process.env.NODE_ENV]);

async function findFirstWhere(tableName, value) {
  try {
    const query = knex(tableName)
      .whereNull('deleted_at')
      .where('id', value)
      .first();
    const result = await query;
    if (result) {
      return { data: result, message: 'success' };
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

const computeJoins = joins => (
  joins.map((join) => {
    const tableName = join[0];
    const tableToJoin = join[1];
    const joinAttrs = JOINS_STRUCTURE[tableName][tableToJoin];
    return `${join[2]} ${tableToJoin} ON ${tableName}.${joinAttrs[0]} = ${tableToJoin}.${joinAttrs[1]} AND ${tableToJoin}.deleted_at IS NULL`;
  }).join(' ')
);

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

      const tablesToJoin = [];
      SEARCHABLE_ATTRIBUTES[tableName].forEach((attr) => {
        const chunks = attr.split('.');
        if (chunks.length > 1 && !tablesToJoin.includes(chunks[0])) {
          tablesToJoin.push(chunks[0]);
        }
      });

      tablesToJoin.forEach(tableToJoin => joins.push([tableName, tableToJoin, 'INNER JOIN']));
    }

    // workshops has_bookings filter
    if (args.filter && 'has_bookings' in args.filter) {
      if (args.filter.has_bookings) {
        joins.push(['workshops', 'bookings', 'INNER JOIN']);
      } else {
        joins.push(['workshops', 'bookings', 'LEFT JOIN']);
        conditions.push('bookings.workshop_id IS NULL');
      }
    }

    // workshops has_been_archived filter
    if (args.filter && 'has_been_archived' in args.filter) {
      if (args.filter.has_been_archived) {
        conditions.push(`workshops.date < ${knex.fn.now()}`);
      } else {
        conditions.push(`workshops.date >= ${knex.fn.now()}`);
      }
    }
  }

  let totalQuery = `SELECT ${tableName}.* FROM ${tableName} ${computeJoins(joins)} WHERE ${conditions.join(' AND ')}`;
  let subsetQuery = totalQuery;

  if (!isEmpty(args.orderBy)) {
    subsetQuery = `${subsetQuery} ORDER BY ${args.orderBy.field} ${args.orderBy.order}`;
  }

  if (args.page) {
    const limit = args.limit || DEFAULT_LIMIT;
    subsetQuery = `${subsetQuery} LIMIT ${limit} OFFSET ${(args.page - 1) * limit}`;
  }

  console.log('totalQuery : ', totalQuery);
  console.log('subsetQuery : ', subsetQuery);

  try {
    let result;

    subsetQuery = knex.raw(subsetQuery);
    result = await subsetQuery;
    const rows = result.rows;

    if (args.page) {
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

      if (tableName === 'cooks') {
        updateArgs.confirmed = false;
      }

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
    return { userError: 'could not be updated (you should check if the resource exists)' };
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

async function performOperation(args, operationPromise, authorKey, resourcePromise) {
  const { is_admin: isAdmin, request_author_id: requestAuthorId } = args;
  let result;
  let isAllowed = isAdmin;
  if (!isAllowed) {
    let authorId;
    if (authorKey === 'id') {
      authorId = args.id;
    } else if (resourcePromise) {
      result = await resourcePromise;
      if (result.data) {
        authorId = result.data[authorKey];
      }
    }
    if (authorId) {
      isAllowed = authorId === requestAuthorId;
    }
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
