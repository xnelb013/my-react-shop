import { useEffect, useState, Suspense } from "react";
import CartItem from "./CartItem";
import { useRecoilValue } from "recoil";
import { fetchProductsByCategory } from "../store/products";
import styled from "./Cart.module.css";
import Modal from "./Modal";
import { SkeletonCart } from "./Skeleton";

type CartItemType = {
  readonly id: number;
  readonly quantity: number;
};

function Cart() {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const products = useRecoilValue(fetchProductsByCategory({ category: "all" }));

  useEffect(() => {
    const getCart = async () => {
      const cartString = await localStorage.getItem("cart");
      const cart = cartString ? JSON.parse(cartString) : [];
      setCart(cart);
    };
    getCart();
  }, []);

  const calculateSubtotal = () => {
    const productsMap = products.reduce((acc: { [key: number]: number }, product: { id: number; price: number }) => {
      acc[product.id] = product.price;
      return acc;
    }, {});
    return cart.reduce((acc, item) => {
      return acc + (productsMap[item.id] || 0) * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();

  const handlePurchase = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <div className={`${styled.fullContainer} flex justify-center`}>
      <div className={`${styled.cardContainer} flex`}>
        {cart.length === 0 ? (
          <p className="mt-60 mb-20 w-3/4">장바구니에 담은 상품이 없습니다.</p>
        ) : (
          <>
            <ul className="mt-20 mb-20 w-2/3">
              <Suspense
                fallback={
                  <>
                    {Array.from({ length: cart.length }, () => (
                      <SkeletonCart />
                    ))}
                  </>
                }
              >
                {cart.map((item) => (
                  <CartItem key={item.id} id={item.id} initialQuantity={item.quantity} setCart={setCart} />
                ))}
              </Suspense>
            </ul>
            <div
              className={`${styled.container} h-60 rounded-lg border w-2/3 bg-white p-6 shadow-md md:w-2/3 sm:w-2/3 md:ml-40 lg:ml-10`}
            >
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
