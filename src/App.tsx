import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
const Navigation = lazy(() => import("./components/Navigation"));
const Footer = lazy(() => import("./components/Footer"));
const NotFoundPage = lazy(() => import("./components/NotFoundPage"));
const ProductDetail = lazy(() => import("./components/ProductDetail"));
const HomePage = lazy(() => import("./pages/HomePage"));
const FashionPage = lazy(() => import("./pages/FashionPage"));
const AccessoriesPage = lazy(() => import("./pages/AccessoriesPage"));
const DigitalPage = lazy(() => import("./pages/ElectronecsPage"));
const CartPage = lazy(() => import("./pages/CartPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div></div>}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
