const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receiptSchema = new Schema({
  receiptId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assetType: {
    type: Array, 
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Delivered', 'Rejected', 'Returned'],
    default: 'Pending',
  },
  action: {
    type: String,
    required: true,
  },
  others: {
    type : String,
    required : true,
  }
});

module.exports = mongoose.model('Receipt', receiptSchema);
