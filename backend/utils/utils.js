exports.randomElement = array => array[Math.floor(Math.random() * array.length)];

exports.formatKnexQueryError = error => error.detail || error.error;

exports.cleanKnexQueryArgs = (args) => {
  const cleanedArgs = Object.assign({}, args);
  Object.entries(cleanedArgs).forEach(([key, value]) => {
    if (value === null) {
      delete cleanedArgs[key];
    }
  });
  return cleanedArgs;
};

exports.isEmpty = value => (
  value === undefined
  || value === null
  || (typeof value === 'object' && Object.keys(value).length === 0)
  || (typeof value === 'string' && value.trim().length === 0)
);

exports.last = (array) => {
  let result;
  if (Array.isArray(array) && array.length) {
    result = array[array.length - 1];
  }
  return result;
};

exports.first = (array) => {
  let result;
  if (Array.isArray(array) && array.length) {
    result = array[0];
  }
  return result;
};

const get = (object, path, defaultVal) => {
  const keys = Array.isArray(path) ? path : path.split('.');
  if (!object || !keys.length) {
    return object;
  }
  const result = object[keys[0]];
  if (result && keys.length > 1) {
    return get(result, keys.slice(1), defaultVal);
  }
  return result || defaultVal;
};

exports.get = get;
