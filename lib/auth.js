'use strict';

const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'stubJWT';

module.exports = authorization;

function authorization (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ mensagem: 'Não autorizado' });
  }

  const token = req.headers.authorization.split(' ').pop();

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ mensagem: 'Sessão inválida' });
      }

      return res.status(403).json({ mensagem: 'Não autorizado' });
    }

    req.userId = decoded.id;

    return next();
  });
}

