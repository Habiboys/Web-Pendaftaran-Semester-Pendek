const { User, Student, Subject } = require("../models/index");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const subject = require("../models/subject");

const  cekLogin= async (req, res) => {
  let token = req.cookies.token;
  const refreshToken = req.cookies.refreshToken;
  if (token) {
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
                res.clearCookie("token");
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
            } catch (refreshErr) {
              res.clearCookie("token");
            }
          } else {
            res.clearCookie("token");
          }
        } else {
          req.userId = decoded.id;
          req.userRole = decoded.role;
          req.userEmail = decoded.email;
        }
      }
    );
  }
};

const view_home = async (req, res) => {
  await cekLogin(req, res);
  res.render("mahasiswa/home", { title: "Home", role: req.userRole });
};

const view_profile = async (req, res) => {
  const user = await User.findByPk(req.userId, {
    include: Student,
  });

  const tanggalLahir = moment(user.Student.birth).format("DD MMMM YYYY");
  res.render("mahasiswa/profile", {
    user,
    tanggalLahir,
    title: "Home",
    role: req.userRole,
  });
};

const view_matkul = async (req, res) => {
  await cekLogin(req, res);
  const matkul = await Subject.findAll();
  res.render("mahasiswa/matkul", {
    title: "Daftar Mata Kuliah",
    role: req.userRole,
    matkul,
  });
};

module.exports = {
  view_profile,
  view_home,
  view_matkul,
};
