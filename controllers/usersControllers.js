const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    if (!users?.length) {
      return res.status(400).json({ message: "No users found " });
    } else {
      return res.json(users);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID required" });
  }

  const user = await User.findById(id)

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json(user);
});

const createUser = asyncHandler(async (req, res) => {
  const {
    username,
    fullname,
    password,
    email,
    phone_number,
    roles,
    profile,
    address,
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
    !fullname
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
    fullname
  };

  //storing new user
  const user = await User.create(userObject);

  if (user) {
    return res.status(201).json({ message: `new user ${username} created` });
  } else {
    res.status(400).json({ message: "Invalid user data " });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    username,
    password,
    email,
    phone_number,
    address,
    fullname,
    roles,
    profile,
  } = req.body;

  // Checks fields
  if (
    !username ||
    !email ||
    !phone_number ||
    !address ||
    !fullname ||
    !Array.isArray(roles) ||
    !roles.length ||
    !password ||
    !profile 
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update user fields
  user.username = username;
  user.email = email;
  user.phone_number = phone_number;
  user.address = address;
  user.fullname = fullname;
  user.password = await bcrypt.hash(password, 10); // Always hash password on update
  user.profile = profile;
  user.roles = roles;

  const updatedUser = await user.save();
  return res.json({ message: `Updated user ${updatedUser.username}` });
});

const updateUserInformation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    username,
    email,
    phone_number,
    address,
    fullname,
    roles,
    profile,
  } = req.body;

  // Checks fields
  if (
    !username ||
    !email ||
    !phone_number ||
    !address ||
    !fullname ||
    !Array.isArray(roles) ||
    !roles.length ||
    !profile 
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update user fields
  user.username = username;
  user.email = email;
  user.phone_number = phone_number;
  user.address = address;
  user.fullname = fullname;
  user.profile = profile;
  user.roles = roles;

  const updatedUser = await user.save();
  return res.json({ message: `Updated user ${updatedUser.username}` });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID required" });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const result = await user.deleteOne();

  return res.json(`User ${result.username} has been deleted.`);
});


module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  updateUserInformation,
  deleteUser,
  getUserById
};
