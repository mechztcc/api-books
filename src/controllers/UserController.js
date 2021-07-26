const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },

  async store(req, res) {
    const { name, email, password } = req.body;
    const hashPass = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashPass });
    return res.json(user);
  },
};
