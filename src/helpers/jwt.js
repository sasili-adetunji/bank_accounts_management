const jwt =  require('jsonwebtoken')
require('dotenv').config()

const secret = process.env.secret;

const sign = (payload) => {
  let token = jwt.sign(payload, secret, { expiresIn: 86400 });
  return token
};

const verify = (req, res, next) => {
  const header = req.headers['authorization']
  let token = header && header.split(' ')[1]
  if ((typeof header === 'undefined') || (!token)) {
    return res.status(403).send({ message: "No token provided!" });
  } 
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    } else {
      req.userId = decoded.sub;
      next()
    }
  })
};

module.exports = {
  sign,
  verify,
};
