const express = require('express');

const router = express.Router();
// Importacion de rutas para usuarios
const signin = require('./user/signin');
const signup = require('./user/signup');
const contact = require('./user/contact');
const changetoprint = require('./user/changetoprint');
const getAllUsers = require('./user/getAllUsers');
// Final de rutas usuarios

// Importacion de rutas print
const printManagement = require('./print/printManagement');
const filamentManagement = require('./print/filamentManagement');
// Fin last

//Importacion de router service
const serviceManagement = require('./services/serviceManagement');
//Importacion de middleware auth token
const { ensureAuthenticated } = require('../../middlewares');

// Llamada de rutas de usuario
router.use('/user/signin', signin);
router.use('/user/signup', signup);
router.use('/user/contact', contact);
router.use('/user/changetoprint', changetoprint);
// Fin de llamadas

// Rutas de info y acciones para impresoras.active
router.use('/print/filament/', filamentManagement);
router.use('/print/', printManagement);
// Fin last

//Ruta de servicios
router.use('/service/', serviceManagement);

//Ruta obtener usuario
//

module.exports = router;
