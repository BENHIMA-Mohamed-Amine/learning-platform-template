// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Séparer les routes dans différents fichiers permet de mieux organiser le code, de le rendre plus lisible et plus facile à maintenir. Cela permet également de séparer les préoccupations, en regroupant les routes liées à une fonctionnalité spécifique dans un fichier distinct.
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: Pour organiser les routes de manière cohérente, il est recommandé de regrouper les routes par fonctionnalité ou par ressource. Par exemple, toutes les routes liées aux cours peuvent être placées dans un fichier `courseRoutes.js`, tandis que les routes liées aux utilisateurs peuvent être placées dans un fichier `sudentRoutes.js`. Il est également utile de suivre une convention de nommage cohérente et de documenter les routes pour faciliter la compréhension et la maintenance du code.

const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Routes pour les cours
router.get("/", courseController.getCourses);
router.get("/:id", courseController.getCourse);
router.get("/stats", courseController.getCourseByStats);
router.post("/", courseController.createCourse);
router.post("/many", courseController.createCourses);
router.put("/:id", courseController.updateCourse);
router.put("/many", courseController.updateCourses);
router.delete("/:id", courseController.deleteCourse);
router.delete("/many", courseController.deleteCourses);

module.exports = router;
