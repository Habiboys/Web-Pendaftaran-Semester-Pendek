const jwt = require("jsonwebtoken");
const { User } = require("../models/index");
require('dotenv').config();

function verifyUser(role) {
  return async function (req, res, next) {
    let token = req.cookies.token;
    const refreshToken = req.cookies.refreshToken;

    if (!token) {
      return res.redirect("/auth/login");
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET_TOKEN,
      async function (err, decoded) {
        if (err) {
          if (err.name === "TokenExpiredError" && refreshToken) {
            try {
              const refreshDecoded = jwt.verify(
                refreshToken,
                process.env.JWT_SECRET_REFRESH_TOKEN
              );
              const user = await User.findOne({
                where: { id: refreshDecoded.id, refreshToken },
              });

              if (!user) {
                return res.redirect("/auth/login");
              }

              token = jwt.sign(
                { id: user.id, email: user.email, role: user.role },
                process.env.JWT_SECRET_TOKEN,
                { expiresIn: "15m" }
              );

              res.cookie("token", token, { httpOnly: true });
              req.userId = user.id;
              req.userRole = user.role;
              req.userEmail = user.email;
              return next();
            } catch (refreshErr) {
              return res.redirect("/auth/login");
            }
          } else {
            return res.redirect("/auth/login");
          }
        } else {
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
        }
      }
    );
  };
}

module.exports = verifyUser;
