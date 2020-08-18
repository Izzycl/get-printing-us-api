const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ModelNormalUser = new Schema({
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
  }
});

module.exports = mongoose.model("ModelNormalUser", ModelNormalUser);
