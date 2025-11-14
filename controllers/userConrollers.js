const User = require('../models/userModel');

// create
exports.createUser = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send('Created');
};

// read all
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.send(users);
};

// read one
exports.getUserByName = async (req, res) => {
  const user = await User.findOne({ name: req.params.name });
  res.send(user || 'Not found');
};

// update
exports.updateUser = async (req, res) => {
  const user = await User.findOneAndUpdate({ name: req.params.name }, req.body, { new: true });
  res.send(user ? 'Updated' : 'Not found');
};

// delete one
exports.deleteUser = async (req, res) => {
  const user = await User.findOneAndDelete({ name: req.params.name });
  res.send(user ? 'Deleted' : 'Not found');
};

// delete all
exports.deleteAllUsers = async (req, res) => {
  try {
    const result = await User.deleteMany({});
    res.send(`All (${result.deletedCount}) users deleted successfully`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
