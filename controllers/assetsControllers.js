const Asset = require("../models/Asset");
const asyncHandler = require("express-async-handler");

const getAllAssets = asyncHandler(async (req, res) => {
  try {
    const assets = await Asset.find().lean();
    if (!assets?.length) {
      return res.status(400).json({ message: "No assets found" });
    }
    return res.json(assets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const getAssetById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Asset ID required" });
  }

  try {
    const asset = await Asset.findById(id).lean().exec();
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }
    return res.json(asset);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const createAsset = asyncHandler(async (req, res) => {
  const { genre, date, description, amount, status } = req.body;

  if (!date || !genre || !description || !amount || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const assetObject = { genre, date, description, amount, status };
    const newAsset = await Asset.create(assetObject);

    return res.status(201).json({ message: "New asset created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const updateAsset = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { genre, date, description, amount, status } = req.body;

  if (!date || !genre || !description || !amount || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const asset = await Asset.findById(id).exec();
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    asset.genre = genre;
    asset.date = date;
    asset.description = description;
    asset.amount = amount;
    asset.status = status;

    const updatedAsset = await asset.save();
    return res.json({ message: `Updated asset ${updatedAsset.genre}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const deleteAsset = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Asset ID required" });
  }

  try {
    const asset = await Asset.findById(id).exec();
    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }

    const result = await asset.deleteOne();
    return res.json({ message: `Asset ${result.genre} has been deleted.` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = {
  getAllAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
};
