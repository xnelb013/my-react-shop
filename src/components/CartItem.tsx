import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { fetchProductById } from "../store/products";
import styled from "./CartItem.module.css";
import { useState } from "react";
import { SkeletonCart } from "./Skeleton";
import { Link } from "react-router-dom";
import { totalQuantityState } from "../store/cartStat";

type CartItemType = {
  id: number;
  quantity: number;
};

type CartItemProps = {
  id: number;
  initialQuantity: number;
  setCart: (cart: CartItemType[]) => void;
};

function CartItem({ id, initialQuantity, setCart }: CartItemProps) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const productLoadable = useRecoilValueLoadable(fetchProductById(id));
  const setTotalQuantity = useSetRecoilState(totalQuantityState);

  if (productLoadable.state === "loading") {
    return <SkeletonCart />;
  }

  if (productLoadable.state === "hasError") {
    return <li>Error</li>;
  }

  const product = productLoadable.contents;

  const updateCart = (newQuantity: number) => {
    const cartString = localStorage.getItem("cart");
    const cart = cartString ? JSON.parse(cartString) : [];
    const itemIndex = cart.findIndex((item: { id: number }) => item.id === id);
    if (itemIndex !== -1) {
      if (newQuantity > 0) {
        cart[itemIndex].quantity = newQuantity;
        setQuantity(newQuantity);
      } else {
        cart.splice(itemIndex, 1);
        setQuantity(0);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      setCart(cart);
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + newQuantity - quantity);
    }
  };

  // 버튼 이벤트
  function handleDecrease() {
    if (quantity === 1) {
      return;
    }
    updateCart(quantity - 1);
  }

  function handleIncrease() {
    updateCart(quantity + 1);
  }

  function handleRemove() {
    updateCart(0);
  }

  return (
    <div className="mx-auto max-w-6xl justify-center px-6 md:flex md:space-x-6 xl:px-0 w-1000">
      <div className={`rounded-lg md:w-2/3`}>
        <div
          className={`${styled.card} justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start`}
        >
          <Link to={`/product/${product.id}`}>
            <img src={product.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
          </Link>
          <div className="sm:ml-10 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <Link to={`/product/${product.id}`}>
                <h2 className="text-lg font-bold">{product.title}</h2>
              </Link>

              <p className="mt-5 text-md ">${product.price}</p>
            </div>
            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center border-gray-100 ml-10">
                <span
                  className={`${styled.span} cursor-pointer rounded-l py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50`}
                  onClick={handleDecrease}
                >
                  -
                </span>
                <div className="p-2">{quantity}</div>
                <span
                  className={`${styled.span} cursor-pointer rounded-r py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50`}
                  onClick={handleIncrease}
                >
                  +
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-md w-200">${(product.price * quantity).toFixed(2)}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                  onClick={handleRemove}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
