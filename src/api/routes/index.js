const express = require('express');

const router = express.Router();
// Importacion de rutas para usuarios
const signin = require('./user/signin');
const signup = require('./user/signup');
const getAllUsers = require('./user/getAllUsers');
// Final de rutas usuarios

// Importacion de rutas print
const addPrint = require('./print/addPrint');
const addFilament = require('./print/addFilament');
// Fin last

//Importacion de middleware auth token
const { ensureAuthenticated } = require('../../middlewares');

// Llamada de rutas de usuario
router.use('/user/signin', signin);
router.use('/user/signup', signup);
// Fin de llamadas

// Rutas de info y acciones para impresoras.active
router.use('/print/filament/add', ensureAuthenticated, addFilament);
router.use('/print/add', ensureAuthenticated, addPrint);
// Fin last

//Ruta obtener usuario
router.use('/user', ensureAuthenticated, getAllUsers);
//

module.exports = router;
