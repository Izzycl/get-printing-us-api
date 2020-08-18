const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ModelPrinterUser = new Schema({
  email: {
    type: String,
    required: true
  },
  firtName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  rut: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String,
    required: false
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false
  },
  modelOfPrinter: {}
});

module.exports = mongoose.model("ModelPrinterUser", ModelPrinterUser);
