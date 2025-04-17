import { useState, useEffect } from "react";
import axios from "axios";
import { ImageUpload } from "./ImageUpload";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    backgroundImage: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Kategoriler yüklenirken hata oluştu:", error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData(category);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu kategoriyi silmek istediğinizden emin misiniz?")) {
      try {
        await axios.delete(`/api/categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error("Kategori silinirken hata oluştu:", error);
      }
    }
  };

  const handleImageSelect = (url) => {
    setFormData((f) => ({ ...f, backgroundImage: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = { ...formData };

      if (editingCategory) {
        await axios.put(`/api/categories/${editingCategory._id}`, submitData);
      } else {
        await axios.post("/api/categories", submitData);
      }

      fetchCategories();
      setEditingCategory(null);
      setFormData({
        name: "",
        backgroundImage: "",
      });
    } catch (error) {
      console.error("Kategori kaydedilirken hata oluştu:", error);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4">Kategori Yönetimi</h2>

      {/* Kategori Formu */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white p-4 rounded-lg shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Kategori Adı
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Kategori Görseli
            </label>
            <ImageUpload
              onImageSelect={handleImageSelect}
              currentImageUrl={formData.backgroundImage}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          {editingCategory ? "Güncelle" : "Ekle"}
        </button>
      </form>

      {/* Kategori Listesi */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Görsel
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kategori Adı
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category._id}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <img
                    src={category.backgroundImage}
                    alt={category.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3">{category.name}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCategories;
