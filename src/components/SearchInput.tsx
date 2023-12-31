import { useState, useEffect } from "react";
import { useRecoilValueLoadable } from "recoil";
import { useNavigate } from "react-router-dom";
import { fetchProductsByCategory } from "../store/products";
import styled from "./SearchInput.module.css";
import React from "react";

// 상품 검색 컴포넌트
const SearchInput = React.forwardRef<HTMLInputElement>((props, ref) => {
  const [searchText, setSearchText] = useState("");
  const productsLoadable = useRecoilValueLoadable(fetchProductsByCategory({ category: "all" }));
  const products = productsLoadable.state === "hasValue" ? productsLoadable.contents : [];
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // 소문자 변환
  const filteredProducts = products.filter((product) => product.title.toLowerCase().includes(searchText.toLowerCase()));

  // 클릭시 해당 상품 상세페이지로 이동
  const handleProductClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  // 키보드로 리스트 움직이기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, filteredProducts.length - 1));
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, -1));
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        handleProductClick(filteredProducts[selectedIndex].id);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [filteredProducts, selectedIndex]);

  return (
    <div className={styled.container} ref={ref} {...props}>
      <input
        type="search"
        className="input input-bordered join-item lg:w-50"
        placeholder="Search..."
        onChange={(e) => setSearchText(e.target.value)}
      />
      {searchText && (
        <ul
          className={`${styled.itemList} !fixed left-0 sm:!absolute sm:top-12 menu dropdown-content w-full sm:w-64 max-h-96 shadow text-base-content overflow-y-auto bg-white dark:bg-gray-600`}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <li
                key={product.id}
                className={`${styled.item} menu-item ${index === selectedIndex ? styled.selected : ""}`}
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
});

export default SearchInput;
