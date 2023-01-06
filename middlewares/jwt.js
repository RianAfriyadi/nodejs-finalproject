const jwt = require('jsonwebtoken');

const SECRET_KEY = 'Rian@2023';

const generateToken = (payload) => {
  const token = jwt.sign(payload, SECRET_KEY,
    {
      expiresIn: 60 * 30,//30 minutes
    }
    );
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch(error) {
    return null
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
