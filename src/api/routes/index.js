const express = require('express');

const router = express.Router();
// Importacion de rutas para usuarios
const signin = require('./user/signin');
const signup = require('./user/signup');
const getAllUsers = require('./user/getAllUsers');
// Final de rutas usuarios

// Importacion de rutas print
const printManagement = require('./print/printManagement');
const filamentManagement = require('./print/filamentManagement');
// Fin last

//Importacion de middleware auth token
const { ensureAuthenticated } = require('../../middlewares');

// Llamada de rutas de usuario
router.use('/user/signin', signin);
router.use('/user/signup', signup);
// Fin de llamadas

// Rutas de info y acciones para impresoras.active
router.use('/print/filament/', filamentManagement);
router.use('/print/', printManagement);
// Fin last

//Ruta obtener usuario
//

module.exports = router;
