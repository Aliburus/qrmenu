import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login denemesi başladı");
    try {
      console.log("API isteği gönderiliyor:", `${baseUrl}/api/admin/login`);
      const response = await fetch(`${baseUrl}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      console.log("API yanıtı alındı:", response.status);
      const data = await response.json();
      console.log("API yanıt verisi:", data);

      if (!response.ok) {
        throw new Error(data.message || "Giriş başarısız");
      }

      // Token'ı localStorage'a kaydet
      localStorage.setItem("adminToken", data.token);
      const adminInfo = {
        id: data._id,
        username: data.username,
        email: data.email,
        role: data.role,
      };
      localStorage.setItem("adminInfo", JSON.stringify(adminInfo));

      // AuthContext'e admin bilgilerini kaydet
      login(adminInfo);

      console.log("Giriş başarılı, yönlendiriliyor...");
      // Admin paneline yönlendir
      navigate("/admin/products", { replace: true });
    } catch (err) {
      console.error("Login hatası:", err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-8">Admin Girişi</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Şifre
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
