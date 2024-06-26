const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/usersControllers');
// const verifyJWT = require('../middleware/verifyJWT');

// router.use(verifyJWT);

router.route('/')
    .get(userControllers.getAllUsers)

router.route('/:id')
    .get(userControllers.getUserById)
    .patch(userControllers.updateUser)
    .delete(userControllers.deleteUser);

router.patch('/update/:id', userControllers.updateUserInformation);

module.exports = router;
