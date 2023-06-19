import { useState, useEffect } from "react";
import styled from "./Carousel.module.css";
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const images = ["/img/img1.jpeg", "/img/img2.jpeg", "/img/img3.jpeg"];

const Carousel = () => {
  const [translateValue, setTranslateValue] = useState(0);

  // 이전 버튼
  const onClickPrevBtn = () => {
    if (translateValue === 0) {
      setTranslateValue(-100 * (images.length - 1));
    } else {
      setTranslateValue(translateValue + 100);
    }
  };

  // 다음 버튼
  const onClickNextBtn = () => {
    if (translateValue === -100 * (images.length - 1)) {
      setTranslateValue(0);
    } else {
      setTranslateValue(translateValue - 100);
    }
  };

  // 6초마다 캐러셀 이동
  useEffect(() => {
    const interval = setInterval(() => {
      if (translateValue === -100 * (images.length - 1)) {
        setTranslateValue(0);
      } else {
        setTranslateValue(translateValue - 100);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [translateValue]);

  return (
    <div className={styled.CarouselContainer}>
      <div className={styled.CarouselImages} style={{ transform: `translateX(${translateValue / images.length}%)` }}>
        {images.map((image, index) => (
          <div key={index} className={styled.CarouselImageContainer}>
            <img key={index} src={image} alt="" className={styled.CarouselImage} />
            {index === 0 && (
              // 캐러셀의 오버레이
              <div className={styled.overlay}>
                <h1>물빠진 청바지!</h1>
                <p>이제 막 도착한 패션 청바지를 구경해 보세요.</p>
                <Link to={"/fashion"}>
                  <button>
                    <h2>바로가기</h2> <BsArrowRightCircleFill />
                  </button>
                </Link>
              </div>
            )}
            {index === 1 && (
              <div className={styled.overlay}>
                <h1>신속한 업무처리!</h1>
                <p>다양한 디지털 상품을 둘러보세요.</p>
                <Link to={"/digital"}>
                  <button>
                    <h2>바로가기</h2> <BsArrowRightCircleFill />
                  </button>
                </Link>
              </div>
            )}
            {index === 2 && (
              <div className={styled.overlay}>
                <h1>신선한 식품!</h1>
                <p>농장 직배송으로 더욱 신선한 식료품을 만나보세요.</p>
                <button>
                  <h2>바로가기</h2> <BsArrowRightCircleFill />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={onClickPrevBtn} className={styled.prevBtn}>
        <AiFillCaretLeft />
      </button>
      <button onClick={onClickNextBtn} className={styled.nextBtn}>
        <AiFillCaretRight />
      </button>
      <div className={styled.dotContainer}>
        <div
          className={`${styled.dot} ${translateValue === 0 ? styled.active : ""}`}
          onClick={() => setTranslateValue(0)}
        ></div>
        <div
          className={`${styled.dot} ${translateValue === -100 ? styled.active : ""}`}
          onClick={() => setTranslateValue(-100)}
        ></div>
        <div
          className={`${styled.dot} ${translateValue === -200 ? styled.active : ""}`}
          onClick={() => setTranslateValue(-200)}
        ></div>
      </div>
    </div>
  );
};

export default Carousel;
