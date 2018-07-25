exports.randomElement = array => array[Math.floor(Math.random() * array.length)];

exports.formatKnexQueryError = error => error.detail;
