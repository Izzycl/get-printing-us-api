const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const serviceOnProgress = new Schema(
  {
    service: {
      ref: 'service',
      type: ObjectID
    },
    fileToPrint: {
      type: String,
      required: true
    },
    estimateHours: {
      type: Number,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    userRecruiter: {
      ref: 'User',
      type: ObjectID
    },
    payment: {
      paymentMethod: {
        type: String,
        required: false
      },
      transactionNumber: {
        type: String,
        required: false
      },
      paymentState: {
        type: String,
        required: false
      }
    },
    courier: {
      trackingNumber: {
        type: String
      },
      courierName: {
        type: String
      },
      region: {
        type: String
      },
      comune: {
        type: String
      },
      address: {
        type: String
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('serviceOnProgress', serviceOnProgress);
