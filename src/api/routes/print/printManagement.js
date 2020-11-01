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
  ModelPrint.find({ type: 'original' }, (err, all) => {
    if (err) return next(err);
    res.status(200).send(all);
  });
});

module.exports = router;
