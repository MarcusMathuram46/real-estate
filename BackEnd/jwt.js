const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const generateToken =(id, role)=>{
  return jwt.sign({id, role},JWT_SECRET,{expiresIn: '1d'});
}

module.exports = generateToken;