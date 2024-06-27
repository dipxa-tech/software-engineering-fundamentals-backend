const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/usersControllers');
// const verifyJWT = require('../middleware/verifyJWT');

// router.use(verifyJWT);

router.route('/')
    .get(userControllers.getAllUsers)
    .delete(userControllers.deleteUser);

router.route('/:id')
    .get(userControllers.getUserById)
    .patch(userControllers.updateUser)
    .patch(userControllers.updateUserInformation)


module.exports = router;
