const express = require('express')
const router = express.Router()
const lifecycleControllers = require('../controllers/lifecycleControllers')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(lifecycleControllers.getAllLifecycleRecords)
    .post(lifecycleControllers.createLifecycleRecord)

router.route('/:id')
    .get(lifecycleControllers.getLifecycleRecord)
    .patch(lifecycleControllers.updateLifecycleRecord)
    .delete(lifecycleControllers.deleteLifecycleRecord)

module.exports = router