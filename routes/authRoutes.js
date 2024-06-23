const express = require('express')
const router = express.Router()
const authController = require('../controllers/authsContollers')
// const loginLimiter = require('../middleware/loginLimiters')

router.route('/')
    .post(authController.login)

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)

module.exports = router