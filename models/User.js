const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true
  },
  roles: [
    {
      type: String,
      default: "User", 
    },
  ],
  profile: {
    type: String,
  },
  address: {
    type: String,
    required: true
  },
  postcode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("User", userSchema);