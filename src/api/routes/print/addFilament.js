const express = require('express');

const router = express.Router();
// importacion de clase
const ModelFilamentType = require('../../model/ModelFilamentType.js');

router.post('/', (req, res) => {
  const FilamentNew = new ModelFilamentType(req.body);
  // Guardar un Document Filament
  FilamentNew.save((err, info) => {
    if (err) return res.send(err);
    res.send(info);
  });
});

module.exports = router;
