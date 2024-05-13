const express = require("express");
const adminControllers = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/admin-middleware");
const router = express.Router();
router
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminControllers.getAllUsers);
// -------get user data and update user data---------------
router
  .route("/users/:id")
  .get(authMiddleware, adminMiddleware, adminControllers.getUserById);
router
  .route("/users/update/:id")
  .patch(authMiddleware, adminMiddleware, adminControllers.updateUserById);
router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminControllers.deleteUserById);
router
  .route("/contacts")
  .get(authMiddleware, adminMiddleware, adminControllers.getAllContacts);
router
  .route("/contacts/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminControllers.deleteContactById);
module.exports = router;