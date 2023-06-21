import { Link } from "react-router-dom";
import Cart from "../components/Cart";

const CartPage = () => {
  return (
    <>
      <div className="mainContainer">
        <div className={`mt-20 p-10 ml-10 text-sm breadcrumbs overflow-x-hidden`}>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Cart</li>
          </ul>
        </div>
        <Cart />
      </div>
    </>
  );
};

export default CartPage;
