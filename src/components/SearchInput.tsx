import { useState } from "react";
import { useRecoilValueLoadable } from "recoil";
import { useNavigate } from "react-router-dom";
import { fetchProductsByCategory } from "../store/products";
import styled from "./SearchInput.module.css";

function SearchInput() {
  const [searchText, setSearchText] = useState("");
  const productsLoadable = useRecoilValueLoadable(fetchProductsByCategory({ category: "all" }));
  const products = productsLoadable.state === "hasValue" ? productsLoadable.contents : [];
  const navigate = useNavigate();

  const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchText.toLowerCase()));

  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className={styled.container}>
      <input
        type="search"
        className="input input-bordered join-item"
        placeholder="Search..."
        onChange={(e) => setSearchText(e.target.value)}
      />
      {searchText && (
        <ul
          className={`${styled.itemList} !fixed left-0 sm:!absolute sm:top-12 menu dropdown-content w-full sm:w-64 max-h-96 shadow text-base-content overflow-y-auto bg-white dark:bg-gray-600`}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li
                key={product.id}
                className={`${styled.item} menu-item`}
                onClick={() => handleProductClick(product.id)}
              >
                {product.title}
              </li>
            ))
          ) : (
            <li className={`${styled.item} menu-item`}>검색하신 상품이 없습니다.</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchInput;
