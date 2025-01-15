const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Routes pour les étudiants
router.get("/", studentController.getStudents);
router.get("/:id", studentController.getStudent);
router.post("/", studentController.createStudent);
router.post("/many", studentController.createStudents);
router.put("/:id", studentController.updateStudent);
router.put("/many", studentController.updateStudents);
router.delete("/:id", studentController.deleteStudent);
router.delete("/many", studentController.deleteStudents);

module.exports = router;
