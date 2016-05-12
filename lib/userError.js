'use strict';

class UserError extends Error {
  constructor (message) {
    super(message);

    this.name = 'UserError';
    this.message = message;
    this.stack = (new Error()).stack;
  }
}

module.exports = UserError;
