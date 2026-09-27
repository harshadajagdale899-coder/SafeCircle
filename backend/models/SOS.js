const mongoose = require('mongoose');

const sosSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Started', 'Completed'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const SOS = mongoose.model('SOS', sosSchema);
module.exports = SOS;
