const jwt = require('jsonwebtoken');
require('dotenv').config();

function isLogin(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    // Jika tidak ada token, lanjutkan ke middleware berikutnya
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, function(err, decoded) {
    if (err) {
      // Jika token tidak valid, hapus cookie dan lanjutkan ke middleware berikutnya
      res.clearCookie('token');
      return next();
    }

    // Jika verifikasi berhasil, atur data pengguna dan lanjutkan ke middleware berikutnya
    req.userId = decoded.id;
    req.userRole = decoded.role;
    req.userEmail = decoded.email;

    // Periksa peran pengguna dan alihkan sesuai ke halaman yang sesuai
    if (req.userRole == "mahasiswa") {
      return res.redirect("/home");
    } else if (req.userRole == "dosen") {
      return res.redirect("/dosen/dashboard");
    } else if (req.userRole == "admin") {
      return res.redirect("/admin/dashboard");
    }

    // Jika peran pengguna tidak sesuai dengan yang diharapkan, lanjutkan ke middleware berikutnya
    next();
  });
}

module.exports = isLogin;
