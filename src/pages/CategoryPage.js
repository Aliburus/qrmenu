import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function CategoryPage() {
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    if (!category) return;

    const cachedItems = sessionStorage.getItem(`category-${category}`);
    if (cachedItems) {
      setItems(JSON.parse(cachedItems));
      const decoded = decodeURIComponent(category);
      const pretty = decoded
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      setCategoryName(pretty);
      return;
    }

    const fetchCategoryItems = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/category/${encodeURIComponent(category)}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItems(data);

        sessionStorage.setItem(`category-${category}`, JSON.stringify(data));

        const decoded = decodeURIComponent(category);
        const pretty = decoded
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        setCategoryName(pretty);
      } catch (error) {
        console.error("Error fetching category items:", error);
      }
    };

    fetchCategoryItems();
  }, [category]);

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="text-amber-400 hover:text-amber-300 text-lg font-serif"
          >
            ← Ana Menü
          </Link>
        </div>
        <div className="flex text-center justify-center items-center mb-8">
          <h1 className="text-4xl font-serif text-white">{categoryName}</h1>
        </div>
        <div className="grid grid-cols-1 gap-12">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-black bg-opacity-50 rounded-xl overflow-hidden"
            >
              <div className="flex flex-col md:flex-row ">
                <div className="md:w-1/2">
                  <img
                    loading="lazy"
                    src={`http://localhost:5000${item.imageUrl}`}
                    alt={item.name}
                    className="w-full h-full object-cover object-center max-h-[170px]"
                  />
                </div>
                <div className="md:w-1/2 p-4 flex flex-col justify-center">
                  <h2 className="text-auto font-serif text-white mb-2">
                    {item.name}
                  </h2>
                  <p className="text-gray-400 mb-2 text-lg italic">
                    {item.description}
                  </p>
                  <span className="text-auto text-amber-400 font-light">
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
