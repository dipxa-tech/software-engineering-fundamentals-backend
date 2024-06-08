const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  asset: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Asset', 
    required: true
  },
  // Changed to a map to allow flexible key-value pairs
  maintenanceDetails: {
    type: Map,  
    of: String
  },
  maintenanceDate: {
    type: Date,
    default: Date.now
  }
});

const Maintenance = mongoose.model("Maintenance", maintenanceSchema);

module.exports = Maintenance;
