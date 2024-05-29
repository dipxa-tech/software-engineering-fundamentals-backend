const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  genre: [{
    type: String,
  }],
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
  //add another elementschema where we track the history of each assets
});

const Asset = mongoose.model("Asset", assetSchema);

module.exports = Asset;
