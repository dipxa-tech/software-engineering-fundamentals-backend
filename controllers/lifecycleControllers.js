const asyncHandler = require('express-async-handler');
const Lifecycle = require('../models/Lifecycle');
const User = require('../models/User');

const createLifecycleRecord = asyncHandler(async (req, res) => {
  const { product, customerId, amountLoaned, status } = req.body;

  const customer = await User.findById(customerId);
  if (!customer) {
    return res.status(404).json({ message: 'Customer not found' });
  }

  const newLifecycle = new Lifecycle({
    product,
    customer: customerId,
    amountLoaned,
    status
  });

  const savedLifecycle = await newLifecycle.save();
  res.status(201).json(savedLifecycle);
});

const getAllLifecycleRecords = asyncHandler(async (req, res) => {
    const lifecycleRecords = await Lifecycle.find().populate('customer', 'username email');
    res.status(200).json(lifecycleRecords);
});

const getLifecycleRecordById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const lifecycleRecord = await Lifecycle.findById(id).populate('customer', 'username email');
    if (!lifecycleRecord) {
      return res.status(404).json({ message: 'Lifecycle record not found' });
    }
    res.status(200).json(lifecycleRecord);
});

const updateLifecycleRecord = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { product, customerId, amountLoaned, status } = req.body;
  
    const lifecycleRecord = await Lifecycle.findById(id);
    if (!lifecycleRecord) {
      return res.status(404).json({ message: 'Lifecycle record not found' });
    }
  
    if (customerId) {
      const customer = await User.findById(customerId);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      lifecycleRecord.customer = customerId;
    }
  
    lifecycleRecord.product = product || lifecycleRecord.product;
    lifecycleRecord.amountLoaned = amountLoaned || lifecycleRecord.amountLoaned;
    lifecycleRecord.status = status || lifecycleRecord.status;
  
    const updatedLifecycle = await lifecycleRecord.save();
    res.status(200).json(updatedLifecycle);
});

const deleteLifecycleRecord = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const lifecycleRecord = await Lifecycle.findById(id);
    if (!lifecycleRecord) {
      return res.status(404).json({ message: 'Lifecycle record not found' });
    }
  
    await lifecycleRecord.remove();
    res.status(200).json({ message: 'Lifecycle record deleted' });
});

module.exports = {
    createLifecycleRecord,
    getAllLifecycleRecords,
    getLifecycleRecordById,
    updateLifecycleRecord,
    deleteLifecycleRecord
};
