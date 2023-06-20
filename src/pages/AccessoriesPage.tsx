import { Link } from "react-router-dom";
import ProductsList from "../components/ProductList";

const AccessoriesPage = () => {
  return (
    <>
      <div className={`mt-20 p-10 ml-10 text-sm breadcrumbs overflow-x-hidden`}>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>Accessories</li>
        </ul>
      </div>
      <div className="mainContainer">
        <ProductsList category="jewelery" />
      </div>
    </>
  );
};

export default AccessoriesPage;
