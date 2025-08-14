const User = require("./models/User");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "supersecret"; // use env var in production
const auth = require("./middleware/auth");

exports.postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
