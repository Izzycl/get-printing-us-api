const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const print = new Schema(
  {
    brand: {
      type: String,
      required: false
    },
    model: {
      type: String,
      required: false
    },
    type: {
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
      require: false
    },
    filamentType: [
      {
        _id: false,
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
