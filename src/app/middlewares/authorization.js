const jwt = require('jsonwebtoken');
const { promisify } = require('util')

const authConfig = require('../../config/sessionConfig');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    return res.json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

  } catch (error) {
    return res.status(401).json({ error: 'Invalid Token' });
  }

  return next();
}