const {
  User,
  Lecturer,
  Subject,
  Registration,
  Student,
  Schedule,
} = require("../models/index");
const { Op } = require("sequelize");

const { body, validationResult } = require("express-validator");

const view_profile = async (req, res) => {
  const user = await User.findByPk(req.userId);
  res.render("admin/profile", { user, page: "Profile" });
};

const dashboard = async (req, res) => {
  const user = await User.findByPk(req.userId);
  res.render("admin/dashboard", { user, page: "Dashboard" });
};

const matkul = async (req, res) => {
  const user = await User.findByPk(req.userId);
  const matkul = await Subject.findAll({ include: Lecturer });

  for (const m of matkul) {
    const jumlahPendaftar = await Registration.count({
      where: { subjectId: m.id },
    });
    m.dataValues.jumlahPendaftar = jumlahPendaftar;
  }

  res.render("admin/matkul", {
    user,
    page: "Mata Kuliah",
    matkul,
    success: req.cookies.success,
    error: req.cookies.error,
  });
};

const tambahMatkul = async (req, res) => {
  console.log(req.userId);
  const user = await User.findByPk(req.userId);
  const lecturers = await Lecturer.findAll();
  res.render("admin/tambahmatkul", {
    lecturers,
    page: "Tambah Mata Kuliah",
    user,
    error: req.cookies.error,
    maxsks: req.cookies.maxsks,
  });
};

const storeMatkul = [
  body("id")
    .notEmpty()
    .withMessage("Kode Mata Kuliah harus diisi")
    .bail()
    .custom(async (value) => {
      const existingSubject = await Subject.findOne({ where: { id: value } });
      if (existingSubject) {
        return Promise.reject("Kode Mata Kuliah sudah digunakan");
      }
    }),
  body("name")
    .notEmpty()
    .withMessage("Nama Mata Kuliah harus diisi")
    .bail()
    .custom(async (value) => {
      const existingSubject = await Subject.findOne({ where: { name: value } });
      if (existingSubject) {
        return Promise.reject("Mata Kuliah sudah ada");
      }
    }),
  body("credit")
    .notEmpty()
    .withMessage("SKS harus diisi")
    .bail()
    .isInt({ min: 2 })
    .withMessage("Kredit harus berupa angka, minimal 2"),
  body("semester")
    .notEmpty()
    .withMessage("Semester harus diisi")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Semester harus berupa angka, minimal 1"),
  body("lecturerId").notEmpty().withMessage("Dosen harus dipilih"),
  body("capacity")
    .notEmpty()
    .withMessage("Kapasitas harus diisi")
    .bail()
    .isInt({ min: 10 })
    .withMessage("Kapasitas minimal 10"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = errors.array();
      res.cookie("error", error, { maxAge: 1000, httpOnly: true });
      return res.redirect("/admin/tambah-matkul");
    }
    const { id, name, credit, semester, lecturerId, capacity } = req.body;

    const subjects = await Subject.findAll({
      where: {
        lecturerNip: lecturerId,
      },
    });
    
    let maxSKS = 0;
    for (const subject of subjects) {
      maxSKS += subject.credit;
    }

    if (maxSKS + credit > 6) {
      res.cookie("maxsks", "Total SKS yang diambil dosen ini melebihi batas maksimal 6 SKS", { maxAge: 1000, httpOnly: true });
      return res.redirect("/admin/tambah-matkul");
    }


    try {
      await Subject.create({
        id,
        name,
        credit,
        semester,
        lecturerNip: lecturerId,
        capacity,
      });
      let success = "Mata Kuliah Berhasil Ditambahkan";
      res.cookie("success", success, { maxAge: 1000, httpOnly: true });
      res.redirect("/admin/mata-kuliah");
    } catch (error) {
      console.error(error);
      res.status(500).send("Terjadi kesalahan saat menyimpan data");
    }
  },
];

const editMatkul = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(req.userId);
  const subject = await Subject.findByPk(id, { include: Lecturer });
  const lecturers = await Lecturer.findAll();
  res.render("admin/editmatkul", {
    subject,
    lecturers,
    page: "Edit Mata Kuliah",
    user,
    error: req.cookies.error,
    maxsks: req.cookies.maxsks,
  });
};

