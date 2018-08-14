import connection from '../knexfile';
import {
  formatKnexQueryError,
  cleanKnexQueryArgs,
  isEmpty,
  first,
  last,
  get,
} from '../utils/utils';

let knex = require('knex')(connection[process.env.NODE_ENV]);

knex = knex.whereNull('deleted_at');

async function findFirstWhere(tableName, value, field = 'id') {
  try {
    const query = knex(tableName).where(field, value).first();
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
    const query = knex(tableName).where(field, value);
    result = await query;
  } catch (err) {
    console.error(err);
    return { userError: formatKnexQueryError(err) };
  }
  return { data: result };
}

const cursorCreatedAt = (tableName, cursorId) => `(SELECT created_at FROM ${tableName} WHERE id = '${cursorId}')`;

const addRangeClause = (query, tableName, args) => {
  if ('after' in args && 'before' in args) {
    return `${query} WHERE created_at > ${cursorCreatedAt(tableName, args.after)} AND created_at < ${cursorCreatedAt(tableName, args.before)}`;
  }
  if ('after' in args) {
    return `${query} WHERE created_at > ${cursorCreatedAt(tableName, args.after)}`;
  }
  if ('before' in args) {
    return `${query} WHERE created_at < ${cursorCreatedAt(tableName, args.before)}`;
  }
  return query;
};

const addLimitClause = (query, args) => {
  if ('first' in args) {
    return `${query} ORDER BY created_at ASC LIMIT ${args.first}`;
  }
  if ('last' in args) {
    return `${query} ORDER BY created_at DESC LIMIT ${args.last}`;
  }
  return `${query} ORDER BY created_at ASC`;
};

async function getConnection(tableName, args) {
  if ('first' in args && 'last' in args) {
    return { userError: 'first and last cannot be specified at the same time' };
  }
  if ('first' in args && args.first < 0) {
    return { userError: 'first cannot have a negative value' };
  }
  if ('last' in args && args.last < 0) {
    return { userError: 'last cannot have a negative value' };
  }

  let query = addRangeClause(`SELECT * FROM ${tableName}`, tableName, args);
  query = addLimitClause(query, args);

  try {
    query = knex.raw(query);
    const { rows } = await query;

    let hasNextPage = false;
    let hasPreviousPage = false;

    if ('last' in args) {
      let countQuery = addRangeClause(`SELECT COUNT(*) FROM ${tableName}`, tableName, args);
      countQuery = knex.raw(countQuery);
      const result = await countQuery;
      hasPreviousPage = result.rows[0].count > rows.length;
    } else if ('after' in args) {
      let countQuery = `SELECT COUNT(*) FROM ${tableName} WHERE created_at <= ${cursorCreatedAt(tableName, args.after)}`;
      countQuery = knex.raw(countQuery);
      const result = await countQuery;
      hasPreviousPage = result.rows[0].count > 0;
    }

    if ('first' in args) {
      let countQuery = addRangeClause(`SELECT COUNT(*) FROM ${tableName}`, tableName, args);
      countQuery = knex.raw(countQuery);
      const result = await countQuery;
      hasNextPage = result.rows[0].count > rows.length;
    } else if ('before' in args) {
      let countQuery = `SELECT COUNT(*) FROM ${tableName} WHERE created_at >= ${cursorCreatedAt(tableName, args.before)}`;
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

async function insertObject(tableName, args) {
  try {
    const createArgs = cleanKnexQueryArgs(args);
    const query = knex(tableName).insert(createArgs).returning('*');
    const result = await query;
    if (result.length) {
      return { data: result[0], message: 'success' };
    }
  } catch (err) {
    console.error(err);
    return { userError: formatKnexQueryError(err) };
  }
  return { userError: 'failure' };
}

async function updateObject(tableName, args, idField = 'id') {
  try {
    const updateArgs = cleanKnexQueryArgs(args);
    delete updateArgs.id;
    if (isEmpty(updateArgs)) {
      return { message: 'not modified' };
    }
    const query = knex(tableName)
      .where(idField, args.id)
      .update(updateArgs)
      .returning('*');
    const result = await query;
    if (result.length) {
      return { data: result[0], message: 'success' };
    }
  } catch (err) {
    console.error(err);
    return { userError: formatKnexQueryError(err) };
  }
  return { userError: 'failure' };
}

async function deleteObject(tableName, value, field = 'id') {
  try {
    let result = await findFirstWhere(tableName, value, field);
    if (result.userError) {
      return result;
    }
    const query = knex(tableName).where(field, value).update({ deleted_at: knex.fn.now() });
    result = await query;
    if (result > 0) {
      return { message: 'success' };
    }
  } catch (err) {
    console.error(err);
    return { userError: formatKnexQueryError(err) };
  }
  return { userError: 'failure' };
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

export {
  findFirstWhere,
  findWhere,
  insertObject,
  deleteObject,
  updateObject,
  getConnection,
  performOperation,
};
