const Maintenance = require('../models/Maintenance');
const Asset = require('../models/Asset');

const createMaintenance = async (req, res) => {
  try {
    const { assetId, description } = req.body;

    // Ensure the asset exists
    const asset = await Asset.findById(assetId);
    if (!asset) {
      return res.status(404).send({ error: "Asset not found" });
    }

    // Create new maintenance record
    const newMaintenance = new Maintenance({
      asset: assetId,
      maintenanceDetails: {
        genre: asset.genre.join(', '),
        description: asset.description,
        date: asset.date.toISOString().split("T")[0]
      }
    });

    await newMaintenance.save();

    // Update asset's maintenance history
    asset.history.push({ 
      date: new Date(), 
      status: "Under Maintenance",
      description 
    });

    await asset.save();

    res.status(201).send(newMaintenance);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getMaintenanceById = async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id).populate('asset');
    if (!maintenance) {
      return res.status(404).send({ error: "Maintenance record not found" });
    }
    res.send(maintenance);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  createMaintenance,
  getMaintenanceById,
};
