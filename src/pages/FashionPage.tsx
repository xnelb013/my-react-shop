import { Link } from "react-router-dom";
import ProductsList from "../components/ProductList";

// 카테고리-패션 페이지
const FashionPage = () => {
  return (
    <>
      <div className="mainContainer">
        <div className={`mt-20 p-10 ml-10 text-sm breadcrumbs overflow-x-hidden`}>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Fashion</li>
          </ul>
        </div>
        <ProductsList category="men's clothing" />
        <ProductsList category="women's clothing" />
      </div>
    </>
  );
};

export default FashionPage;
