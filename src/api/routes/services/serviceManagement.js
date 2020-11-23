const express = require('express');
const router = express.Router();
const ModelService = require('../../model/ModelService');
const ModelServiceOnProgress = require('../../model/ModelServiceOnProgress');
const multer = require('multer');
const ModelUser = require('../../model/ModelUser');
const { modelName } = require('../../model/ModelServiceOnProgress');
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
    nodiscPrice: req.body.noDisc,
    finalPrice: req.body.finalPrice,
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

router.get('/contract/all/service/all', (req, res, next) => {
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
      }
    })
    .exec((err, doc) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(doc);
    });
});

router.post('/contract/mod', (req, res, next) => {
  ModelServiceOnProgress.findById(req.body.serviceid, (err, model) => {
    if (err) return next(err);
    model.state = 'delivery';
    model.save(err => {
      if (err) return next(err);
    });
  });
  ModelUser.findById(req.body.serviceuserid, (err, model) => {
    if (err) return next(err);
    model.reward = {
      total: model.reward.total + req.body.finalPrice
    };
    model.save(err => {
      if (err) return next(err);
      res.status(200).send({ message: 'okey' });
    });
  });
});

router.post('/cancel/:id', (req, res, next) => {
  ModelUser.findById(req.params.id, (err, model) => {
    if (err) return next(err);
    model.reward = {
      total: 0
    };
    model.save(err => {
      if (err) return next(err);
      res.status(200).send({ message: 'okey' });
    });
  });
});

module.exports = router;
