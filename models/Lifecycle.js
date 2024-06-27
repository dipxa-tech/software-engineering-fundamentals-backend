const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const lifeCycleSchema = new Schema({
  trackingId: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true,
  },
  product: {
    type: Array,
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Delivered", "Rejected", "Returned"],
    default: "Pending",
  },
  action: {
    type: String,
    required: true,
  },
  others: {
    type: String,
    required: true,
  },
  receipt: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Receipt" ,
  },
});

const Lifecycle = mongoose.model("Lifecycle", lifeCycleSchema);

module.exports = Lifecycle;
