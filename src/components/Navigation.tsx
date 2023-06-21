import { Link } from "react-router-dom";
import styled from "./Navigation.module.css";
import { BsFillBasket3Fill, BsSearch } from "react-icons/bs";
import { atom, useRecoilState } from "recoil";
import { useEffect, useRef, useState } from "react";
import SearchInput from "./SearchInput";
import { totalQuantityState } from "../store/cartStat";

// 테마 스테이트
const themeState = atom({
  key: "themeState",
  default: localStorage.getItem("theme") || "light",
});

const Navigation = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [totalQuantity, setTotalQuantity] = useRecoilState(totalQuantityState);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  //감색 창의 리스트가 나타나 있을 때 다른 곳 클릭하면 리스트 숨기기
  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (!searchInputRef.current || !searchInputRef.current.contains(event.target)) {
        setShowSearchInput(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchInputRef]);

  //badge의 개수 표시를 위해 cart안에 담겨있는 총 합 업데이트 및 계산
  useEffect(() => {
    const storedValue = localStorage.getItem("cart");
    if (storedValue !== null) {
      const cart = JSON.parse(storedValue);
      const newTotalQuantity = cart.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0);
      setTotalQuantity(newTotalQuantity);
    }
  }, [setTotalQuantity]);

  // localStorage에서 테마 가져와 테마 업데이트
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [setTheme]);

  // 테마 업데이트
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // 테마 버튼 클릭시
  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`${styled.navigation} navbar bg-base-300 mx-auto `}>
      <div className={styled.navbarWrap}>
        <div className="navbar-start flex pt-4">
          <div className={`dropdown pb-2`}>
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className={`${styled.hamburger} menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52`}
            >
              <li>
                <Link to="/fashion" className={styled.category}>
                  패션
                </Link>
              </li>
              <li>
                <Link to="/accessories" className={styled.category}>
                  액세서리
                </Link>
              </li>
              <li>
                <Link to="/digital" className={styled.category}>
                  디지털
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/" className={styled.logoContainer}>
            <div className={styled.logoTitle}>ES Shop</div>
          </Link>
        </div>
        <div className={`${styled.categoryContainer} navbar-center hidden md:flex`}>
          <ul className={`menu menu-horizontal px-1 hidden lg:flex`}>
            <li className="mr-3">
              <Link to="/fashion" className={styled.category}>
                패션
              </Link>
            </li>
            <li className="mr-3">
              <Link to="/accessories" className={styled.category}>
                액세서리
              </Link>
            </li>
            <li className="mr-3">
              <Link to="/digital" className={styled.category}>
                디지털
              </Link>
            </li>
          </ul>
        </div>
        <div className={styled.rightContainer}>
          <label className={`swap swap-rotate mr-5`}>
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" role="button" onClick={handleThemeToggle} aria-label="테마 변경 버튼" />
            {/* sun icon */}
            <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            {/* moon icon */}
            <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
          <div className="join mr-10 relative">
            <div className="hidden md:block">
              <SearchInput ref={searchInputRef} />
            </div>
            <div className={`${styled.searchIcon} md:hidden`} onClick={() => setShowSearchInput(!showSearchInput)}>
              <BsSearch />
            </div>
            <div className={styled.input}>
              {showSearchInput && (
                <div className="block md:hidden">
                  <SearchInput ref={searchInputRef} />
                </div>
              )}
            </div>
          </div>

          <Link to="/cart" className={styled.cart}>
            <div className={styled.badge}>{totalQuantity}</div>
            <BsFillBasket3Fill />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
