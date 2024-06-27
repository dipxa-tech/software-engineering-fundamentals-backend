const asyncHandler = require("express-async-handler");
const Lifecycle = require("../models/Lifecycle");
const Receipt = require("../models/Receipt");
const User = require("../models/User");
const Asset = require("../models/Asset");

// Function to generate a unique tracking ID (example implementation)
const generateTrackingId = () => {
  return "LC-" + Math.random().toString(36).substr(2, 9); // Example generation
};

// Function to generate a unique receipt ID (example implementation)
const generateReceiptId = () => {
  return "RCPT-" + Math.random().toString(36).substr(2, 9); // Example generation
};

// Create lifecycle record
const createLifecycleRecord = asyncHandler(async (req, res) => {
  const { assetId, userId, quantity, date, others } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const asset = await Asset.findById(assetId);
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    if (asset.amount < quantity) {
      return res
        .status(400)
        .json({ message: "Insufficient quantity of asset" });
    }

    // Deduct quantity from asset quantity
    asset.amount -= quantity;
    await asset.save();

    const newReceipt = new Receipt({
      receiptId: generateReceiptId(),
      userId,
      assetType: [asset.genre],
      date,
      quantity,
      status: "Pending",
      action: "Requested",
      others,
    });

    const savedReceipt = await newReceipt.save();

    const newLifecycle = new Lifecycle({
      trackingId: generateTrackingId(),
      product: asset.genre,
      customer: userId,
      date,
      quantity,
      status: "Pending",
      action: "Requested",
      others,
      receipt: savedReceipt._id, // Storing the receipt ID in the lifecycle record
    });

    const savedLifecycle = await newLifecycle.save();

    // Push the receipt information to the user's receipts array
    user.receipts.push(savedReceipt._id);
    await user.save();

    res.status(201).json(savedLifecycle);
  } catch (error) {
    console.error("Error creating lifecycle record:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update lifecycle record status
const updateLifecycleRecord = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const lifecycleRecord = await Lifecycle.findById(id);
  if (!lifecycleRecord) {
    return res.status(404).json({ message: "Lifecycle record not found" });
  }

  lifecycleRecord.status = status;
  await lifecycleRecord.save();

  // Update corresponding receipt status
  const receiptRecord = await Receipt.findById(lifecycleRecord.receipt);
  if (receiptRecord) {
    receiptRecord.status = status;
    await receiptRecord.save();
  }

  res
    .status(200)
    .json({ message: `Lifecycle record updated with status: ${status}` });
});

// Get lifecycle record by ID
const getLifecycleRecordById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const lifecycleRecord = await Lifecycle.findById(id).populate(
    "customer",
    "username email"
  );
  if (!lifecycleRecord) {
    return res.status(404).json({ message: "Lifecycle record not found" });
  }

  res.status(200).json(lifecycleRecord);
});

// Get all lifecycle records
const getAllLifecycleRecords = asyncHandler(async (req, res) => {
  const lifecycleRecords = await Lifecycle.find().populate(
    "customer",
    "username email"
  );
  res.status(200).json(lifecycleRecords);
});

// Delete lifecycle record
const deleteLifecycleRecord = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const lifecycleRecord = await Lifecycle.findById(id);
  if (!lifecycleRecord) {
    return res.status(404).json({ message: "Lifecycle record not found" });
  }

  await lifecycleRecord.deleteOne();

  res.status(200).json({ message: `Lifecycle record deleted` });
});

module.exports = {
  createLifecycleRecord,
  updateLifecycleRecord,
  getLifecycleRecordById,
  getAllLifecycleRecords,
  deleteLifecycleRecord,
};
