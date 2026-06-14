const router = require("express").Router();

const auth = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getAllUsers,
  changeRole,
} = require("../controllers/userController");

router.get(
  "/",
  auth,
  authorize("ADMIN"),
  getAllUsers
);

router.patch(
  "/:id/role",
  auth,
  authorize("ADMIN"),
  changeRole
);

module.exports = router;