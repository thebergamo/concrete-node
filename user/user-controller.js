'use strict';

const jwt = require('jsonwebtoken');

const UserError = require('../lib/userError');
const NotFoundUserError = require('../lib/notFoundUserError');

const errorParser = require('../lib/validation');

class UserController {
  constructor (db) {
    this.db = db;
    this.model = db.User;
  }

  signIn (req, res) {
    req.assert('email', 'É obrigatório').notEmpty();
    req.assert('email', 'Necessário um email válido').isEmail();
    req.assert('senha', 'É obrigatória').notEmpty();

    let errors = this.validate(req);

    if (errors) {
      return res.status(400).json(errors);
    }

    const credentials = req.body;

    this.model.findOneAsync({ email: credentials.email })
      .then((user) => {
        if (!user) {
          throw new UserError('Usuário e/ou senha inválidos');
        }

        const validPassword = user.validatePassword(credentials.senha);

        if (!validPassword) {
          throw new UserError('Usuário e/ou senha inválidos');
        }

        return this.model.findOneAndUpdateAsync({ _id: user._id }, { ultimo_login: Date.now() });
      })
      .then((user) => {
        const token = getToken(user);

        user = user.toObject();

        user.token = token;

        res.status(200).json(user);
      })
      .catch(UserError, (err) => res.status(401).json({ mensagem: err.message }))
      .catch((err) => res.status(500).json({ mensagem: err.message }));
  }

  signUp (req, res) {
    req.assert('nome', 'É obrigatório').notEmpty();
    req.assert('email', 'É obrigatório').notEmpty();
    req.assert('email', 'Necessário um email válido').isEmail();
    req.assert('senha', 'É obrigatória').notEmpty();
    req.assert('senha', 'Deve ser ter entre 6 e 20 caracteres').len(6, 20);

    let errors = this.validateSignUp(req);

    if (errors) {
      return res.status(400).json(errors);
    }

    this.model.createAsync(req.body)
      .then((user) => {
        const token = getToken(user);

        user = user.toObject();
        user.token = token;

        res.status(201).json(user);
      })
      .catch((err) => {
        if (err.name === 'MongoError' && err.code === 11000) {
          return res.status(400).json({ mensagem: 'E-mail já existente' });
        }

        return res.status(500).json({ mensagem: err.message });
      });
  }

  read (req, res) {
    const _id = req.userId;

    this.model.findOneAsync({ _id })
      .then((user) => {
        if (!user) {
          throw new NotFoundUserError('Usuário não encontrado');
        }

        user = user.toObject();

        res.json(user);
      })
      .catch(NotFoundUserError, (err) => res.status(404).json({ mensagem: err.message }))
      .catch((err) => res.status(500).json({ mensagem: err.message }));
  }

  validate (req) {
    return errorParser(req.validationErrors());
  }

  validateSignUp (req) {
    let errors = this.validate(req) || [];

    const phones = req.body.telefones;

    if (!phones || !Array.isArray(phones) || phones.length === 0) {
      let mensagem = 'telefones: É obrigatório especificar pelo menos 1';
      errors.push({ mensagem });
      return errors;
    }

    phones.forEach((phone) => {
      if (!phone) return;

      if (!phone.numero) {
        let mensagem = 'numero: É obrigatório';
        errors.push({ mensagem });
      } else if (phone.numero.length < 8 || phone.numero.length > 9) {
        let mensagem = 'numero: É está em um formato inválido';
        errors.push({ mensagem });
      }

      if (!phone.ddd) {
        let mensagem = 'ddd: É obrigatório';
        errors.push({ mensagem });
      } else if (phone.ddd.length < 2 || phone.ddd.length > 3) {
        let mensagem = 'ddd: É está em um formato inválido';
        errors.push({ mensagem });
      }
    });

    return errors.length !== 0 ? errors : null;
  }
}

module.exports = UserController;

function getToken (user) {
  const secretKey = process.env.SECRET || 'stubJWT';

  return jwt.sign({
    id: user._id,
    last_login: user.ultimo_login
  }, secretKey, { expiresIn: '30m' });
}