const updateMatkul = [
  body("name")
    .notEmpty()
    .withMessage("Nama Mata Kuliah harus diisi")
    .bail()
    .custom(async (value, { req }) => {
      const subjectId = req.params.id;
      const existingSubject = await Subject.findOne({ where: { name: value } });
      if (existingSubject && existingSubject.id !== subjectId) {
        return Promise.reject("Mata Kuliah sudah ada");
      }
    }),
  body("credit")
    .notEmpty()
    .withMessage("SKS harus diisi")
    .bail()
    .isInt({ min: 2 })
    .withMessage("SKS harus berupa angka"),
  body("semester")
    .notEmpty()
    .withMessage("Semester harus diisi")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Semester harus berupa angka"),
  body("lecturerId").notEmpty().withMessage("Dosen harus dipilih"),
  body("capacity")
    .notEmpty()
    .withMessage("Kapasitas harus diisi")
    .bail()
    .isInt({ min: 10 })
    .withMessage("Kapasitas minimal 10"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error = errors.array();
      res.cookie("error", error, { maxAge: 1000, httpOnly: true });
      return res.redirect(`/admin/edit-matkul/${req.params.id}`);
    }

    const { name, credit, semester, lecturerId, capacity } = req.body;
    const subjects = await Subject.findAll({
      where: {
        lecturerNip: lecturerId,
      },
    });
    
    let maxSKS = 0;
    for (const subject of subjects) {
      maxSKS += subject.credit;
    }

    if (maxSKS + credit > 6) {
      res.cookie("maxsks", "Total SKS yang diambil dosen ini melebihi batas maksimal 6 SKS", { maxAge: 1000, httpOnly: true });
      return res.redirect("/admin/tambah-matkul");
    }


    try {
      const subject = await Subject.findByPk(req.params.id);
      subject.name = name;
      subject.credit = credit;
      subject.semester = semester;
      subject.lecturerNip = lecturerId;
      subject.capacity = capacity;
      await subject.save();
      let success = "Mata Kuliah Berhasil Di Perbaharui";
      res.cookie("success", success, { maxAge: 1000, httpOnly: true });
      res.redirect("/admin/mata-kuliah");
    } catch (error) {
      console.error(error);
      res.status(500).send("Terjadi kesalahan saat memperbarui data");
    }
  },
];

const deleteMatkul = async (req, res) => {
  const { id } = req.params;

  const subject = await Subject.findByPk(id);
  await subject.destroy();
  let success = "Mata Kuliah Berhasil Di Hapus";
  res.cookie("success", success, { maxAge: 1000, httpOnly: true });
  res.redirect("/admin/mata-kuliah");
};

const tutupMatkul = async (req, res) => {
  const { id } = req.params;
  const subject = await Subject.findByPk(id);
  const jumlahPendaftar = await Registration.count({
    where: { subjectId: id },
  });

  if (jumlahPendaftar < 10) {
    res.cookie("error", "Mata Kuliah tidak dapat ditutup karena pendaftarnya kurang dari 10", { maxAge: 1000, httpOnly: true });
    return res.redirect("/admin/mata-kuliah");
  }

  subject.update({
    status: "active",
  });
  let success = "Mata Kuliah Berhasil Di Tutup";
  res.cookie("success", success, { maxAge: 1000, httpOnly: true });
  res.redirect("/admin/mata-kuliah");
};
const matkulaktif = async (req, res) => {
  const user = await User.findByPk(req.userId);
  const matkul = await Subject.findAll({
    where: {
      status: "active",
    },
    include: Lecturer,
  });
  res.render("admin/matkulaktif", {
    user,
    page: "Mata Kuliah Aktif",
    matkul,
  });
};

const pendaftar = async (req, res) => {
  const user = await User.findByPk(req.userId);
  let mhs = await Registration.findAll({
    include: [Subject, Student],
  });

  res.render("admin/Pendaftar", {
    user,
    page: "Pendaftar",
    mhs,
    success: req.cookies.success,
  });
};

const tolakPendaftar = async (req, res) => {
  const { studentNim, subjectId } = req.params;
  const mhs = await Registration.findOne({
    where: {
      studentNim: studentNim,
      subjectId: subjectId,
    },
  });
  await mhs.destroy();

  res.cookie("success", "Pendaftar Berhasil di tolak", {
    maxAge: 1000,
    httpOnly: true,
  });
  res.redirect("/admin/pendaftar");
};

const jadwal = async (req, res) => {
  const { id } = req.params;
  const jadwal = await Schedule.findAll({
    where: {
      subjectId: id,
    },
  });
  console.log(id);
  const matkul = await Subject.findByPk(id);
  const user = await User.findByPk(req.userId);
  res.render("admin/jadwal", {
    user,
    page: `Jadwal Kuliah ${matkul.name}`,
    matkul,
    jadwal,
    success: req.cookies.success,
  });
};
const tambahJadwal = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(req.userId);
  const matkul = await Subject.findByPk(id);
  console.log(req.cookies.error);
  res.render("admin/tambahjadwal", {
    user,
    page: `Tambah Jadwal Kuliah ${matkul.name}`,
    matkul,
    error: req.cookies.error,
    konflik: req.cookies.konflik,
  });
};

