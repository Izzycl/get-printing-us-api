const express = require('express');
const router = express.Router();
const ModelUser = require('../../model/ModelUser');
router.get('/', (req, res, next) => {
  ModelUser.find((err, doc) => {
    if (err) return next(err);
    res.status(200).send(doc);
  });
});

module.exports = router;
