const express = require('express');

const router = express.Router();
// importacion de clase
const ModelFilamentType = require('../../model/ModelFilamentType.js');
const vAddFilament = require('../../helpers/validations/vAddFilament');

router.post('/', (req, res, next) => {
  const data = vAddFilament.validate(req.body);
  if (data.error) return next(data.error);
  const newFilament = new ModelFilamentType(data.value);
  newFilament.save((err, data) => {
    if (err) return next(err);
    res.send({ message: 'Filamento agregado con exito' });
  });
});

module.exports = router;
