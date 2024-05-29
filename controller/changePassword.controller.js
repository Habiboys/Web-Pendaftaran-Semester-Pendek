// Import model User
const { User, Lecturer, Student } = require("../models");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

// Endpoint untuk mengubah password
const view_form = async (req, res) => {
  let role = req.userRole;
  const user = await User.findByPk(req.userId, {
    include: Lecturer,
    Student,
  });

  if (role === "mahasiswa") {
    return res.render("mahasiswa/ubahpassword", {
      title: "Ubah Password",
      error: req.cookies.error,
      success: req.cookies.success,
    });
  } else if (role === "dosen") {
    return res.render("dosen/ubahpassword", {
      page: "Ubah Password",
      error: req.cookies.error,
      success: req.cookies.success,
      user,
    });
  } else if (role === "admin") {
    return res.render("admin/ubahpassword", {
      error: req.cookies.error,
      success: req.cookies.success,
      page: "Ubah Password",
      user,
    });
  }
};
const isPasswordValid = async (value, { req }) => {
  const user = await User.findByPk(req.userId);

  const isPasswordValid = await bcrypt.compare(value, user.password);
  if (!isPasswordValid) {
    throw new Error("Password salah");
  }
  return true;
};
const changePassword = [
  body("oldPassword")
    .notEmpty()
    .withMessage("Password lama harus diisi")
    .bail()
    .custom(isPasswordValid),
  body("newPassword")
    .notEmpty()
    .withMessage("Konfirmasi password harus diisi")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password baru harus minimal 6 karakter")
    .matches(/\d/)
    .withMessage("Password baru harus mengandung setidaknya satu angka")
    .matches(/[a-z]/)
    .withMessage("Password baru harus mengandung setidaknya satu huruf kecil")
    .matches(/[A-Z]/)
    .withMessage("Password baru harus mengandung setidaknya satu huruf besar"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Konfirmasi password harus diisi")
    .bail()
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage("Konfirmasi password tidak cocok dengan password baru"),

  async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const role = req.userRole;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error = errors.array();
        console.log(error);
        return redirectError(res, role, error);
      }

      if (newPassword != confirmPassword) {
        return redirectError(res, role, error);
      }

      const afterHash = await bcrypt.hash(newPassword, 10);
      user.password = afterHash;
      await user.save();

      return redirectSucces(res, role);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      res
        .status(500)
        .json({ message: "Terjadi kesalahan saat mengubah password." });
    }
  },
];

const redirectError = (res, role, error) => {
  res.cookie("error", error, { maxAge: 1000, httpOnly: true });
  if (role === "mahasiswa") {
    return res.redirect("/profile/ubah-password");
  } else if (role === "dosen") {
    return res.redirect("/dosen/profile/ubah-password");
  } else if (role === "admin") {
    return res.redirect("/admin/profile/ubah-password");
  }
};
const redirectSucces = (res, role) => {
  const success = "Password Berhasil Di ubah";
  res.cookie("success", success, { maxAge: 1000, httpOnly: true });
  if (role === "mahasiswa") {
    return res.status(200).redirect("/profile/ubah-password");
  } else if (role === "dosen") {
    return res.status(200).redirect("/dosen/profile/ubah-password");
  } else if (role === "admin") {
    return res.status(200).redirect("/admin/profile/ubah-password");
  }
};

module.exports = {
  changePassword,
  view_form,
};
