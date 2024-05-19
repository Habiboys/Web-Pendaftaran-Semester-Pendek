const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/index");
const {  validationResult } = require('express-validator');


const form = (req, res) => {
  console.log(req.cookies.pesan); 
  res.render("login",  {message: req.cookies.pesan} );

};

const checklogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Menggunakan nama variabel lain untuk menyimpan hasil pencarian user
    const user = await User.findOne({ where: { email } });
    const notValidation = validationResult (req);
    if (!notValidation.isEmpty()){
      res.cookie("pesan", notValidation.array()[0].msg, {maxAge: 1000, httpOnly: true })
      return res.redirect("/auth/login");
    }
  
    if (!user) {
      const message = 'email atau password salah'; 
      res.cookie("pesan", message, {maxAge: 1000, httpOnly: true });
      return res.redirect("/auth/login");
      // return res.status(404).json({ message: "User tidak ada" });
    }

    // Verifikasi password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      const message = 'email atau password salah'; 
      res.cookie("pesan", message, {maxAge: 1000, httpOnly: true });
      return res.redirect("/auth/login");
      // return res.status(401).json({ message: "password salah" });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: 86400 }
    );

    // Set cookie dengan token
    res.cookie("token", token, { httpOnly: true });
 

    // Redirect ke halaman sesuai dengan peran pengguna
    if (user.role == "mahasiswa"){
      return res.redirect("/home");
    } else if (user.role == "dosen"){
      return res.redirect("/dosen/dashboard");
    } else if(user.role == "admin"){
      return res.redirect("/admin/dashboard");
    }

    // Jika tidak ada peran yang cocok, berikan respons standar
    res.status(200).send({ auth: true, token: token });

  } catch (err) {
    console.error("Error during login: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

function logout(req, res) {
  res.clearCookie("token");
  res.redirect("/auth/login");
 
}

const changePassword = async (req,res)=>{

};

const view_profile = async (req,res)=>{
  
}



module.exports = {
  form,
  checklogin,
  logout,
};
