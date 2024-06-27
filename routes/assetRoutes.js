const express = require("express");
const router = express.Router();
const assetControllers = require("../controllers/assetsControllers");
// const verifyJWT = require('../middleware/verifyJWT');

// router.use(verifyJWT);

router
  .route("/")
  .get(assetControllers.getAllAssets)
  .post(assetControllers.createAsset)
  .delete(assetControllers.deleteAsset);

router
  .route("/:id")
  .get(assetControllers.getAssetById)
  .patch(assetControllers.updateAsset);

module.exports = router;
