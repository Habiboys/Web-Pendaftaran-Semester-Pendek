const jwt = require('jsonwebtoken');
require('dotenv').config();

function isLogin(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, function(err, decoded) {
    if (err) {
      res.clearCookie('token');
      return next();
    }

    req.userId = decoded.id;
    req.userRole = decoded.role;
    req.userEmail = decoded.email;

    if (req.userRole == "mahasiswa") {
      return res.redirect("/home");
    } else if (req.userRole == "dosen") {
      return res.redirect("/dosen/dashboard");
    } else if (req.userRole == "admin") {
      return res.redirect("/admin/dashboard");
    }

    next();
  });
}

module.exports = isLogin;
