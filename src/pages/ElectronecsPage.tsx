import { Link } from "react-router-dom";
import ProductsList from "../components/ProductList";

const DigitalPage = () => {
  return (
    <>
      <div className={`mt-20 p-10 ml-10 text-sm breadcrumbs overflow-x-hidden`}>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>Electorics</li>
        </ul>
      </div>
      <div className="mainContainer">
        <ProductsList category="electronics" />
      </div>
    </>
  );
};

export default DigitalPage;
