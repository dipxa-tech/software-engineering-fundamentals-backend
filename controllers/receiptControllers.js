const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Receipt = require('../models/Receipt');
const { v4: uuidv4 } = require('uuid');

const generateReceiptId = () => uuidv4();

const getAllReceipts = asyncHandler(async (req, res) => {
  try {
    const receipts = await Receipt.find().populate('userId', 'username email').lean().exec();
    if (!receipts.length) {
      return res.status(400).json({ message: 'No receipts found' });
    }
    res.json(receipts);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const getReceiptsByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).populate('receipts').exec();
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user.receipts);
});

const createReceipt = asyncHandler(async (req, res) => {
  const { userId, assetType, quantity, others } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const receipt = new Receipt({
    receiptId: generateReceiptId(),
    userId,
    assetType,
    quantity,
    status: 'Pending',
    action: 'Requested',
    others,
  });

  await receipt.save();

  user.receipts.push(receipt._id);
  await user.save();

  res.status(201).json(receipt);
});

const updateReceipt = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId, assetType, date, quantity, status } = req.body;

  if (!id || !userId || !assetType || !date || !quantity || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const receipt = await Receipt.findById(id).exec();
  if (!receipt) {
    return res.status(404).json({ message: 'Receipt not found' });
  }

  receipt.userId = userId;
  receipt.assetType = assetType;
  receipt.date = date;
  receipt.quantity = quantity;
  receipt.status = status;

  await receipt.save();

  res.json({ message: `Updated receipt ${receipt.receiptId}` });
});

const deleteReceipt = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const receipt = await Receipt.findById(id).exec();
  if (!receipt) {
    return res.status(404).json({ message: 'Receipt not found' });
  }

  await receipt.deleteOne();

  res.json({ message: `Deleted receipt ${receipt.receiptId}` });
});

module.exports = {
  getAllReceipts,
  getReceiptsByUserId,
  createReceipt,
  updateReceipt,
  deleteReceipt,
};
