const express = require("express");
const router = express.Router();
//Importacion de rutas para usuarios
const signin = require("./user/signin");
const signup = require("./user/signup");

//Final de rutas usuarios

//Llamada de rutas de usuario
router.use("/user/signin", signin);
router.use("/user/signup", signup);
//Fin de llamadas

module.exports = router;
