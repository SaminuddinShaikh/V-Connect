const Users = require("../models/userModel");

const userCtrl = {
  searchUser: async (req, res) => {
    try {
      const users = await Users.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select("fullName username avatar");
      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id).select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist." });
      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { avatar, fullName, mobile, address, story, website, gender } =
        req.body;

      !fullName && res.status(400).json({ msg: "Please add your full name." });

      await Users.findOneAndUpdate(
        { _id: req.user._id },
        {
          avatar,
          fullName,
          mobile,
          address,
          story,
          website,
          gender,
        }
      );
      res.json({ msg: "Profile Update Successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;
