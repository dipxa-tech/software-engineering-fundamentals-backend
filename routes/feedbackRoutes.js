const express = require('express');
const router = express.Router();
const feedbackControllers = require('../controllers/feedbacksControllers');
// const verifyJWT = require('../middleware/verifyJWT');

// router.use(verifyJWT);

router.route('/')
    .get(feedbackControllers.getAllFeedbacks)
    .post(feedbackControllers.createFeedback);

router.route('/:id')
    .get(feedbackControllers.getFeedbackById)
    .patch(feedbackControllers.updateFeedback)
    .delete(feedbackControllers.deleteFeedback);

module.exports = router;
