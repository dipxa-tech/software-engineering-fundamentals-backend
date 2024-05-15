const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const createUser = asyncHandler(async (req, res) => {
  const {
    username,
    password,
    email,
    phone_number,
    roles,
    profile,
    address,
    postcode,
    country,
  } = req.body;

  //this helps confirm fields
  if (
    !username ||
    !password ||
    !Array.isArray(roles) ||
    !roles.length ||
    !profile ||
    !email ||
    !phone_number ||
    !address ||
    !postcode ||
    !country
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //checks for dups
  const duplicate = await User.findOne({ username }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicated username" });
  }

  //hash pwds using salt rounds
  const hashedPwd = await bcrypt.hash(password, 10);

  const userObject = {
    username,
    password: hashedPwd,
    roles,
    profile,
    email,
    phone_number,
    address,
    postcode,
    country,
  };

  //storing new user
  const user = await User.create(userObject);

  if (user) {
    return res.status(201).json({ message: `new user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data " });
  }
});

module.exports = {
  createUser,
};
