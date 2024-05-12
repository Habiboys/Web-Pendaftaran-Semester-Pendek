const jwt = require('jsonwebtoken');

function verifyTokenAndRole(role) {
  return function(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
      return res.redirect("/auth/login");
      // return res.status(401).send({ auth: false, message: 'Token not found.' });
    }

    jwt.verify(token, process.env.JWT_SECRET_TOKEN, function(err, decoded) {
      if (err) {
        return res.status(500).send({ auth: false, message: 'Gagal untuk melakukan verifikasi token.' });
      }

      req.userId = decoded.id;
      req.userRole = decoded.role; 
      req.userEmail = decoded.email;

      if (role && req.userRole !== role) {
        if (req.userRole == "mahasiswa") {
          return res.redirect("/home");
        } else if (req.userRole == "dosen") {
          return res.redirect("/dosen/dashboard");
        } else if (req.userRole == "admin") {
          return res.redirect("/admin/dashboard");
        }
      }

      next();
    });
  };
}

module.exports = verifyTokenAndRole;
