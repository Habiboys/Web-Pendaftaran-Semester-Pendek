const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/index");

const lihatprofil = async(req, res) => {
  const id = req.userId
  const profil = await User.findOne({
    where: {
        id:id
    }
  })
  
  if(!profil){
    return res.status(400).json({message:"profil tidak ditemukan"})
  }
  const role = req.userRole

  if (role == "mahasiswa"){
    return  res.render("mahasiswa/profilmahasiswa", { profil });
  } else if (role == "dosen"){
    return res.render("dosen/profildosen", {  profil });
  } else if(role == "admin"){
    console.log("admin")
    console.log(profil.email)
    return res.render("admin/profiladmin" , { profil });
  }
   
  };
  module.exports ={
    lihatprofil
  }