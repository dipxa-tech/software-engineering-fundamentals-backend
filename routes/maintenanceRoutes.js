const express = require('express')
const router = express.Router()
const maintenanceControllers = require('../controllers/maintenanceControllers')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(maintenanceControllers.getAllMaintenanceRecords)
    .post(maintenanceControllers.createMaintenanceRecord)

router.route('/:id')
    .get(maintenanceControllers.getMaintenanceRecord)
    .patch(maintenanceControllers.updateMaintenanceRecord)
    .delete(maintenanceControllers.deleteMaintenanceRecord)

module.exports = router