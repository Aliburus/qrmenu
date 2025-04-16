// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Parametre ismini :category olarak değiştiriyoruz */}
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
