import { useState, useEffect } from "react";
import axios from "axios";
import { ImageUpload } from "./ImageUpload";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/menu");
      setProducts(data);
    } catch (err) {
      console.error("Menü ürünleri yüklenirken hata oldu:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/categories");
      setCategories(data);
    } catch (err) {
      console.error("Kategoriler yüklenirken hata oldu:", err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product); // Düzenlenecek ürünün bilgilerini formData'ya set et
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu ürünü silmek istiyor musunuz?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/menu/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Ürün silinirken hata oldu:", err);
    }
  };

  const handleImageSelect = (url) => {
    setFormData((f) => ({ ...f, imageUrl: url }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = { ...formData };
      if (editingProduct) {
        await axios.put(
          `http://localhost:5000/api/menu/${editingProduct._id}`,
          submitData
        );
      } else {
        await axios.post("http://localhost:5000/api/menu", submitData);
      }
      fetchProducts();
      setEditingProduct(null);
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
      });
    } catch (err) {
      console.error("Ürün kaydedilirken hata oldu:", err);
    }
  };
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-4">Ürün Yönetimi</h2>

      {/* Ürün Formu */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-white p-4 rounded-lg shadow"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ürün Adı */}
          <div>
            <label className="block mb-2 text-sm font-medium">Ürün Adı</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Fiyat */}
          <div>
            <label className="block mb-2 text-sm font-medium">Fiyat</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block mb-2 text-sm font-medium">Kategori</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Görsel */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Ürün Görseli
            </label>
            <ImageUpload
              onImageSelect={handleImageSelect}
              currentImageUrl={formData.imageUrl || ""}
            />
          </div>

          {/* Açıklama */}
          <div className="col-span-1 md:col-span-2">
            <label className="block mb-2 text-sm font-medium">Açıklama</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          {editingProduct ? "Güncelle" : "Ekle"}
        </button>
      </form>

      {/* Ürün Listesi */}
      <div className="bg-white rounded-lg shadow max-h-[500px] overflow-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="sticky top-0 bg-gray-50 z-10">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Görsel
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Ürün Adı
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Fiyat
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Açıklama
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <img
                    loading="lazy"
                    src={`http://localhost:5000${product.imageUrl}`}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">{product.price} TL</td>
                <td className="px-4 py-3">{product.description}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:text-red-700"
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

export default AdminProducts;
