const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/index");
const {body, validationResult } = require('express-validator');
require('dotenv').config();

const form = (req, res) => {
  console.log(req.cookies.pesan); 
  res.render("login", { message: req.cookies.pesan });
};

const checklogin = [
  body('email')
  .notEmpty().withMessage('Email wajib diisi')
  .isEmail().withMessage('Mohon masukkan alamat email yang valid')
  .normalizeEmail(),
  body('password').notEmpty().withMessage('Password wajib diisi'),

  async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error =   errors.array();
      res.cookie("pesan", error, { maxAge: 1000, httpOnly: true });
      return res.redirect("/auth/login");
    }

    if (!user) {
      const message = [{ msg: 'email atau password salah' }]; 
      res.cookie("pesan", message, { maxAge: 1000, httpOnly: true });
      return res.redirect("/auth/login");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      const message = [{ msg: 'email atau password salah' }];
      res.cookie("pesan", message, { maxAge: 1000, httpOnly: true });
      return res.redirect("/auth/login");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET_REFRESH_TOKEN,
      { expiresIn: '1d' }
    );

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("token", token, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    res.redirect(getRedirectUrl(user.role));
  } catch (err) {
    console.error("Error during login: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
}];

function getRedirectUrl(role) {
  switch (role) {
    case "mahasiswa":
      return "/home";
    case "dosen":
      return "/dosen/dashboard";
    case "admin":
      return "/admin/dashboard";
    default:
      return "/";
  }
}

const logout = async (req, res) => {
  res.clearCookie("token");
  res.clearCookie("refreshToken");
  res.redirect("/");
};

module.exports = {
  form,
  checklogin,
  logout,
};
