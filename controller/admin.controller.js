
const { User } = require("../models/index");


const view_profile = async (req,res)=>{

    const user = await User.findByPk(req.userId)
    res.render('admin/profile', {user});
  
}

module.exports ={
    view_profile,
}