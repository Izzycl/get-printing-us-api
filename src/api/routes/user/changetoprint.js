const express = require('express');
const router = express.Router();
const ModelUser = require('../../model/ModelUser');
const jwt = require('jsonwebtoken');
router.put('/', (req, res, next) => {
  ModelUser.updateOne(
    { _id: req.body.id },
    {
      id: req.body.id,
      userType: req.body.userType,
      modelsOfPrinters: req.body.modelsOfPrinters,
      phoneNumber: req.body.phoneNumber
    },
    { upsert: true },
    (err, doc) => {
      if (err) return next(err);
      return res.status(200).send({ message: 'Perfil cambiado' });
    }
  );
});

module.exports = router;
