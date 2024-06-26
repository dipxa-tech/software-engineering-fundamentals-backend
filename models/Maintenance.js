const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const maintenanceSchema = new Schema({
  maintenanceId: {
    type: String,
    default: uuidv4, // Automatically generate a UUID
    unique: true
  },
  maintenanceDetails: {
    type: String,
    required: true,
    enum: ['Cleaning', 'Repair', 'Inspection', 'Replacement'] // Example maintenance details
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
