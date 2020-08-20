const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ModelFilamentType = new Schema({
  filamentName: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model("ModelFilamentType", ModelFilamentType);
