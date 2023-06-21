import { atom } from "recoil";

// 전역으로 장바구니의 총 합 계산
export const totalQuantityState = atom({
  key: "totalQuantityState",
  default: 0,
});
