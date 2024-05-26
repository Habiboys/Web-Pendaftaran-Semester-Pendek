const { User, Lecturer, Subject } = require("../models/index");




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
    try {
        const matkul= await Subject.findAll({
            attributes: ['name', 'id', 'status', 'semester'],
            include: [{
                model: Lecturer, 
                as: 'Lecturer',
                attributes:['name'],
            }]
        })
        console.log(matkul);
        res.render('admin/matkul', {user, matkul, page:'Mata Kuliah'});
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message: "Server Error"})
    }
   
}
const tambahmatkul = async (req,res)=>{
    const user = await User.findByPk(req.userId);
    const dosen = await Lecturer.findAll()
    res.render('admin/tambahmatkul', {user, dosen, page:'Tambah Mata Kuliah'});
}


module.exports ={
    view_profile,
    dashboard,
    matkul,
    tambahmatkul,
}