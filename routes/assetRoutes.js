const express = require('express')
const router = express.Router()
const assetsControllers = require('../controllers/assetsControllers')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(assetsControllers.getAllAssets)
    .post(assetsControllers.createAssets)
    .patch(assetsControllers.updateAsset)
    .delete(assetsControllers.deleteAsset)

router.get('/:id', assetsControllers.getAssetsById)

module.exports = router