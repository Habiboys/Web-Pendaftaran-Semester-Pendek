const {
  User,
  Student,
  Subject,

  Lecturer,
  Registration,
  Notification,
  Schedule,
} = require("../models/index");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");

const PDFDocument = require("pdfkit");
require("dotenv").config();

const PushNotifications = require("@pusher/push-notifications-server");

const beamsClient = new PushNotifications({
  instanceId: process.env.INSTANCE_ID,
  secretKey: process.env.PUSHER_SECRET_KEY,
});

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

const authBeam = async (req, res) => {
  await cekLogin(req, res, () => {
    const userId = req.userId.toString();
    const userIDInQueryParam = req.query["user_id"];
    console.log(userId);
    console.log(userIDInQueryParam);
    if (userId != userIDInQueryParam) {
      res.status(401).send("Permintaan tidak konsisten");
    } else {
      const beamsToken = beamsClient.generateToken(userId);
      res.send(JSON.stringify(beamsToken));
    }
  });
};

const view_home = async (req, res) => {
  await cekLogin(req, res, () => {
    res.render("mahasiswa/home", {
      title: "Home",
      role: req.userRole,
      userId: req.userId,
    });
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
      userId: req.userId,
    });
  });
};

const view_matkul = async (req, res) => {
  await cekLogin(req, res, async () => {
    const matkul = await Subject.findAll();

    for (const m of matkul) {
      const jumlahPendaftar = await Registration.count({
        where: { subjectId: m.id },
      });

      m.jumlahPendaftar = jumlahPendaftar;
    }

    res.render("mahasiswa/matkul", {
      title: "Daftar Mata Kuliah",
      role: req.userRole,
      matkul,
      userId: req.userId,
    });
  });
};

const daftarMatkul = async (req, res) => {
  const { id } = req.params;
  const matkul = await Subject.findByPk(id,{
    include:[Lecturer]
  });
  if (!matkul) {
    return res.redirect("/notfound");
  }
  const mhs = await User.findByPk(req.userId, {
    include: Student,
  });
  const deadline = moment(matkul.createdAt)
    .add(5, "days")
    .format("DD MMMM YYYY");
  const hasRegis = await Registration.findOne({
    where: {
      subjectId: matkul.id,
      studentNim: mhs.Student.nim,
    },
  });
  const hasUpload = await Registration.findOne({
    where: {
      studentNim: mhs.Student.nim,
      subjectId: matkul.id,
      paymentProof: {
        [Op.ne]: null,
      },
    },
  });

  const hasVerified = await Registration.findOne({
    where: {
      studentNim: mhs.Student.nim,
      subjectId: matkul.id,
      status: "verified",
    },
  });

  console.log(hasUpload);
  res.render("mahasiswa/detailMatkul", {
    title: "Mata Kuliah",
    role: req.userRole,
    matkul,
    hasRegis,
    hasUpload,
    deadline,
    hasVerified,
    error: req.cookies.error,
    success: req.cookies.success,
    userId: req.userId,
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

let cekFormat = false;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cekFormat = true;
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: fileFilter,
});

const uploadFile = async (req, res) => {
  cekFormat = false;
  upload.single("paymentProof")(req, res, async (err) => {
    if (cekFormat === true) {
      res.cookie("error", "Hanya file PNG dan JPG yang diizinkan", {
        maxAge: 1000,
        httpOnly: true,
      });
      return res.status(400).redirect("/mata-kuliah/daftar/" + req.params.id);
    }
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        res.cookie("error", "Ukuran file tidak boleh lebih dari 5MB", {
          maxAge: 1000,
          httpOnly: true,
        });
        return res.status(400).redirect("/mata-kuliah/daftar/" + req.params.id);
      }
    }

    if (!req.file) {
      res.cookie("error", "Tidak ada file yang diunggah.", {
        maxAge: 1000,
        httpOnly: true,
      });
      return res.status(400).redirect("/mata-kuliah/daftar/" + req.params.id);
    }

    console.log("File yang diunggah:", req.file);

    const mhs = await User.findByPk(req.userId, {
      include: Student,
    });

    const daftar = await Registration.findOne({
      where: {
        subjectId: req.params.id,
        studentNim: mhs.Student.nim,
      },
    });

    if (daftar.paymentProof) {
      const oldFilePath = path.join(
        __dirname,
        "../uploads",
        daftar.paymentProof
      );
      fs.unlink(oldFilePath, (unlinkErr) => {
        if (unlinkErr) console.error("Error deleting old file:", unlinkErr);
        else console.log("Old file deleted successfully");
      });
    }
    daftar.paymentProof = req.file.filename;
    await daftar.save();
    res.cookie("success", "File Berhasil Di Upload", {
      maxAge: 1000,
      httpOnly: true,
    });
    return res.redirect("/mata-kuliah/daftar/" + req.params.id);
  });
};

