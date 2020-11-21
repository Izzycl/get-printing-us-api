const express = require('express');
const router = express.Router();
const ModelService = require('../../model/ModelService');
const ModelServiceOnProgress = require('../../model/ModelServiceOnProgress');
const multer = require('multer');
const { route } = require('../user/signin');
const path = require('path');
const { match } = require('assert');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

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

router.post('/contract', upload.single('fileToPrint'), (req, res, next) => {
  const newOnProgress = new ModelServiceOnProgress({
    service: req.body.service,
    fileToPrint: `http://localhost:8080/${req.file.path}`,
    estimateHours: req.body.estimateHours,
    state: req.body.state,
    userRecruiter: req.body.userRecruiter,

    payment: {
      paymentMethod: req.body.paymentMethod,
      transactionNumber: '_' + Math.random().toString(36).substr(2, 9),
      paymentState: req.body.paymentState
    },
    courier: {
      trackingNumber: '_' + Math.random().toString(36).substr(2, 9),
      courierName: req.body.courierName,
      region: req.body.region,
      comune: req.body.comune,
      address: req.body.address
    }
  });
  newOnProgress.save((err, doc) => {
    if (err) return next(err);
    return res.status(200).send(doc);
  });
});
router.get('/contract/all/:id', (req, res, next) => {
  ModelServiceOnProgress.find()
    .populate({
      path: 'service',
      model: 'service',
      populate: {
        path: 'Print',
        model: 'print',
        select: ['filamentType', 'model'],
        populate: {
          path: 'filamentType',
          model: 'filamentType',
          select: ['filamentName']
        }
      },
      match: { User: req.params.id }
    })
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      doc = doc.filter(function (doc) {
        return doc.service;
      });
      res.status(200).send(doc);
    });
});

module.exports = router;
