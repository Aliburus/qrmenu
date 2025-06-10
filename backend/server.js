const express = require("express");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const menuRouter = require("./routes/menuRoutes");
const adminRouter = require("./routes/adminRoutes");
const cors = require("cors");
const compression = require("compression");

const app = express();

connectDB();

app.use(compression());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Dosya adı: zaman damgası + orijinal uzantı
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    maxAge: "1d",
    etag: true,
  })
);

app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Dosya bulunamadı" });
  }
  // Tam URL oluştur
  const fullUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({
    message: "Dosya başarıyla yüklendi",
    url: fullUrl,
  });
});

app.use("/api/menu", menuRouter);
app.use("/api/admin", adminRouter);

app.use("/api", (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`,
      req.body
    );
  }
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
