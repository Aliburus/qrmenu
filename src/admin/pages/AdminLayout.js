import { Link, Outlet } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <Link
            to="/admin/products"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <ShoppingBagIcon className="w-5 h-5 mr-2" />
            Ürünler
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
