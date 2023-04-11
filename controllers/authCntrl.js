const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {
  register: async (req, res) => {
    try {
      const { fullName, username, email, password, gender } = req.body;
      let newUserName = username.toLowerCase().replace(/ /g, "");

      const userName = await Users.findOne({ username: newUserName });
      if (userName) return res.status(400).json({ msg: "This username already exists" });

      const userEmail = await Users.findOne({ email });
      if (userEmail) return res.status(400).json({ msg: "This email already exists" });

      if (password.length < 6) return res.status(400).json({ msg: "Password must be at least 6 characters" });

      const salt = await bcrypt.genSalt(10);

      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = new Users({ fullName, username: newUserName, email, password: passwordHash, gender });

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      await newUser.save();

      // res.json({ msg: "registered success", newUser, accessToken, refreshToken });
      res.status(200).json({
        msg: "registered success",
        access_token,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email }).populate("followers following", "-password");

      if (!user) return res.status(400).json({ msg: "Invalid credentials, Register if visiting for first time" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        msg: "login success",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      res.status(200).json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now." });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (err, result) => {
        if (err) return res.status(400).json({ msg: "Please login now." });

        const user = await Users.findById(result.id)
          .select("-password")
          .populate("followers following", "avatar username fullname followers following");

        if (!user) return res.status(400).json({ msg: "This does not exist." });

        const access_token = createAccessToken({ id: result.id });

        res.status(200).json({
          access_token,
          user,
        });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
};

module.exports = authCtrl;
