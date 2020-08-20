const { ObjectID } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ModelPrint = new Schema({
  brand: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  volumetricMaxSize: {
    height: {
      type: Number
    },
    width: {
      type: Number
    },
    depth: {
      type: Number
    }
  },
  img_url: {
    type: String,
    require: true
  },
  filamentType: [
    {
      refFilamentType: {
        ref: "ModelFilamentType",
        type: ObjectID
      }
    }
  ]
});

module.exports = mongoose.model("ModelPrint", ModelPrint);
