const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const bcrypt = require('bcrypt');
const ModelUser = require('../../model/ModelUser');

// Importacion de archivos de validacion
const vSignUpNormal = require('../../helpers/validations/vSignUpUser');
// Importacion end

//Configuraciones para enviar email de confirmacion de cuenta
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL, //Asegurar que las varibles de entorno esten correctas
    pass: process.env.PASS //Same here
  }
});

//Configuraciones de plantillas para correo.
const handlebarOptions = {
  viewEngine: {
    extName: '.hbs',
    partialsDir: 'template/',
    layoutsDir: 'template/',
    defaultLayout: 'email.hbs'
  },
  viewPath: 'template/',
  extName: '.hbs'
};

transporter.use('compile', hbs(handlebarOptions));

//En Configuraciones

router.post('/', async (req, res, next) => {
  /*
    Esta ruta es el registro para usuarios printers. 
    @params "data" tiene la respueda del esquema validor, 
     posible error || los valores
    
  */
  const data = vSignUpNormal.validate(req.body);
  if (data.error) return res.status(500).send(data.error);
  const userData = data.value;
  const emailexits = await ModelUser.findOne({ email: userData.email });
  //Envio de error si el email ingresado existe.
  if (emailexits) return res.status(400).send({ message: 'El email ya esta registrado.' });
  //Encriptacion de la password.
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  userData.password = hashPassword;
  //Fin encriptado de password
  //Paso de variables a schema de mongo
  const newUser = new ModelUser(userData);
  //Guardado de schema en mongo
  newUser.save(err => {
    if (err) return res.status(400).send(err);
    //Creacion de token para posterior verificacion
    const token = jwt.sign({ _id: newUser._id, email: newUser.email, type: 'printer' }, process.env.TOKEN_KEY);
    //Contructor de gestor para correo
    const emailOfConfirmationAccount = {
      from: process.env.GMAIL,
      to: 'diego_1197@hotmail.cl', //Correo Temporal donde llegan las confirmaciones, cambiar por propio
      subject: 'Bienvenido a Get Printing Us',
      text: 'no-reply',
      template: 'email',
      context: {
        firtName: newUser.firtName,
        token: token
      }
    };

    transporter.sendMail(emailOfConfirmationAccount, err => {
      if (err) return res.status(400).send({ message: err });
      res.status(200).send({ message: 'Tu cuenta se creo con exito, revisa tu correo para confimar.' });
    });
  });
});

router.post('/validation/:token', async (req, res, next) => {
  try {
    const data = jwt.verify(req.params.token, process.env.TOKEN_KEY);
    await ModelUser.findOne({ email: data.email, _id: data._id }, (err, User) => {
      if (err) return next(err);

      User.isVerified = true;

      User.save(err => {
        if (err) return next(err);
        res.status(400).send({ message: 'Cuenta verificada' });
      });
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
