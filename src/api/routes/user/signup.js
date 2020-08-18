const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json(["😀", "😳", "🙄"]);
});

router.post("/validation/:token", (req, res) => {
  res.send(req.params.token);
});

module.exports = router;
