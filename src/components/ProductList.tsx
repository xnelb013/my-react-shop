import { useRecoilValueLoadable } from "recoil";
import { Link } from "react-router-dom";
import styled from "./ProductList.module.css";
import { Product, fetchProductsByCategory } from "../store/products";
import { Skeleton } from "./Skeleton";
import { Category, categoryType } from "../constant/constants";

interface ProductsListProps {
  readonly category: keyof typeof Category;
  readonly totalNumber?: number;
}

const getCategoryTitle = (category: keyof typeof Category): categoryType => {
  return Category[category];
};

const ProductsList = ({ category, totalNumber }: ProductsListProps) => {
  const productsLoadable = useRecoilValueLoadable<Product[]>(fetchProductsByCategory({ category, limit: totalNumber }));

  if (productsLoadable.state === "loading") {
    return (
      <>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className={`${styled.categoryTitle}  text-2xl font-bold tracking-tight text-gray-900`}>
            {getCategoryTitle(category as keyof typeof Category)}
          </div>
          <div className={styled.listContainer}>
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} />
              ))}
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
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className={`${styled.categoryTitle} text-2xl font-bold tracking-tight`}>
          {getCategoryTitle(category as keyof typeof Category)}
        </div>
        <div className="mt-6 overflow-x-auto lg:overflow-visible">
          <div className="flex gap-x-6 gap-y-10 lg:grid lg:grid-cols-4 lg:gap-x-8">
            {products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div key={product.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-52 w-52 object-contain object-center mw-full mh-full"
                    />
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
      </div>
    </>
  );
};

export default ProductsList;
