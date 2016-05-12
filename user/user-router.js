'use strict';

const router = require('express').Router();

const Controller = require('./user-controller');

const auth = require('../lib/auth');

module.exports = userRouter;

function userRouter (db) {
  const controller = new Controller(db);

  router.post('/sign_up', controller.signUp.bind(controller));
  router.post('/sign_in', controller.signIn.bind(controller));

  router.use(auth);

  router.get('/buscar_usuario', controller.read.bind(controller));

  return router;
}
