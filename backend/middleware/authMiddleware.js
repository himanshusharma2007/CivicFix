const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ msg: "Token invalid" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ msg: "Not admin" });
  next();
};