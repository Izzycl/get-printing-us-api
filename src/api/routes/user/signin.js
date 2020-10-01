const express = require('express');
const vSignInData = require('../../helpers/validations/vSignInData');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ModelUser = require('../../model/ModelUser');

router.post('/', (req, res, next) => {
  const data = vSignInData.validate(req.body);
  if (data.error) return res.status(400).send(data.error);
  const { email, password } = data.value;
  ModelUser.findOne({ email: email }, (err, user) => {
    if (err) return res.status(400).send({ message: 'Email o contraseña incorrectos.' });
    bcrypt.compare(password, user.password, (err, same) => {
      if (!same) return res.status(400).send({ message: 'Email o contraseña incorrectos.' });
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_KEY);
      res.header('auth-token', token).send({ token: token });
    });
  });
});

module.exports = router;
