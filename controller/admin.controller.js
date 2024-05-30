const { User, Lecturer, Subject } = require("../models/index");
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
  res.render("admin/matkul", {
    user,
    page: "Mata Kuliah",
    matkul,
    success: req.cookies.success,
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
    .isInt()
    .withMessage("Kredit harus berupa angka"),
  body("semester")
    .notEmpty()
    .withMessage("Semester harus diisi")
    .bail()
    .isInt()
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
      return res.redirect("/admin/tambah-matkul");
    }
    const { id, name, credit, semester, lecturerId, capacity } = req.body;

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
  });
};

const updateMatkul = [
  body("id")
    .notEmpty()
    .withMessage("Kode Mata Kuliah harus diisi")
    .bail()
    .custom(async (value, { req }) => {
      const subjectId = req.params.id;
      const existingSubject = await Subject.findOne({ where: { id: value } });
      if (existingSubject && existingSubject.id !== subjectId) {
        return Promise.reject("Kode Mata Kuliah sudah digunakan");
      }
    }),
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
    .withMessage("Kredit harus diisi")
    .bail()
    .isInt()
    .withMessage("Kredit harus berupa angka"),
  body("semester")
    .notEmpty()
    .withMessage("Semester harus diisi")
    .bail()
    .isInt()
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

    const { id } = req.params;
    const { name, credit, semester, lecturerId, capacity } = req.body;

    try {
      const subject = await Subject.findByPk(id);
      subject.id = id;
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
  console.log(id);
  try {
    const subject = await Subject.findByPk(id);
    await subject.destroy();
    let success = "Mata Kuliah Berhasil Di Hapus";
    res.cookie("success", success, { maxAge: 1000, httpOnly: true });
    res.redirect("/admin/mata-kuliah");
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan saat menghapus data");
  }
};

module.exports = {
  view_profile,
  dashboard,
  matkul,
  tambahMatkul,
  storeMatkul,
  updateMatkul,
  editMatkul,
  deleteMatkul,
};
