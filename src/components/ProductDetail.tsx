import { useRecoilValueLoadable, useRecoilState } from "recoil";
import { totalQuantityState } from "../store/cartStat";
import { Link, useParams } from "react-router-dom";
import { fetchProductById } from "../store/products";
import styled from "./ProductDetail.module.css";

function ProductDetail() {
  const { id } = useParams();
  const [totalQuantity, setTotalQuantity] = useRecoilState(totalQuantityState);
  const productLoadable = useRecoilValueLoadable(fetchProductById(Number(id)));

  if (productLoadable.state === "loading") {
    return <div>Loading...</div>;
  }

  if (productLoadable.state === "hasError") {
    return <div>상품 정보를 가져오는 중에 문제가 발생했습니다. 다시 시도해주세요.</div>;
  }

  const product = productLoadable.contents;
  const checkedIndex = Math.round(product.rating.rate * 2);

  // 카트에 담을 함수
  const handleAddToCart = () => {
    const cartString = localStorage.getItem("cart");
    const cart = cartString ? JSON.parse(cartString) : [];
    const productIndex = cart.findIndex((item: { id: number }) => item.id === product.id);

    if (productIndex > -1) {
      cart[productIndex].quantity += 1;
    } else {
      cart.push({ id: product.id, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setTotalQuantity(totalQuantity + 1);
  };

  return (
    <>
      <div className={styled.wrap}>
        <div className={`${styled.breadcrumbs} text-sm breadcrumbs`}>
          <ul>
            <li>
              <a>{product.category}</a>
            </li>
            <li>{product.title}</li>
          </ul>
        </div>
        <div className={`${styled.cardContainer} card lg:card-side bg-base-100 shadow-xl mt-80`}>
          <figure className="w-full relative">
            <div className={styled.imgContainer}>
              <img src={product.image} alt="Album" className="object-contain h-96 w-full" />
            </div>
          </figure>
          <div className="card-body mb-15">
            <h2 className={`${styled.title} card-title`}>{product.title}</h2>
            <div className={`${styled.cardDes} text-sm h-auto!`}>{product.description}</div>
            <div className={`${styled.rating} rating rating-md rating-half`}>
              <input type="radio" name="rating-10" className="rating-hidden" />
              <input
                type="radio"
                name="rating-10"
                className="bg-orange-400 mask mask-star-2 mask-half-1"
                defaultChecked={checkedIndex === 1}
              />
              <input
                type="radio"
                name="rating-10"
                className="bg-orange-400 mask mask-star-2 mask-half-2"
                defaultChecked={checkedIndex === 2}
              />
              <input
                type="radio"
                name="rating-10"
                className="bg-orange-400 mask mask-star-2 mask-half-1"
                defaultChecked={checkedIndex === 3}
              />
              <input
                type="radio"
                name="rating-10"
                className="bg-orange-400 mask mask-star-2 mask-half-2"
                defaultChecked={checkedIndex === 4}
              />
              <input
                type="radio"
                name="rating-10"
                className="bg-orange-400 mask mask-star-2 mask-half-1"
                defaultChecked={checkedIndex === 5}
              />
              <input
                type="radio"
                name="rating-10"
                className="bg-orange-400 mask mask-star-2 mask-half-2"
                defaultChecked={checkedIndex === 6}
              />
              <input
                type="radio"
                name="rating-10"
                className="bg-orange-400 mask mask-star-2 mask-half-1"
                defaultChecked={checkedIndex === 7}
              />
              <input
                type="radio"
                name="rating-10"
                className="bg-orange-400 mask mask-star-2 mask-half-2"
                defaultChecked={checkedIndex === 8}
              />
              <input
                type="radio"
                name="rating-10"
                className="bg-orange-400 mask mask-star-2 mask-half-1"
                defaultChecked={checkedIndex === 9}
              />
              <input
                type="radio"
                name="rating-10"
                className="bg-orange-400 mask mask-star-2 mask-half-2 mr-2"
                defaultChecked={checkedIndex === 10}
              />
              <div className={`${styled.ratingNumber} pt-2`}>
                {product.rating.rate} / {product.rating.count} 참여
              </div>
            </div>

            <div className="card-actions justify-start">
              <button className="btn btn-active btn-neutral" onClick={handleAddToCart}>
                장바구니에 담기
              </button>{" "}
              <Link to="/cart">
                <button className="btn btn-active">장바구니로 이동</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
