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

async function getPage(tableName, args) {
  if (args.page <= 0) {
    return { userError: 'page must be strictly positive' };
  }
  if (args.limit < 0) {
    return { userError: 'limit cannot have a negative value' };
  }

  let totalQuery = `SELECT * FROM ${tableName}`;

  if (!isEmpty(get(args, 'filter.ids'))) {
    totalQuery = `${totalQuery} WHERE id IN (${args.filter.ids.map(id => `'${id}'`).join(',')}) AND deleted_at IS NULL`;
  } else {
    totalQuery = `${totalQuery} WHERE deleted_at IS NULL`;
  }

  let subsetQuery = totalQuery;

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

async function insertObject(tableName, args) {
  try {
    const createArgs = cleanKnexQueryArgs(args);
    const query = knex(tableName).insert(createArgs).returning('*');
    const result = await query;
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
  if (!isNil(args.page) || !isEmpty(args.filter)) {
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
