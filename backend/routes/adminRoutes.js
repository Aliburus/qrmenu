const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  getAllAdmins,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Protected routes
router.get("/profile", protect, getAdminProfile);
router.get("/users", protect, getAllAdmins);

module.exports = router;
