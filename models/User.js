const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  fullname: {
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
    required: true,
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
    required: true,
  },
  receipts: [
    { type: mongoose.Schema.Types.ObjectId,
      ref: "Receipt",
    }
  ],
});

module.exports = mongoose.model("User", userSchema);
