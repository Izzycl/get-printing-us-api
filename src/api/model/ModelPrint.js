const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const print = new Schema(
  {
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
          ref: 'filamentType',
          type: ObjectID
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('print', print);
