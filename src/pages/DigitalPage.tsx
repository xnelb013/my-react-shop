import { Link } from "react-router-dom";
import ProductsList from "../components/ProductList";

// 카테고리-디지털 페이지
const DigitalPage = () => {
  return (
    <>
      <div className="mainContainer">
        <div className={`mt-20 p-10 ml-10 text-sm breadcrumbs overflow-x-hidden`}>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>Electorics</li>
          </ul>
        </div>
        <ProductsList category="electronics" />
      </div>
    </>
  );
};

export default DigitalPage;
