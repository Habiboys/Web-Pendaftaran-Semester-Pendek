const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/index");
const { where } = require("sequelize");

const formchangepass = (req, res) => {
  

  
    res.render("ubahpass", { title: "Express" });
  };

const ubahpass = async (req, res) => {

    const {passwordLama , passwordBaru} = req.body
    const id = req.userId
    try { 
        if(!passwordLama||!passwordBaru){
            return res.status(400).json({message: "Isi password lama atau password barunya"})
        }
    const findAccount = await User.findOne({where:{id:id}})    
    if(!findAccount){
        return res.status(400).json({message: "Akun tidak ditemukan"})
    }
    const passwordAsli = findAccount.password
    const passwordMatch = bcrypt.compareSync(passwordLama , passwordAsli)
    if(!passwordMatch) {
       return res.status(400).json({message: "Password Anda Salah"})
    }
    const salt = bcrypt.genSaltSync(10)
            const encryptPass = bcrypt.hashSync(passwordBaru, salt)
            await User.update({
                password : encryptPass

            }, {where:{id:id}}
        )
        return res.status(200).json({message : "data berhasil diperbarui"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Ada Error"})
    }
}


module.exports = {
    ubahpass,
    formchangepass
}
