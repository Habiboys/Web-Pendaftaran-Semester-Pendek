
const { User } = require("../models/index");




const view_profile = async (req,res)=>{
    const user = await User.findByPk(req.userId);
    res.render('admin/profile', {user, page:'Profile'});
  
}
const dashboard = async (req,res)=>{
    const user = await User.findByPk(req.userId);
    res.render('admin/dashboard', {user, page:'Dashboard'});
}
const matkul = async (req,res)=>{
    const user = await User.findByPk(req.userId);
    res.render('admin/matkul', {user, page:'Mata Kuliah'});
}

module.exports ={
    view_profile,
    dashboard,
    matkul,
}