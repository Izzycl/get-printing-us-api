const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const bcrypt = require('bcrypt');
const ModelPrinterUser = require('../../model/ModelPrinterUser');
const ModelNormalUser = require('../../model/ModelNormalUser');

// Importacion de archivos de validacion
const vSignUpNormalUser = require('../../helpers/validations/vSignUpNormalUser');

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

router.post('/printer', async (req, res, next) => {
  /*
    Esta ruta es el registro para usuarios printers. 
    @params "data" tiene la respueda del esquema validor, 
     posible error || los valores
    
  */
  const data = vSignUpNormalUser.validate(req.body);
  if (data.error) return res.status(500).send(data.error);
  const newUser = data.value;
  const emailexits = await ModelPrinterUser.findOne({ email: newUser.email });
  //Envio de error si el email ingresado existe.
  if (emailexits) return res.status(400).send({ message: 'El email ya esta registrado.' });
  //Encriptacion de la password.
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  newUser.password = hashPassword;
  //Fin encriptado de password
  //Paso de variables a schema de mongo
  const newPrinterUser = new ModelPrinterUser(data.value);
  //Guardado de schema en mongo
  newPrinterUser.save(err => {
    if (err) return res.status(400).send(err);
    //Creacion de token para posterior verificacion
    const token = jwt.sign({ _id: newPrinterUser._id, email: newPrinterUser.email }, process.env.TOKEN_KEY);
    //Contructor de gestor para correo
    const emailOfConfirmationAccount = {
      from: process.env.GMAIL,
      to: 'diego_1197@hotmail.cl', //Correo Temporal donde llegan las confirmaciones, cambiar por propio
      subject: 'Bienvenido a Get Printing Us',
      text: 'no-reply',
      template: 'email',
      context: {
        firtName: newPrinterUser.firtName,
        token: token,
        url: 'user/signup/printer/validation'
      }
    };

    transporter.sendMail(emailOfConfirmationAccount, (err, info) => {
      if (err) return res.status(400).send({ message: err });
      res.status(200).send({ message: 'Tu cuenta se creo con exito, revisa tu correo para confimar.' });
    });
  });
});

router.post('/normal', (req, res) => {});

router.post('/printer/validation/:token', (req, res) => {
  // Ruta para validar el registro de usuario printer por correo
});

router.post('/normal/validation/:token', (req, res) => {
  // Ruta para validar el registro de usuario normales por correo
  res.send('');
});

module.exports = router;
