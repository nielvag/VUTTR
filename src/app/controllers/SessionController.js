const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const sessionConfig = require('../../config/sessionConfig');

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where:  { email } });

    if(!user) {
      return res.json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.pass_hash);

    if(!passwordMatch) {
      return res.json({ error: 'Password does not match' });
    }

    const token = jwt.sign(
      { id: user.id },
      sessionConfig.secret,
      { expiresIn: sessionConfig.expiresIn }
    );

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email,
      },
      token,
    });
  }
}