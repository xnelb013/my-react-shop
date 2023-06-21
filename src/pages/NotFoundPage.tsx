import { Link } from "react-router-dom";
import styled from "./NotFoundPage.module.css";

// 없는 페이지 시 나올 페이지
const NotFoundPage = () => {
  return (
    <div className={styled.notFoundPageContainer}>
      <div className={styled.text404}>404</div>
      <div className={styled.text}>페이지를 찾을 수 없습니다.</div>
      <Link to="/" className="btn mt-10">
        메인으로
      </Link>
    </div>
  );
};

export default NotFoundPage;
