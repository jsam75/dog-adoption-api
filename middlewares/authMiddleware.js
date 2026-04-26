const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {

    console.log("AUTH HEADER:", req.headers.authorization);
    const authHeader = req.headers.authorization;

    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Not authorized' });
      }

    const token = authHeader.split(' ')[1].replace(/;$/, '');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Not authorized' });
  }
};

module.exports = authMiddleware;