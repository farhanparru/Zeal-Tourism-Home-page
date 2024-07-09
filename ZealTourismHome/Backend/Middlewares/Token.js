const jwt = require('jsonwebtoken');
require('dotenv').config()

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
    expiresIn: '1h', 
  });
  return token;
};

module.exports = generateToken;
