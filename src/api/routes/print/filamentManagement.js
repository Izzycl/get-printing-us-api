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

router.get('/', (req, res, next) => {
  ModelFilamentType.find((err, data) => {
    if (err) return next(err);
    res.status(200).send(data);
  });
});

router.delete('/:id', (req, res, next) => {
  if (!req.params.id) res.status(400).send({ message: 'Debe ingresar un id para eliminar' });
  ModelFilamentType.deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) return next(err);
    if (result.deletedCount === 0) return res.status(400).send({ message: `El registro a eliminar no existe` });
    res.send({ message: `Se elimino ${result.deletedCount} registro` });
  });
});

router.put('/:id', (req, res, next) => {
  const data = vAddFilament.validate(req.body);
  if (data.error) return next(data.error);
  const id = req.params.id;
  ModelFilamentType.findById(id, (err, filament) => {
    if (err) return next(err);
    filament.filamentName = data.value.filamentName;
    filament.save((err, newdoc) => {
      if (err) return next(err);
      res.status(200).send(newdoc);
    });
  });
});

module.exports = router;