const notifikasi = async (req, res) => {
  const student = await Student.findOne({
    where: {
      userId: req.userId,
    },
  });
  const notif = await Notification.findAll({
    where: {
      studentNim: student.nim,
    },
    order: [
      ["createdAt", "DESC"], 
    ],
  });
  console.log(notif);
  res.render("mahasiswa/notifikasi", {
    title: "Home",
    role: req.userRole,
    notif,
    moment,
    userId: req.userId,
  });
};

const download = async (req, res) => {
  try {
    const { id } = req.params;
    const jadwal = await Schedule.findAll({
      where: {
        subjectId: id,
      },
    });
    const matkul = await Subject.findByPk(id, {
      include: [Lecturer],
    });

    
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="jadwal-kuliah-Sp-${matkul.name}.pdf"`
    );

    
    doc.pipe(res);

    
    doc
      .fontSize(20)
      .text(`Jadwal Kuliah Semester Pendek ${matkul.name}`, {
        align: "center",
      });
    doc.moveDown(0.1);
    doc
      .fontSize(12)
      .text(`Dosen Pengampu: ${matkul.Lecturer.name}`, { align: "center" });
    doc.moveDown(2);

    jadwal.forEach((schedule, index) => {
      doc.fontSize(12).text(`${index + 1}. Hari: ${schedule.day}`);
      doc.text(
        `   Pukul: ${schedule.timeStart
          .split(":")
          .slice(0, 2)
          .join(":")} s/d ${schedule.timeEnd.split(":").slice(0, 2).join(":")}`
      );
      doc.text(`   Gedung: ${schedule.building}`);
      doc.text(`   Ruangan: ${schedule.room}`);
      doc.moveDown(0.1);
    });

    
    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Internal Server Error");
  }
};

const hasRead = async (req, res) => {
  const { id } = req.params;

  const notif = await Notification.findByPk(id);

  notif.status = "read";
  await notif.save();

  return res.redirect("/mata-kuliah/daftar/" + notif.subjectId);
};

const informasi = async (req, res) => {
  await cekLogin(req, res, () => {
    res.render("mahasiswa/informasi", {
      title: "Informasi",
      role: req.userRole,
      userId: req.userId,
    });
  });
};

const searchMatkul = async (req, res) => {
  await cekLogin(req, res, async () => {
    const { query } = req.query;
    let matkul;

    if (query) {
      matkul = await Subject.findAll({
        where: {
          name: {
            [Op.like]: `%${query}%`,
          },
        },
      });
    } else {
      matkul = await Subject.findAll();
    }

    for (const m of matkul) {
      const jumlahPendaftar = await Registration.count({
        where: { subjectId: m.id },
      });
      m.jumlahPendaftar = jumlahPendaftar;
    }

    res.render("mahasiswa/matkul", {
      title: "Daftar Mata Kuliah",
      role: req.userRole,
      matkul,
      userId: req.userId,
    });
  });
};

module.exports = {
  view_profile,
  view_home,
  view_matkul,
  daftarMatkul,
  prosesDaftar,
  uploadFile,
  notifikasi,
  hasRead,
  authBeam,
  download,
  informasi,
  searchMatkul, 
};