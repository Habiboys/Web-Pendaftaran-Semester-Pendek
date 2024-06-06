const { User, Student, Subject, Registration } = require("../models/index");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const subject = require("../models/subject");

const cekLogin = async (req, res, next) => {
  let token = req.cookies.token;
  const refreshToken = req.cookies.refreshToken;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_TOKEN, async (err, decoded) => {
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
              return next();
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
            res.clearCookie("token");
            return next(refreshErr);
          }
        } else {
          res.clearCookie("token");
          return next(err);
        }
      } else {
        req.userId = decoded.id;
        req.userRole = decoded.role;
        req.userEmail = decoded.email;
        return next();
      }
    });
  } else {
    return next();
  }
};

const view_home = async (req, res) => {
  await cekLogin(req, res, () => {
    res.render("mahasiswa/home", { title: "Home", role: req.userRole });
  });
};

const view_profile = async (req, res) => {
  await cekLogin(req, res, async () => {
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
  });
};

const view_matkul = async (req, res) => {
  await cekLogin(req, res, async () => {
    const matkul = await Subject.findAll();

    for (const m of matkul) {
      const jumlahPendaftar = await Registration.count({ where: { subjectId: m.id } });
      m.dataValues.jumlahPendaftar = jumlahPendaftar;
    }

    res.render("mahasiswa/matkul", {
      title: "Daftar Mata Kuliah",
      role: req.userRole,
      matkul,
    });
  });
};

const daftarMatkul = async (req, res) => {
  await cekLogin(req, res, async () => {
    const { id } = req.params;
    const matkul = await Subject.findByPk(id);
    if (!matkul) {
      return res.redirect("/notfound");
    }
    const mhs = await User.findByPk(req.userId, {
      include: Student,
    });

    const hasRegis = await Registration.findOne({
      where: {
        subjectId: matkul.id,
        studentNim: mhs.Student.nim,
      },
    });

    res.render("mahasiswa/detailMatkul", {
      title: "Mata Kuliah",
      role: req.userRole,
      matkul,
      hasRegis,
      error: req.cookies.error,
    });
  });
};

const prosesDaftar = async (req, res) => {
  const { id } = req.params;
  const subject = await Subject.findByPk(id);
  const mhs = await User.findByPk(req.userId, {
    include: Student,
  });

  const hasRegis = await Registration.findOne({
    where: {
      subjectId: subject.id,
      studentNim: mhs.Student.nim,
    },
  });

  if (hasRegis) {
    return res.status(400).redirect(`/mata-kuliah/daftar/${id}`);
  }
  const registrations = await Registration.findAll({
    where: {
      studentNim: mhs.Student.nim,
    },
    include: Subject,
  });
  let totalSKS = 0;
  registrations.forEach((registration) => {
    totalSKS += registration.Subject.credit;
  });

  const totalSKSToRegister = totalSKS + subject.credit;

  if (totalSKSToRegister > 9) {

    res.cookie("error", "Anda Telah Mencapai Batas maksimum sks", {
      maxAge: 1000,
      httpOnly: true,
    });
    return res.status(400).redirect(`/mata-kuliah/daftar/${id}`);
  }
  await Registration.create({
    subjectId: subject.id,
    studentNim: mhs.Student.nim,
    date: new Date(),
  });

  const jumlahPendaftar = await Registration.count({
    where: { subjectId: id },
  });
  if (jumlahPendaftar >= subject.capacity) {
    await subject.update({ status: "active" }, { where: { id } });
  }

  return res.status(202).redirect(`/mata-kuliah/daftar/${id}`);
};

module.exports = {
  view_profile,
  view_home,
  view_matkul,
  daftarMatkul,
  prosesDaftar,
};
