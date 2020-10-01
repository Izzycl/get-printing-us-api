// Archivo de configuracion global de la api
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

require('dotenv').config();

// Importaciones de varias.
const dbhost = process.env.DB_HOST;
const middlewares = require('./middlewares');
const api = require('./api/routes/index');

const app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// Connexion a base de datos.
mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', err => {
  if (err) console.log(err);
  console.log('Connected successfully to server');
});
module.exports = app;
