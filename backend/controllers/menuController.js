const Menu = require("../models/menuModel");

const getMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find({});
    if (!menuItems.length) {
      return res.status(404).json({ message: "Menü bulunamadı" });
    }
    res.status(200).json(menuItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

const addMenuItem = async (req, res) => {
  console.log("🔥 POST /api/menu — req.body:", req.body);
  const { name, description, price, category, imageUrl } = req.body;

  try {
    const newMenuItem = new Menu({
      name,
      description,
      price,
      category,
      imageUrl,
    });
    await newMenuItem.save();
    res.status(201).json(newMenuItem);
    console.log("Menu item added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getCategoryMenuItems = async (req, res) => {
  const { category } = req.params;
  console.log("Kategori Parametresi:", category);
  try {
    // Case-insensitive arama
    const menuItems = await Menu.find({
      category: new RegExp(`^${category}$`, "i"),
    });
    console.log("Menü Öğeleri:", menuItems);

    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({ message: "Menu items not found" });
    }
    res.status(200).json(menuItems);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
const deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await Menu.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Ürün bulunamadı" });
    }
    res.status(200).json({ message: "Ürün başarıyla silindi" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server hatası" });
  }
};
const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, imageUrl } = req.body;

  try {
    const updatedItem = await Menu.findByIdAndUpdate(
      id,
      { name, description, price, category, imageUrl },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Ürün bulunamadı" });
    }
    res.status(200).json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

module.exports = {
  getMenuItems,
  addMenuItem,
  getCategoryMenuItems,
  deleteMenuItem,
  updateMenuItem,
};
