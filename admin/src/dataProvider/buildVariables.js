import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  DELETE,
} from 'react-admin';
import isEqual from 'lodash.isequal';
import getFinalType from './getFinalType';
import isList from './isList';

const sanitizeValue = (type, value) => {
  if (type.name === 'Int') {
    return parseInt(value, 10);
  }
  if (type.name === 'Float') {
    return parseFloat(value);
  }
  return value;
};

const buildGetListVariables = introspectionResults => (
  resource,
  aorFetchType,
  params,
) => {
  const filter = Object.keys(params.filter).reduce((acc, key) => {
    if (key === 'ids') {
      return { ...acc, ids: params.filter[key] };
    }

    if (typeof params.filter[key] === 'object') {
      const type = introspectionResults.types.find(t => t.name === `${resource.type.name}Filter`);
      const filterSome = type.inputFields.find(t => t.name === `${key}_some`);

      if (filterSome) {
        const filterResult = Object.keys(params.filter[key]).reduce(
          (_acc, k) => ({
            ..._acc,
            [`${k}_in`]: params.filter[key][k],
          }),
          {},
        );
        return { ...acc, [`${key}_some`]: filterResult };
      }
    }

    const parts = key.split('.');

    if (parts.length > 1) {
      if (parts[1] === 'id') {
        const type = introspectionResults.types.find(t => t.name === `${resource.type.name}Filter`);
        const filterSome = type.inputFields.find(t => t.name === `${parts[0]}_some`);

        if (filterSome) {
          return {
            ...acc,
            [`${parts[0]}_some`]: { id: params.filter[key] },
          };
        }

        return { ...acc, [parts[0]]: { id: params.filter[key] } };
      }

      const resourceField = resource.type.fields.find(f => f.name === parts[0]);
      const type = getFinalType(resourceField.type);
      return { ...acc, [key]: sanitizeValue(type, params.filter[key]) };
    }

    const resourceField = resource.type.fields.find(f => f.name === key);

    if (resourceField) {
      const type = getFinalType(resourceField.type);
      const isAList = isList(resourceField.type);

      if (isAList) {
        return {
          ...acc,
          [key]: Array.isArray(params.filter[key])
            ? params.filter[key].map(value => sanitizeValue(type, value))
            : [sanitizeValue(type, params.filter[key])],
        };
      }

      return { ...acc, [key]: sanitizeValue(type, params.filter[key]) };
    }

    return { ...acc, [key]: params.filter[key] };
  }, {});

  return {
    limit: parseInt(params.pagination.perPage, 10),
    page: parseInt(params.pagination.page, 10),
    orderBy: { field: params.sort.field, order: params.sort.order },
    filter,
  };
};

const buildCreateUpdateVariables = introspectionResults => (
  resource,
  aorFetchType,
  params,
  queryType,
) => {
  const inputTypeName = queryType.args[0].type.ofType.name;
  const { inputFields } = introspectionResults.types.find(t => t.name === inputTypeName);
  const inputFieldsNames = inputFields.map(inputField => inputField.name);
  const booleanInputFieldsNames = inputFields.filter(inputField => inputField.type.name === 'Boolean').map(inputField => inputField.name);
  const data = Object.keys(params.data)
    .filter(param => inputFieldsNames.includes(param) && (
      !params.previousData
      || param === 'id'
      || !isEqual(params.data[param], params.previousData[param])
    ))
    .reduce((acc, key) => {
      acc[key] = params.data[key];
      return acc;
    }, {});

  booleanInputFieldsNames.forEach((inputName) => {
    if (!data[inputName]) {
      data[inputName] = false;
    }
  });

  const result = Object.keys(data).reduce((acc, key) => {
    if (Array.isArray(data[key])) {
      const arg = queryType.args.find(a => a.name === `${key}Ids`);

      if (arg) {
        return {
          ...acc,
          [`${key}Ids`]: data[key].map(({ id }) => id),
        };
      }
    }

    if (typeof data[key] === 'object' && data[key].id) {
      return {
        ...acc,
        [key]: { id: data[key].id },
      };
    }

    return {
      ...acc,
      [key]: data[key],
    };
  },
  {});

  return { [resource.type.name.toLowerCase()]: result };
};

export default introspectionResults => (
  resource,
  aorFetchType,
  params,
  queryType,
) => {
  switch (aorFetchType) {
    case GET_LIST: {
      return buildGetListVariables(introspectionResults)(
        resource,
        aorFetchType,
        params,
        queryType,
      );
    }
    case GET_MANY:
      return {
        filter: { ids: params.ids },
      };
    case GET_MANY_REFERENCE: {
      const parts = params.target.split('.');

      return {
        filter: { [parts[0]]: { id: params.id } },
      };
    }
    case GET_ONE:
      return { [`${resource.type.name.toLowerCase()}_id`]: params.id };
    case UPDATE: {
      return buildCreateUpdateVariables(introspectionResults)(
        resource,
        aorFetchType,
        params,
        queryType,
      );
    }
    case CREATE: {
      return buildCreateUpdateVariables(introspectionResults)(
        resource,
        aorFetchType,
        params,
        queryType,
      );
    }
    case DELETE: {
      return { [`${resource.type.name.toLowerCase()}_id`]: params.id };
    }
    default:
      return {};
  }
};
