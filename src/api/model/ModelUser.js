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
        required: false,
        _id: false,
        refPrint: {
          ref: 'print',
          type: ObjectID
        }
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
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', user);
