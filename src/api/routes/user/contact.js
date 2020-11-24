const express = require('express');
const router = express.Router();
const ModelContact = require('../../model/ModelContact');
const vContact = require('../../helpers/validations/vContact');
const { message } = require('../../helpers/validations/vContact');

router.get('/', (req, res, next) => {
  ModelContact.find((err, all) => {
    if (err) return next(err);
    res.status(200).send(all);
  });
});

router.post('/', (req, res, next) => {
  const data = vContact.validate(req.body);
  if (data.error) return res.status(400).send(data.error);
  const newMessage = new ModelContact({
    email: data.value.email,
    firstName: data.value.firstName,
    lastName: data.value.lastName,
    message: data.value.message,
    state: 'noreply'
  });
  newMessage.save(err => {
    if (err) next(err);
    res.status(200).send({ messages: 'Mensaje enviado!' });
  });
});

router.put('/', (req, res, next) => {
  ModelContact.updateOne(
    { _id: req.body.id },
    { state: 'reply', reply: req.body.reply },
    { upsert: true },
    (err, doc) => {
      if (err) return next(err);
      return res.status(200).send({ message: 'Mensaje actualizado' });
    }
  );
});

module.exports = router;
