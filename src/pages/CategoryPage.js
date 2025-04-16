import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function CategoryPage() {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (!category) return;

    const fetchCategoryItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/category/${category}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItems(data);
        // İlk harfi büyük yaparak kategori adını oluşturuyoruz.
        setCategoryName(category.charAt(0).toUpperCase() + category.slice(1));
      } catch (error) {
        console.error("Error fetching category items:", error);
      }
    };

    fetchCategoryItems();
  }, [category]);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-16">
          <Link
            to="/"
            className="text-amber-400 hover:text-amber-300 text-lg font-serif"
          >
            ← Ana Menü
          </Link>
          <h1 className="text-4xl font-serif text-white">{categoryName}</h1>
          <div className="w-20"></div>
        </div>
        <div className="grid grid-cols-1 gap-12">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-black bg-opacity-50 rounded-xl overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-72 md:h-96 object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <h2 className="text-3xl font-serif text-white mb-4">
                    {item.name}
                  </h2>
                  <p className="text-gray-400 mb-6 text-lg italic">
                    {item.description}
                  </p>
                  <span className="text-2xl text-amber-400 font-light">
                    ${item.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
