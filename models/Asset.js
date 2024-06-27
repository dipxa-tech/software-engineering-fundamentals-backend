const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  genre: [
    {
      type: String,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
    get: function (val) {
      if (!val) return val;
      return val.toISOString().split("T")[0];
    },
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Available", "Maintenance"],
    default: "Available",
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // Example: Ensure amount is non-negative
  },
});

const Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;
