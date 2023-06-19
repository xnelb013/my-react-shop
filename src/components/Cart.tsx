import { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { useRecoilValueLoadable } from "recoil";
import { fetchProductsByCategory } from "../store/products";
import styled from "./Cart.module.css";
import Modal from "./Modal";

type CartItemType = {
  readonly id: number;
  readonly quantity: number;
};

function Cart() {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const productsLoadable = useRecoilValueLoadable(fetchProductsByCategory({ category: "all" }));
  const products = productsLoadable.contents;

  useEffect(() => {
    const cartString = localStorage.getItem("cart");
    const cart = cartString ? JSON.parse(cartString) : [];
    setCart(cart);
  }, []);

  if (productsLoadable.state === "loading") {
    return <div>Loading...</div>;
  }

  if (productsLoadable.state === "hasError") {
    return <div>Error</div>;
  }

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => {
      const product = products.find((product: { id: number }) => product.id === item.id);
      if (product) {
        return acc + product.price * item.quantity;
      }
      return acc;
    }, 0);
  };

  const subtotal = calculateSubtotal();

  const handlePurchase = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <div className={`${styled.fullContainer} flex justify-center`}>
      <div className={`flex`}>
        //장바구니 상품 여부확인
        {cart.length === 0 ? (
          <p className="mt-60 mb-20 w-3/4">장바구니에 담은 상품이 없습니다.</p>
        ) : (
          <>
            <ul className="mt-60 mb-20 w-2/3">
              {cart.map((item) => (
                <CartItem key={item.id} id={item.id} initialQuantity={item.quantity} setCart={setCart} />
              ))}
            </ul>
            <div className={`${styled.container} h-60 rounded-lg border bg-white p-6 shadow-md md:mt-60 md:w-2/3`}>
              <div className="mb-2 flex justify-between">
                <p className="">Subtotal</p>
                <p className="">${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="">Shipping</p>
                <p className="">$4.99</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className="">
                  <p className="mb-1 text-lg font-bold">${(subtotal + 4.99).toFixed(2)} USD</p>
                  <p className="text-sm">including VAT</p>
                </div>
              </div>
              <Modal subtotal={subtotal} handlePurchase={handlePurchase} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
