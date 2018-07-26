exports.randomElement = array => array[Math.floor(Math.random() * array.length)];

exports.formatKnexQueryError = error => error.detail;

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
