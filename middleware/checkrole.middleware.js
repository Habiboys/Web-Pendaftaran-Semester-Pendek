function checkRole(role) {
  
    return function(req, res, next) {
      if (req.userRole === role) {
        next(); // Lanjut ke rute berikutnya jika peran sesuai
      } else {
        res.redirect ('/notfound')
      }
    };
  }

  module.exports = checkRole;