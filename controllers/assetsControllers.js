const Asset = require("../models/Asset");
const asyncHandler = require("express-async-handler");

const getAllAssets = asyncHandler(async (req, res) => {
  try {
    const assets = await Asset.find().lean();

    if (!assets?.length) {
      return res.status(400).json({ message: "No assets found " });
    } else {
      return res.json(concerts);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const getAssetsById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Asset ID required" });
  }

  const assets = await Asset.findById(id).lean().exec();

  if (!assets) {
    return res.status(404).json({ message: "Asset not found" });
  }

  return res.json(assets);
});

const createAssets = asyncHandler(async (req, res) => {
  const {
    genre,
    date,
    description,
  } = req.body;

  if (
    !date ||
    !genre ||
    !description 
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const assets = await Asset.create({
      date,
      genre,
      description,
    });

    return res.status(201).json({ message: `New asset created` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const updateAsset = asyncHandler(async (req, res) => {
  const {
    id,
    date,
    genre,
    description,
  } = req.body;

  // checks fields
  if (
    !id ||
    !date ||
    !description ||
    !genre
  ) {
    return res.status(400).json({ message: "all fields are required" });
  }

  const assets = await Asset.findById(id).exec();

  if (!assets) {
    return res.status(400).json({ message: "Asset not found" });
  }

  concert.date = date;
  concert.description = description;
  concert.genre = genre;

  // Save the updated asset
  const updatedAsset = await assets.save();

  return res.json({ message: `updated ${updatedAsset.genre}` });
});

const deleteAsset = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Asset ID required" });
  }

  const asset = await Asset.findById(id).exec();

  if (!concert) {
    return res.status(400).json({ message: "Asset does not exist" });
  }

  const result = await concert.deleteOne();

  return res.json(`User ${result.genre} has been deleted.`);
});

module.exports = {
  createAssets,
  deleteAsset,
  getAllAssets,
  getAssetsById,
  updateAsset
};
