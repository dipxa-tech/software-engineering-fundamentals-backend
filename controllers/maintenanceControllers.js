const asyncHandler = require('express-async-handler');
const Maintenance = require('../models/Maintenance');

const createMaintenanceRecord = asyncHandler(async (req, res) => {
  const { maintenanceDetails } = req.body;

  if (!maintenanceDetails) {
    return res.status(400).json({ message: 'Maintenance details are required' });
  }

  const newMaintenance = new Maintenance({
    maintenanceDetails
  });

  const savedMaintenance = await newMaintenance.save();
  res.status(201).json(savedMaintenance);
});

const getAllMaintenanceRecords = asyncHandler(async (req, res) => {
  const maintenanceRecords = await Maintenance.find();
  res.status(200).json(maintenanceRecords);
});

const getMaintenanceRecordById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const maintenanceRecord = await Maintenance.findById(id);
  if (!maintenanceRecord) {
    return res.status(404).json({ message: 'Maintenance record not found' });
  }
  res.status(200).json(maintenanceRecord);
});

const updateMaintenanceRecord = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { maintenanceDetails } = req.body;

  if (!maintenanceDetails) {
    return res.status(400).json({ message: 'Maintenance details are required' });
  }

  const maintenanceRecord = await Maintenance.findById(id);
  if (!maintenanceRecord) {
    return res.status(404).json({ message: 'Maintenance record not found' });
  }

  maintenanceRecord.maintenanceDetails = maintenanceDetails;

  const updatedMaintenance = await maintenanceRecord.save();
  res.status(200).json(updatedMaintenance);
});

const deleteMaintenanceRecord = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const maintenanceRecord = await Maintenance.findById(id);
  if (!maintenanceRecord) {
    return res.status(404).json({ message: 'Maintenance record not found' });
  }

  await maintenanceRecord.remove();
  res.status(200).json({ message: 'Maintenance record deleted' });
});


module.exports = {
  createMaintenanceRecord,
  getAllMaintenanceRecords,
  getMaintenanceRecordById,
  updateMaintenanceRecord,
  deleteMaintenanceRecord
};
