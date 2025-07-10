const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  console.log("TOKEN RECEIVED:", token);

  if (!token)
    return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const pureToken = token.replace("Bearer ", "");
    const decoded = jwt.verify(pureToken, process.env.JWT_SECRET);
    console.log("DECODED:", decoded);
    req.admin = decoded.id;
    next();
  } catch (err) {
    console.log("JWT ERROR:", err.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};
