// Import model User
const { User, Lecturer, Student } = require("../models");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");


// Endpoint untuk mengubah password
const view_form = async (req, res) => {
  let role = req.userRole;
  const user = await User.findByPk(req.userId, {
    include: Lecturer, Student
});

  if (role === "mahasiswa") {
    return res.render("mahasiswa/ubahpassword", {
      title: "Ubah Password",
      message: req.cookies.pesan,
    });
  } else if (role === "dosen") {
    return res.render("dosen/ubahpassword", {
      page: "Ubah Password",
      message: req.cookies.pesan,
      user,
    });
    
  } else if (role === "admin") {
    return res.render("admin/ubahpassword", {
      message: req.cookies.pesan,
      page:'Ubah Password',
      user,
    });
 
  }

};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const role = req.userRole;
  try {
    // Cari user berdasarkan ID
    const user = await User.findByPk(req.userId);

  
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      let error = "Password salah";
      res.cookie("pesan", error, { maxAge: 1000, httpOnly: true });
      return redirectError(res, role, error);
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = errors.array().map((error) => error.msg);
      return redirectError(res, role, error);
    }

    if (newPassword != confirmPassword) {
      return redirectError(res, role, error);
    }

    const afterHash = await bcrypt.hash(newPassword, 10);
    user.password = afterHash;
    await user.save();

    res.status(200).json({ message: "Password berhasil diubah." });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat mengubah password." });
  }
};


const redirectError = (res, role, error) => {
  res.cookie("pesan", error, { maxAge: 1000, httpOnly: true });
  if (role === "mahasiswa") {
    return res.redirect("/profile/ubah-password");
  } else if (role === "dosen") {
    return res.redirect("/dosen/profile/ubah-password");
  } else if (role === "admin") {
    return res.redirect("/admin/profile/password");
  }
};

module.exports = {
  changePassword,
  view_form,
};
