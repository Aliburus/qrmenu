import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const AdminLayout = lazy(() => import("./admin/pages/AdminLayout"));
const AdminProducts = lazy(() => import("./admin/pages/AdminProducts"));
const AdminUsers = lazy(() => import("./admin/pages/AdminUsers"));
const AdminQR = lazy(() => import("./admin/pages/AdminQR"));
const AdminLogin = lazy(() => import("./admin/pages/AdminLogin"));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense
          fallback={
            <div className="text-center p-8 text-white">Yükleniyor...</div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="products" element={<AdminProducts />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="qr" element={<AdminQR />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
