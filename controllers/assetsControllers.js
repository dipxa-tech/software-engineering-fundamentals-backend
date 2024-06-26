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
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const getAssetById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Asset ID required" });
  }

  const asset = await Asset.findById(id).lean().exec();
  if (!asset) {
    return res.status(404).json({ message: "Asset not found" });
  }

  return res.json(asset);
});

const createAsset = asyncHandler(async (req, res) => {
  const { genre, date, description } = req.body;

  if (!date || !genre || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const assetObject = { date, genre, description };
    const newAsset = await Asset.create(assetObject);

    return res.status(201).json({ message: "New asset created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const updateAsset = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { date, genre, description } = req.body;

  if (!date || !genre || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const asset = await Asset.findById(id).exec();
  if (!asset) {
    return res.status(404).json({ message: "Asset not found" });
  }

  asset.date = date;
  asset.genre = genre;
  asset.description = description;

  const updatedAsset = await asset.save();
  return res.json({ message: `Updated asset ${updatedAsset.genre}` });
});

const deleteAsset = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Asset ID required" });
  }

  const asset = await Asset.findById(id).exec();
  if (!asset) {
    return res.status(404).json({ message: "Asset not found" });
  }

  const result = await asset.deleteOne();
  return res.json({ message: `Asset ${result.genre} has been deleted.` });
});

module.exports = {
  getAllAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset,
};
