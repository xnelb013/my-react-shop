import { Link } from "react-router-dom";
import { Suspense, lazy } from "react";

const ProductsList = lazy(() => import("../components/ProductList"));

const AccessoriesPage = () => {
  return (
    <>
      <div className="mainContainer">
        <div className={`mt-20 p-10 ml-10 text-sm breadcrumbs overflow-x-hidden`}>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Accessories</li>
          </ul>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductsList category="jewelery" />
        </Suspense>
      </div>
    </>
  );
};

export default AccessoriesPage;
