const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const printerUser = new Schema({
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
    required: false,
    default: null
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false
  },
  modelOfPrinter: [
    {
      _id: false,
      refPrinter: {
        ref: 'print',
        type: ObjectID,
        _id: false
      }
    }
  ]
});

module.exports = mongoose.model('printerUser', printerUser);
