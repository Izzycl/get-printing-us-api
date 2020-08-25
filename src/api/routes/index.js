const express = require('express');

const router = express.Router();
// Importacion de rutas para usuarios
const signin = require('./user/signin');
const signup = require('./user/signup');
// Final de rutas usuarios

// Importacion de rutas print
const addPrint = require('./print/addPrint');
const addFilament = require('./print/addFilament');
// Fin last

// Llamada de rutas de usuario
router.use('/user/signin', signin);
router.use('/user/signup', signup);
// Fin de llamadas

// Rutas de info y acciones para impresoras.active
router.use('/print/filament/add', addFilament);
router.use('/print/add', addPrint);
// Fin last

module.exports = router;
