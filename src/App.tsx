import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import ProductsList from "./components/ProductList";
import NotFoundPage from "./components/NotFoundPage";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import { CartContext } from "./components/CartContext";

function App() {
  const [totalQuantity, setTotalQuantity] = useState(0);

  return (
    <CartContext.Provider value={{ totalQuantity, setTotalQuantity }}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Carousel />
                <div className="testContainer">
                  <ProductsList category="men's clothing" totalNumber={4} />
                  <ProductsList category="women's clothing" totalNumber={4} />
                  <ProductsList category="jewelery" totalNumber={4} />
                  <ProductsList category="electronics" totalNumber={4} />
                </div>
              </>
            }
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* 다른 경로 */}
          <Route
            path="/fashion"
            element={
              <>
                <div className="testContainer">
                  <ProductsList category="men's clothing" />
                  <ProductsList category="women's clothing" />
                </div>
              </>
            }
          />
          <Route
            path="/accessories"
            element={
              <>
                <div className="testContainer">
                  <ProductsList category="jewelery" />
                </div>
              </>
            }
          />
          <Route
            path="/digital"
            element={
              <>
                <div className="testContainer">
                  <ProductsList category="electronics" />
                </div>
              </>
            }
          />
          <Route
            path="/cart"
            element={
              <>
                <Cart />
              </>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartContext.Provider>
  );
}

export default App;
