const mongoose = require('mongoose');

const trustedContactSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    relation: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    address: String,
  },
  {
    timestamps: true,
  },
);

const TrustedContact = mongoose.model('TrustedContact', trustedContactSchema);
module.exports = TrustedContact;
