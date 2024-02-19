const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Admin = require("../models/admin");
const errorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// =====================Sign up=================================================

router.post("/signup", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const duplicate = await Admin.findOne({ email });
    if (duplicate) {
      return next(errorHandler(409, "User already Exists"));
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await Admin.create({ name, email, password: encryptedPassword });
    res.status(200).json({
      status: "OK",
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});
// ===========================================================================

// ===================================Login===================================
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return next(errorHandler(404, "User Not Found"));
    }
    const passwordMatched = await bcrypt.compare(password, admin.password);
    if (!passwordMatched) {
      return next(errorHandler(401, "incorrect credentials"));
    }
    const payload = {
      adminId: admin._id,
    };
    const jwToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 60,
    });
    res.status(200).json({
      status: "OK",
      jwToken,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});
// ====================================================================

module.exports = router;
