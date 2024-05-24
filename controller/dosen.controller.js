
const { User, Lecturer } = require("../models/index");
const moment = require('moment');


const view_profile = async (req,res)=>{

    const user = await User.findByPk(req.userId, {
        include: Lecturer
    });

    const tanggalLahir = moment(user.Lecturer.birth).format('DD MMMM YYYY');
    res.render('dosen/profile', {user, tanggalLahir, page:'Profile'});
  
}
const dashboard = async (req,res)=>{
    const user = await User.findByPk(req.userId, {
        include: Lecturer
    });
    res.render('dosen/dashboard', {user, page:'Dashboard'});
}
const matkul = async (req,res)=>{
    const user = await User.findByPk(req.userId, {
        include: Lecturer
    });
    res.render('dosen/matkul', {user, page:'Mata Kuliah'});
}



module.exports ={
    view_profile,
    dashboard,
    matkul
}