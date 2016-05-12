'use strict';

class NotFoundUserError extends Error {
  constructor (message) {
    super(message);

    this.name = 'NotFoundUserError';
    this.message = message;
    this.stack = (new Error()).stack;
  }
}

module.exports = NotFoundUserError;

