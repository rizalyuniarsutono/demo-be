const jwt = require("jsonwebtoken");
const generateToken = (payload) => {
  const verifyOpts = {
    expiresIn: "30d",
    issuer: "api",
  };
  const token = jwt.sign(payload, process.env.SECRETE_KEY_JWT, verifyOpts);
  return token;
};

const generateRefreshToken = (payload) => {
  const verifyOpts = { expiresIn: "30 day" };
  const token = jwt.sign(payload, process.env.SECRETE_KEY_JWT, verifyOpts);
  return token;
};

module.exports = { generateToken, generateRefreshToken};
