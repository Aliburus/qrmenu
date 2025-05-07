import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const AdminLayout = lazy(() => import("./admin/pages/AdminLayout"));
const AdminProducts = lazy(() => import("./admin/pages/AdminProducts"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="text-center p-8 text-white">Yükleniyor...</div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<CategoryPage />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="products" element={<AdminProducts />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
