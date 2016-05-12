'use strict';

const bcrypt = require('bcrypt');
const uuid = require('node-uuid');
const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true
  },
  ddd: {
    type: String,
    required: true
  }
}, { _id: false });

const Schema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4
  },
  nome: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  telefones: [phoneSchema],
  data_criacao: {
    type: Date,
    default: Date.now
  },
  data_atualizacao: {
    type: Date,
    default: Date.now
  },
  ultimo_login: {
    type: Date,
    default: Date.now
  }
});

Schema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('senha')) return next();

  bcrypt.hash(user.senha, 8, (err, hash) => {
    if (err) {
      return next(err);
    }

    user.senha = hash;

    return next();
  });
});

Schema.methods.validatePassword = function (requestPassword) {
  const res = bcrypt.compareSync(requestPassword, this.senha);

  return res;
};

Schema.set('toObject', { transform, versionKey: false });

const UserModel = mongoose.model('User', Schema);

module.exports = UserModel;

function transform (doc, ret) {
  delete ret.senha;
  delete ret._id;

  ret.id = doc._id;
}
