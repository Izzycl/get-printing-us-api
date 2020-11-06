const express = require('express');
const router = express.Router();
const ModelPrint = require('../../model/ModelPrint.js');
const { ensureAuthenticated } = require('../../../middlewares');

router.post('/', ensureAuthenticated, (req, res, next) => {
  const newPrint = new ModelPrint(req.body);
  newPrint.save((err, info) => {
    if (err) return next(err);
    res.send(info);
  });
});

router.get('/', (req, res, next) => {
  ModelPrint.find((err, all) => {
    if (err) return next(err);
    res.status(200).send(all);
  });
});

router.get('/custom', (req, res, next) => {
  ModelPrint.find({ type: 'custom' }, (err, all) => {
    if (err) return next(err);
    res.status(200).send(all);
  });
});

router.get('/original', (req, res, next) => {
  ModelPrint.find({ type: 'original' })
    .populate('filamentType', ['filamentName'])
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(doc);
    });
});

router.delete('/:id', (req, res, next) => {
  if (!req.params.id) res.status(400).send({ message: 'Debe ingresar un id para eliminar' });
  ModelPrint.deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) return next(err);
    if (result.deletedCount === 0) return res.status(400).send({ message: `El registro a eliminar no existe` });
    res.send({ message: `Se elimino ${result.deletedCount} registro` });
  });
});

module.exports = router;
