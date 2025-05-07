import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const cachedData = sessionStorage.getItem("categories");
    if (cachedData) {
      setCategories(JSON.parse(cachedData));
    }

    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/menu");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const distinctCategories = [
          ...new Set(data.map((item) => item.category)),
        ];

        const categoryObjects = distinctCategories.map((cat, index) => ({
          name: cat,
          imageUrl: `http://localhost:5000/uploads/${index + 1}.jpg`,
          description: cat,
        }));

        setCategories(categoryObjects);
        sessionStorage.setItem("categories", JSON.stringify(categoryObjects));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-white mb-4 font-serif">
            URBAN CAFE
          </h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-4 bg-gradient-to-r from-amber-400 to-amber-600"></div>
          <p className="text-gray-400 text-xl italic">Coffee & Good Food</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/category/${encodeURIComponent(category.name)}`}
              className="group relative block"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-xl">
                <img
                  loading="lazy"
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h2 className="text-3xl font-serif text-white mb-2">
                    {category.name}
                  </h2>
                  <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
