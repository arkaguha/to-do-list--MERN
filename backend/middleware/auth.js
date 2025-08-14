const jwt = require("jsonwebtoken");
const JWT_SECRET = "supersecret"; // use env var in production

// middleware/auth.js

module.exports = function (req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token, auth denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id: ... }
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
