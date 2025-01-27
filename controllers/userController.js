const userService = require('../services/userService');

// Validate user input
const validateUserFields = (name, email, membership_start_date) => {
  if (!name || !email || !membership_start_date) {
    throw new Error('Missing required fields: name, email, and membership_start_date are all required.');
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format.');
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Add a new user
const addUser = async (req, res) => {
  const { name, email, membership_start_date } = req.body;
  try {
    // Validate input fields
    validateUserFields(name, email, membership_start_date);

    const newUser = await userService.addUser(name, email, membership_start_date);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).send({ message: 'Error adding user', error: err.message });
  }
};

module.exports = { getAllUsers, addUser };
