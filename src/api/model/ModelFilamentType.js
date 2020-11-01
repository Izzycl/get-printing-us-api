const mongoose = require('mongoose');
const { Schema } = mongoose;

const filamentType = new Schema(
  {
    filamentName: {
      type: String,
      require: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('filamentType', filamentType);
