const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const service = new Schema(
  {
    pricePerHour: {
      type: Number,
      required: true
    },
    User: {
      ref: 'User',
      type: ObjectID
    },
    Print: {
      ref: 'print',
      type: ObjectID
    },
    availableFilament: [
      {
        ref: 'filamentType',
        type: ObjectID
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('service', service);
