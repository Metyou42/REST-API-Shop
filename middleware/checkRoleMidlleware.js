const jsonwebtoken = require('jsonwebtoken');

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === 'OPTIONS') next();
    try {
      const token = req.headers.authorization.split(' ')[1]; // Bearer 324g2yt23dt2d3...
      if (!token) return res.status(401).json({ messaage: 'Unauthorized' });
      const decode = jsonwebtoken.verify(token, process.env.SECRET_JWT);
      if (decode.role !== role) return res.status(403).json({ messaage: 'Forbiden' });
      req.user = decode;
      next();
    } catch (e) {
      res.status(401).json({ messaage: 'Unauthorized' });
    }
  };
};
