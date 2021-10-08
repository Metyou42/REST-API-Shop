const jsonwebtoken = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') next();
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer 324g2yt23dt2d3...
    if (!token) return res.status(401).json({ messaage: 'Unauthorized' });
    const decode = jsonwebtoken.verify(token, process.env.SECRET_JWT);
    req.user = decode;
    next();
  } catch (e) {
    res.status(401).json({ messaage: 'Unauthorized' });
  }
};
