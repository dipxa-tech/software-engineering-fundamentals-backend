const express = require('express')
const router = express.Router()
const lifecycleControllers = require('../controllers/lifecycleControllers')
// const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/')
    .get(lifecycleControllers.getAllLifecycleRecords)
    .post(lifecycleControllers.createLifecycleRecord)
    .delete(lifecycleControllers.deleteLifecycleRecord);

router.route('/:id')
    .get(lifecycleControllers.getLifecycleRecordById)
    .patch(lifecycleControllers.updateLifecycleRecord);

module.exports = router