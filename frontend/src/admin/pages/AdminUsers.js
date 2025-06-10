import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { admin } = useAuth();
  const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/api/admin/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Kullanıcı eklenemedi");
      }

      setSuccess("Kullanıcı başarıyla eklendi");
      setNewUser({ username: "", email: "", password: "" });
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Kullanıcılar getirilemedi");
      }

      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Kullanıcıları</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Yeni Admin Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kullanıcı Adı
              </label>
              <input
                type="text"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Şifre
              </label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Admin Ekle
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Mevcut Adminler</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kullanıcı Adı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
