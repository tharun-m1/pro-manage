const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const errorHandler = require("../utils/errorHandler");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const router = express.Router();

router.patch("/update", isLoggedIn, async (req, res, next) => {
  try {
    const adminId = req.adminId;
    const { name, oldPassword, newPassword } = req.body;
    console.log(name, oldPassword, newPassword);
    if (!name && (!oldPassword || !newPassword)) {
      return next(errorHandler(500, "no details"));
    }
    const admin = await Admin.findOne({ _id: adminId });
    if (!admin) {
      return next(errorHandler(404, "User not found"));
    }
    if (name) {
      admin.name = name;
    }
    if (oldPassword && newPassword) {
      const passwordMatched = await bcrypt.compare(oldPassword, admin.password);
      if (!passwordMatched) {
        return next(errorHandler(401, "Incorrect password"));
      }
      const encryptedPassword = await bcrypt.hash(newPassword, 10);
      admin.password = encryptedPassword;
    }
    await admin.save();
    return res.status(200).json({
      status: "OK",
      message: "User Updated.",
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/get-name", isLoggedIn, async (req, res, next) => {
  try {
    const adminId = req.adminId;
    const admin = await Admin.findOne({ _id: adminId });
    if (!admin) {
      return next(errorHandler(404, "Not Found"));
    }
    return res.status(200).json({
      status: "OK",
      data: admin.name,
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
