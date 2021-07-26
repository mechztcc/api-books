const express = require('express');
const authConfig = require('../config/auth.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, { expiresIn: '1d' });
}

module.exports = {
  async auth(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    user.password = undefined;
    res.json({ user, token: generateToken({ id: user.id }) });
  },
};
