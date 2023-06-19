import { useRecoilValueLoadable } from "recoil";
import { Link } from "react-router-dom";
import styled from "./ProductList.module.css";
import { Product, fetchProductsByCategory } from "../store/products";
import { Skeleton } from "./Skeleton";

interface ProductsListProps {
  readonly category: string;
  readonly totalNumber?: number;
}

const getCategoryTitle = (category: string) => {
  switch (category) {
    case "men's clothing":
      return "남성 패션";
    case "women's clothing":
      return "여성 패션";
    case "jewelery":
      return "쥬얼리";
    default:
      return "디지털";
  }
};

const ProductsList = ({ category, totalNumber }: ProductsListProps) => {
  const productsLoadable = useRecoilValueLoadable<Product[]>(fetchProductsByCategory({ category, limit: totalNumber }));

  if (productsLoadable.state === "loading") {
    return (
      <>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className={`${styled.categoryTitle}  text-2xl font-bold tracking-tight text-gray-900`}>
            {category === "men's clothing"
              ? "남성 패션"
              : category === "women's clothing"
              ? "여성 패션"
              : category === "jewelery"
              ? "액세서리"
              : "디지털"}
          </div>
          <div className={styled.listContainer}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </>
    );
  }

  if (productsLoadable.state === "hasError") {
    return <div>상품 정보를 가져오는 중에 문제가 발생했습니다. 다시 시도해주세요.</div>;
  }

  const products = productsLoadable.contents;

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className={`${styled.categoryTitle} text-2xl font-bold tracking-tight`}>{getCategoryTitle(category)}</div>
        <div className={`mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8`}>
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 flex items-center justify-center">
                  <img src={product.image} alt={product.title} className="h-52 w-52 object-contain object-center" />
                </div>
                <div className="mt-4 flex justify-between">
                  <div className={styled.productTitle}>
                    <h3 className={`${styled.productTitle} text-base pr-10 font-medium`}>
                      <span aria-hidden="true" className={`absolute inset-0`} />
                      {product.title}
                    </h3>
                  </div>
                  <p className={`${styled.price} text-base font-medium font-semibold`}>${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsList;
