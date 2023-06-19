import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import NotFoundPage from "./components/NotFoundPage";
import ProductDetail from "./components/ProductDetail";
import HomePage from "./pages/HomePage";
import FashionPage from "./pages/FashionPage";
import AccessoriesPage from "./pages/AccessoriesPage";
import DigitalPage from "./pages/ElectronecsPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* 다른 경로 */}
        <Route path="/fashion" element={<FashionPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/digital" element={<DigitalPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
