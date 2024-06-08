const mongoose = require("mongoose");

const maintenanceHistorySchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "Under Maintenance",
  },
  description: {
    type: String,
    required: true,
  },
});

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
  history: [maintenanceHistorySchema], // Embedded schema for maintenance history
});

const Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;
