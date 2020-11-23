const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const user = new Schema(
  {
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
    isVerified: {
      type: Boolean,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    userType: {
      type: String,
      required: true
    },
    modelsOfPrinters: [
      {
        ref: 'print',
        type: ObjectID
      }
    ],
    phoneNumber: {
      type: Number,
      required: false
    },
    profileImgUrl: {
      type: String,
      require: false
    },
    feedback: {
      type: Number,
      required: false
    },
    reward: {
      total: {
        type: Number,
        default: 0
      },
      ncuenta: {
        type: Number
      },
      banco: {
        type: String
      },
      cuenta: {
        type: String
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', user);
