const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { id, name } = req.body;
});

module.exports = router;
