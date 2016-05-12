'use strict';

module.exports = errorParser;

function errorParser (errors) {
  if (!Array.isArray(errors)) {
    errors = [errors];
  }

  let ret = [];

  errors.forEach((err) => {
    if (!err) {
      return;
    }

    ret.push({ mensagem: `${err.param}: ${err.msg}` });
  });

  return ret.length !== 0 ? ret : null;
}

