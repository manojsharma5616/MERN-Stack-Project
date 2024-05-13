const Users = require("../models/user-model");
const Contact = require("../models/contact-model");
// getAllUsers Logic
const getAllUsers = async (req, res, next) => {
  try {
    const users = await Users.find({}, { password: 0 });
    console.log(users);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// User Delete Logic
const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Users.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
// user data get and update logic
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await Users.findOne({ _id: id }, { password: 0 });
    return res.status(200).json({ message: data });
  } catch (error) {
    next(error);
  }
};
const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateUserData = req.body;
    const updatedData = await Users.updateOne(
      { _id: id },
      { $set: updateUserData }
    );
    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};
// getAllContacts Logic
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    console.log(contacts);
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: "No Contacts Found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};
const deleteContactById = async (req, res, next) => {
  try {
    const id=req.params.id;
    console.log("contact id ", id);
    await Contact.deleteOne({ _id: id });
    return res.status(200).json({ message: "Contact Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactById,
};
