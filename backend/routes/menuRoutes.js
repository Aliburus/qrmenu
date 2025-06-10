const express = require("express");
const router = express.Router();
const {
  getMenuItems,
  addMenuItem,
  getCategoryMenuItems,
  deleteMenuItem,
  updateMenuItem,
} = require("../controllers/menuController");

// Menu rotaları
router.get("/", getMenuItems);
router.post("/", addMenuItem);
router.get("/category/:category", getCategoryMenuItems);
router.delete("/:id", deleteMenuItem);
router.put("/:id", updateMenuItem);

module.exports = router;
