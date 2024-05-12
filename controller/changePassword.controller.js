// Import model User
const { User } = require('../models');
const bcrypt = require ('bcrypt');

// Endpoint untuk mengubah password
const view_form= (req,res)=>{
    let role = req.userId
    let action;
    
    if (role === "mahasiswa") {
        action = "/profile/ubah-password";
    } else if (role === "dosen") {
        action= "/dosen/profile/ubah-password";
    } else if (role === "admin") {
        action = "/admin/profile/password";
    }

    res.render('changePassword', { action });
}


const changePassword= async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    // Cari user berdasarkan ID
    const user = await User.findByPk(req.userId);

   
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan.' });
    }


    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Password salah.' });
    }

    const afterHash = await bcrypt.hash(newPassword, 10);
    user.password = afterHash;
    await user.save();


    res.status(200).json({ message: 'Password berhasil diubah.' });
  } catch (error) {

    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat mengubah password.' });
  }
};

module.exports={
    changePassword,
    view_form,
};