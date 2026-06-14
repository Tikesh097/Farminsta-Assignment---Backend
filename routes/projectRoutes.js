const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

router.get(
  "/",
  auth,
  getProjects
);

router.post(
  "/",
  auth,
  authorize("MANAGER", "ADMIN"),
  createProject
);

router.put(
  "/:id",
  auth,
  authorize("MANAGER", "ADMIN"),
  updateProject
);

router.delete(
  "/:id",
  auth,
  authorize("ADMIN"),
  deleteProject
);

module.exports = router;