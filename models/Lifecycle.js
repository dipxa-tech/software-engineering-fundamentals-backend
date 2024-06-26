const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const lifeCycle = new Schema({
  trackingId: {
    type: String,
    default: uuidv4, // Automatically generate a UUID
    unique: true
  },
  product: {
    type: String,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  amountLoaned: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Approved', 'Rejected', 'Returned'], // Example statuses
    default: 'Pending'
  }
});

module.exports = mongoose.model('Lifecycle', lifeCycle);
