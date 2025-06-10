const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Token'ı al
      token = req.headers.authorization.split(" ")[1];

      // Token'ı doğrula
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Admin'i bul ve şifreyi çıkar
      req.admin = await Admin.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error("Token doğrulama hatası:", error);
      res.status(401).json({ message: "Yetkisiz erişim" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Token bulunamadı" });
  }
};

module.exports = { protect };
