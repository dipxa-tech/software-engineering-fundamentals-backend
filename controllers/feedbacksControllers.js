const Feedback = require("../models/Feedback");
const asyncHandler = require("express-async-handler");

// Get all feedbacks
const getAllFeedbacks = asyncHandler(async (req, res) => {
  try {
    const feedbacks = await Feedback.find().lean();
    if (!feedbacks?.length) {
      return res.status(400).json({ message: "No feedbacks found" });
    }
    return res.json(feedbacks);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get feedback by ID
const getFeedbackById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Feedback ID required" });
  }

  const feedback = await Feedback.findById(id).lean().exec();
  if (!feedback) {
    return res.status(404).json({ message: "Feedback not found" });
  }

  return res.json(feedback);
});

// Create a new feedback
const createFeedback = asyncHandler(async (req, res) => {
  const { username, message, email } = req.body;

  if (!username || !message || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const feedbackObject = { username, email, message };
  const newFeedback = await Feedback.create(feedbackObject);

  if (newFeedback) {
    return res.status(201).json({ message: "New feedback form created" });
  } else {
    return res.status(400).json({ message: "Invalid feedback data" });
  }
});

// Update a feedback
const updateFeedback = asyncHandler(async (req, res) => {
  const {id} = req.params
  const { username, message, email } = req.body;

  if (!id || !username || !message || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const feedback = await Feedback.findById(id).exec();
  if (!feedback) {
    return res.status(400).json({ message: "Feedback not found" });
  }

  feedback.username = username;
  feedback.email = email;
  feedback.message = message;

  const updatedFeedback = await feedback.save();
  return res.json({ message: `Updated feedback from ${updatedFeedback.username}` });
});

// Delete a feedback
const deleteFeedback = asyncHandler(async (req, res) => {
  const { id } = req.body;

  console.log(id)

  if (!id) {
    return res.status(400).json({ message: "Feedback ID required" });
  }

  const feedback = await Feedback.findById(id).exec();
  console.log(feedback)
  if (!feedback) {
    return res.status(400).json({ message: "Feedback not found" });
  }

  const result = await feedback.deleteOne();
  return res.json({ message: `Feedback from ${result.username} has been deleted.` });
});

module.exports = {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
