import ProductsList from "../components/ProductList";

const FashionPage = () => {
  return (
    <>
      <div className="testContainer">
        <ProductsList category="men's clothing" />
        <ProductsList category="women's clothing" />
      </div>
    </>
  );
};

export default FashionPage;
