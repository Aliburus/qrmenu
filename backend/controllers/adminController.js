const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

// JWT token oluşturma
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Admin kayıt
const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Register isteği alındı:", { username, email });

    // Email kontrolü
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Bu email zaten kayıtlı" });
    }

    // Yeni admin oluştur
    const admin = await Admin.create({
      username,
      email,
      password,
    });

    if (admin) {
      res.status(201).json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      });
    }
  } catch (error) {
    console.error("Admin kayıt hatası:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

// Admin girişi
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login isteği alındı:", { email });

    // Admin kontrolü
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Admin bulunamadı:", email);
      return res.status(401).json({ message: "Geçersiz email veya şifre" });
    }

    // Şifre kontrolü
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      console.log("Şifre eşleşmedi:", email);
      return res.status(401).json({ message: "Geçersiz email veya şifre" });
    }

    console.log("Giriş başarılı:", email);
    res.json({
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } catch (error) {
    console.error("Admin giriş hatası:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

// Admin bilgilerini getir
const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-password");
    if (!admin) {
      return res.status(404).json({ message: "Admin bulunamadı" });
    }
    res.json(admin);
  } catch (error) {
    console.error("Admin profil hatası:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

// Tüm adminleri getir
const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.json(admins);
  } catch (error) {
    console.error("Admin listesi hatası:", error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  getAllAdmins,
};
