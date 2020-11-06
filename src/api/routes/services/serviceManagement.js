const express = require('express');
const router = express.Router();
const ModelService = require('../../model/ModelService');
const ModelPrint = require('../../model/ModelPrint');

router.post('/', (req, res) => {
  const service = new ModelService(req.body);
  service.save((err, newService) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(newService);
  });
});

router.get('/', (req, res) => {
  ModelService.find()
    .populate('User', ['firtName', 'feedback'])
    .populate('availableFilament', 'filamentName')
    .populate('Print', ['brand', 'model', 'volumetricMaxSize'])
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(doc);
    });
});

router.get('/user/:user', (req, res) => {
  ModelService.find({ User: req.params.user })
    .populate('User', ['firtName', 'feedback'])
    .populate('availableFilament', 'filamentName')
    .populate('Print', ['brand', 'model', 'volumetricMaxSize'])
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(doc);
    });
});

router.get('/:id', (req, res) => {
  ModelService.find({ _id: req.params.id })
    .populate('User', ['firtName', 'feedback'])
    .populate('availableFilament', 'filamentName')
    .populate('Print', ['model', 'volumetricMaxSize'])
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(doc);
    });
});

router.delete('/:id', (req, res, next) => {
  ModelService.deleteOne({ _id: req.params.id }, (err, doc) => {
    if (err) return next(err);
    return res.status(200).send({ message: 'Servicio eliminado' });
  });
});

module.exports = router;
