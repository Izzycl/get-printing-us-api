const mongoose = require('mongoose');
const { Schema } = mongoose;

const contact = new Schema(
  {
    email: {
      type: String,
      require: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    reply: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('contact', contact);
