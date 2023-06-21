import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import Layout from "./Layout";
import ScrollToTop from "./components/ScrollToTop";
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
      <ScrollToTop />
      <Suspense fallback={<div></div>}>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/fashion" element={<FashionPage />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route path="/digital" element={<DigitalPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
