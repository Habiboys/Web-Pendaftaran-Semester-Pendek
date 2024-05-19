
const { User, Student } = require("../models/index");
const moment = require('moment');


const view_profile = async (req,res)=>{

    const user = await User.findByPk(req.userId, {
        include: Student
    });

    const tanggalLahir = moment(user.Student.date_of_birth).format('DD MMMM YYYY');
    res.render('mahasiswa/profile', {user, tanggalLahir , title : 'Home' });
  
}

module.exports ={
    view_profile,
}