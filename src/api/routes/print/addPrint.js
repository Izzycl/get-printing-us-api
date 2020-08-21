const express = require("express");
const router = express.Router();
const ModelPrint = require("../../model/ModelPrint.js");
//const validation = require("../../help/validation");
router.post("/", (req, res) => {
  //const error = validation(req.body);

  const newPrint = new ModelPrint(req.body);
  //Guardar un Document Print
  newPrint.save((err, info) => {
    if (err) return res.send(err);
    res.send(info);
  });
});

module.exports = router;