const storeJadwal = [
  body("day").notEmpty().withMessage("Hari harus dipilih"),
  body("timeStart").notEmpty().withMessage("Waktu mulai harus diisi"),
  body("timeEnd")
    .notEmpty()
    .withMessage("Waktu selesai harus diisi")
    .bail()
    .custom((value, { req }) => {
      if (req.body.timeStart >= value) {
        throw new Error("Waktu selesai harus setelah waktu mulai");
      }
      return true;
    })
    .bail()
    .custom(async (value, { req }) => {
      const { id } = req.params;
      console.log(id);
      const matkul = await Subject.findByPk(id);

      // Hitung durasi jadwal berdasarkan jumlah SKS
      const duration = matkul.credit * 50; // 1 SKS = 50 menit
      console.log(matkul);

      // Hitung selisih waktu mulai dan waktu selesai dalam menit
      const startTime =
        parseInt(req.body.timeStart.split(":")[0]) * 60 +
        parseInt(req.body.timeStart.split(":")[1]);
      const endTime =
        parseInt(value.split(":")[0]) * 60 + parseInt(value.split(":")[1]);
      const timeDiff = endTime - startTime;

      // Periksa apakah durasi jadwal sesuai dengan jumlah SKS
      if (timeDiff !== duration) {
        throw new Error("Durasi jadwal tidak sesuai dengan jumlah SKS");
      }
      return true;
    }),
  body("building").notEmpty().withMessage("Nama gedung harus diisi"),
  body("room").notEmpty().withMessage("Nama ruangan harus diisi"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.cookie("error", errors.array(), { maxAge: 1000, httpOnly: true });
      return res.redirect(
        `/admin/mata-kuliah-aktif/jadwal/tambah-jadwal/${req.params.id}`
      );
    }

    const { id } = req.params;
    const { day, timeStart, timeEnd, building, room } = req.body;

    try {
      const matkul = await Subject.findByPk(id);
      const lecturerNip = matkul.lecturerNip;

      const conflictingLecturerSchedule = await Schedule.findOne({
        where: {
          id: { [Op.ne]: id },
          day,
          [Op.or]: [
            {
              timeStart: { [Op.lt]: timeEnd },
              timeEnd: { [Op.gt]: timeStart },
            },
            {
              timeStart: { [Op.gte]: timeStart },
              timeEnd: { [Op.lte]: timeEnd },
            },
          ],
          "$Subject.lecturerNip$": lecturerNip,
        },
        include: [{ model: Subject, attributes: [] }],
      });

      if (conflictingLecturerSchedule) {
        res.cookie(
          "konflik",
          "Dosen sudah memiliki jadwal yang bertabrakan pada hari dan jam yang sama.",
          { maxAge: 1000, httpOnly: true }
        );
        return res.redirect(
          `/admin/mata-kuliah-aktif/jadwal/tambah-jadwal/${id}`
        );
      }

      const conflictingRoomSchedule = await Schedule.findOne({
        where: {
          id: { [Op.ne]: id },
          day,
          building,
          room,
          [Op.or]: [
            {
              timeStart: { [Op.lt]: timeEnd },
              timeEnd: { [Op.gt]: timeStart },
            },
            {
              timeStart: { [Op.gte]: timeStart },
              timeStart: { [Op.lte]: timeEnd },
            },
            {
              timeEnd: { [Op.gte]: timeStart },
              timeEnd: { [Op.lte]: timeEnd },
            },
          ],
        },
      });

      if (conflictingRoomSchedule) {
        res.cookie(
          "konflik",
          "Ruangan sudah digunakan pada hari dan jam yang sama.",
          { maxAge: 1000, httpOnly: true }
        );
        return res.redirect(
          `/admin/mata-kuliah-aktif/jadwal/tambah-jadwal/${id}`
        );
      }

      await Schedule.create({
        subjectId: id,
        day,
        timeStart,
        timeEnd,
        building,
        room,
      });

      res.cookie("success", "Jadwal Berhasil Ditambahkan", {
        maxAge: 1000,
        httpOnly: true,
      });
      res.redirect(`/admin/mata-kuliah-aktif/jadwal/${id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Terjadi kesalahan saat menyimpan data");
    }
  },
];

const deleteJadwal = async (req, res) => {
  const { id } = req.params;

  try {
    const jadwal = await Schedule.findByPk(id);
    if (!jadwal) {
      let error = "Jadwal tidak ditemukan";
      res.cookie("error", error, { maxAge: 1000, httpOnly: true });
      return res.redirect("/admin/mata-kuliah-aktif");
    }

    await jadwal.destroy();
    let success = "Jadwal berhasil dihapus";
    res.cookie("success", success, { maxAge: 1000, httpOnly: true });
    res.redirect(`/admin/mata-kuliah-aktif/jadwal/${jadwal.subjectId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan saat menghapus jadwal");
  }
};
const editJadwal = async (req, res) => {
  const { subjectId, id } = req.params;
  try {
    // Mengambil jadwal berdasarkan id
    const jadwal = await Schedule.findByPk(id);
    if (!jadwal) {
      res.cookie("error", "Jadwal tidak ditemukan", {
        maxAge: 1000,
        httpOnly: true,
      });
      return res.redirect("/admin/mata-kuliah-aktif");
    }

    // Mengambil mata kuliah berdasarkan subjectId
    const matkul = await Subject.findByPk(subjectId);
    if (!matkul) {
      res.cookie("error", "Mata Kuliah tidak ditemukan", {
        maxAge: 1000,
        httpOnly: true,
      });
      return res.redirect("/admin/mata-kuliah-aktif");
    }

    // Mengambil user
    const user = await User.findByPk(req.userId);

    res.render("admin/editjadwal", {
      user,
      page: `Edit Jadwal Kuliah ${matkul.name}`,
      matkul,
      jadwal,
      konflik: req.cookies.konflik,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan saat mengambil data jadwal");
  }
};

const updateJadwal = [
  body("day").notEmpty().withMessage("Hari harus dipilih"),
  body("timeStart").notEmpty().withMessage("Waktu mulai harus diisi"),
  body("timeEnd")
    .notEmpty()
    .withMessage("Waktu selesai harus diisi")
    .bail()
    .custom((value, { req }) => {
      if (req.body.timeStart >= value) {
        throw new Error("Waktu selesai harus setelah waktu mulai");
      }
      return true;
    })
    .bail()
    .custom(async (value, { req }) => {
      const { id } = req.params;
      console.log(id);
      const matkul = await Subject.findByPk(id);

      const duration = matkul.credit * 50; 

      const startTime =
        parseInt(req.body.timeStart.split(":")[0]) * 60 +
        parseInt(req.body.timeStart.split(":")[1]);
      const endTime =
        parseInt(value.split(":")[0]) * 60 + parseInt(value.split(":")[1]);
      const timeDiff = endTime - startTime;

      if (timeDiff !== duration) {
        throw new Error("Durasi jadwal tidak sesuai dengan jumlah SKS");
      }
      return true;
    }),
  body("building").notEmpty().withMessage("Nama gedung harus diisi"),
  body("room").notEmpty().withMessage("Nama ruangan harus diisi"),
  async (req, res) => {
    const { subjectId, id } = req.params;
    const { day, timeStart, timeEnd, building, room } = req.body;

    try {
      const jadwal = await Schedule.findOne({
        where: { id, subjectId },
      });

      if (!jadwal) {
        return res.status(404).send("Jadwal tidak ditemukan");
      }

      const conflictingSchedule = await Schedule.findOne({
        where: {
          id: { [Op.ne]: id },
          subjectId,
          day,
          timeStart: { [Op.lt]: timeEnd },
          timeEnd: { [Op.gt]: timeStart },
        },
      });

      if (conflictingSchedule) {
        return res.render("editJadwal", {
          page: "Edit Jadwal Kuliah",
          konflik:
            "Dosen sudah memiliki jadwal yang bertabrakan pada hari dan jam yang sama.",
          jadwal: {
            id,
            subjectId,
            day,
            timeStart,
            timeEnd,
            building,
            room,
          },
        });
      }

      const conflictingRoomSchedule = await Schedule.findOne({
        where: {
          id: { [Op.ne]: id }, 
          day,
          building,
          room,
          timeStart: { [Op.lt]: timeEnd },
          timeEnd: { [Op.gt]: timeStart },
        },
      });

      if (conflictingRoomSchedule) {
        return res.render("editJadwal", {
          page: "Edit Jadwal Kuliah",
          konflik: "Ruangan sudah digunakan pada hari dan jam yang sama.",
          jadwal: {
            id,
            subjectId,
            day,
            timeStart,
            timeEnd,
            building,
            room,
          },
        });
      }

      jadwal.day = day;
      jadwal.timeStart = timeStart;
      jadwal.timeEnd = timeEnd;
      jadwal.building = building;
      jadwal.room = room;

      await jadwal.save();
      let success = "Jadwal Kuliah Berhasil Di Perbaharui";
      res.cookie("success", success, { maxAge: 1000, httpOnly: true });
      res.redirect(`/admin/mata-kuliah-aktif/jadwal/${subjectId}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("Terjadi kesalahan saat memperbarui jadwal");
    }
  },
];

module.exports = {
  view_profile,
  dashboard,
  matkul,
  tambahMatkul,
  storeMatkul,
  updateMatkul,
  editMatkul,
  deleteMatkul,
  matkulaktif,
  tutupMatkul,
  pendaftar,
  tolakPendaftar,
  jadwal,
  tambahJadwal,
  storeJadwal,
  deleteJadwal,
  editJadwal,
  updateJadwal,
};
