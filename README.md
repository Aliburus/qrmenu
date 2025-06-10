# QR Menü Sistemi

Restoranlar için QR kod tabanlı dijital menü sistemi. Müşteriler QR kodu okutarak menüye erişebilir, admin panelinden menü yönetimi yapılabilir.

## Özellikler

- 📱 QR kod ile menü erişimi
- 🍽️ Kategorilere göre ürün listeleme
- 📸 Ürün fotoğrafları
- 👨‍💼 Admin paneli
- 🔐 Güvenli admin girişi
- 📊 Ürün yönetimi
- 🎨 Modern ve responsive tasarım

## Teknolojiler

### Frontend

- React.js
- Tailwind CSS
- React Router
- Context API

### Backend

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer (Dosya yükleme)

## Kurulum

1. Repoyu klonlayın:

```bash
git clone https://github.com/kullaniciadi/qr-menu.git
cd qr-menu
```

2. Backend bağımlılıklarını yükleyin:

```bash
cd backend
npm install
```

3. Frontend bağımlılıklarını yükleyin:

```bash
cd ../frontend
npm install
```

4. Backend için .env dosyası oluşturun:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/qrmenu
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

5. Frontend için .env dosyası oluşturun:

```env
REACT_APP_API_URL=http://localhost:5000
```

## Çalıştırma

1. Backend'i başlatın:

```bash
cd backend
npm start
```

2. Frontend'i başlatın:

```bash
cd frontend
npm start
```

3. Tarayıcıda açın:

- Frontend: http://localhost:3000
- Admin Panel: http://localhost:3000/admin/login

## Admin Paneli

Admin paneline giriş yapmak için:

1. http://localhost:3000/admin/login adresine gidin
2. Varsayılan kullanıcı bilgileri:
   - Email: admin@qrmenu.com
   - Şifre: 123456

## QR Kod Oluşturma

1. Admin paneline giriş yapın
2. Sol menüden "QR Kodlar" seçeneğine tıklayın
3. İstediğiniz URL'yi girin
4. "QR Kod Oluştur" butonuna tıklayın
5. Oluşturulan QR kodu indirin

## Güvenlik

- JWT tabanlı kimlik doğrulama
- Şifreli admin girişi
- Güvenli dosya yükleme
- CORS koruması

## Lisans

MIT

## İletişim

- Email: ornek@email.com
- Website: https://example.com
