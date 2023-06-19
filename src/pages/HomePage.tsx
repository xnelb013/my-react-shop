import Carousel from "../components/Carousel";
import ProductsList from "../components/ProductList";

const HomePage = () => {
  return (
    <>
      <Carousel />
      <div className="mainContainer">
        <ProductsList category="men's clothing" totalNumber={4} />
        <ProductsList category="women's clothing" totalNumber={4} />
        <ProductsList category="jewelery" totalNumber={4} />
        <ProductsList category="electronics" totalNumber={4} />
      </div>
    </>
  );
};

export default HomePage;
