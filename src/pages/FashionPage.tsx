import { Link } from "react-router-dom";
import ProductsList from "../components/ProductList";

const FashionPage = () => {
  return (
    <>
      <div className={`mt-20 p-10 ml-10 text-sm breadcrumbs overflow-x-hidden`}>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>Fashion</li>
        </ul>
      </div>
      <div className="mainContainer">
        <ProductsList category="men's clothing" />
        <ProductsList category="women's clothing" />
      </div>
    </>
  );
};

export default FashionPage;
