const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB bağlantısı başarılı");
  } catch (err) {
    console.log("❌ MongoDB bağlantısı başarısız", err);
    process.exit(1); // Bağlantı hatasında uygulamayı sonlandır
  }
};

module.exports = connectDB;
