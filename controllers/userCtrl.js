const User = require("../models/userModel");

const userCtrl = {
  searchUser: async (req, res) => {
    try {
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = useCtrl;
