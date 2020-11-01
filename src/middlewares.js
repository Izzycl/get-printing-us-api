const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.use;

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

function ensureAuthenticated(req, res, next) {
  if (!req.get('Authorization')) return res.status(401).send({ message: 'Acceso restrigido, provea un token valido' });
  const token = req.get('Authorization');
  jwt.verify(token, process.env.TOKEN_KEY, (err, decode) => {
    if (err) return next(err);
    next();
  });
}

module.exports = {
  notFound,
  errorHandler,
  ensureAuthenticated
};
