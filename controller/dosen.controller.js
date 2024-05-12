
const { User, Lecturer } = require("../models/index");
const moment = require('moment');


const view_profile = async (req,res)=>{

    const user = await User.findByPk(req.userId, {
        include: Lecturer
    });

    const tanggalLahir = moment(user.Lecturer.date_of_birth).format('DD MMMM YYYY');
    res.render('dosen/profile', {user, tanggalLahir});
  
}

module.exports ={
    view_profile,
}