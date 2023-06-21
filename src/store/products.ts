import { selectorFamily } from "recoil";

// API
const FAKE_STORE_API = "https://fakestoreapi.com";

// 별점 인터페이스
interface Rating {
  readonly rate: number;
  readonly count: number;
}

// 상품 인터페이스
export interface Product {
  readonly id: number;
  readonly title: string;
  readonly price: number;
  readonly description: string;
  readonly category: string;
  readonly image: string;
  readonly rating: Rating;
  readonly count: number;
}

//fetch를 이용하여 데이터를 받아옴. 20초가 지나면 요청을 취소
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 20000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(url, { ...options, signal: controller.signal });
  clearTimeout(id);

  return response;
};

// 카테고리 비교 fetch
export const fetchProductsByCategory = selectorFamily<Product[], { category: string; limit?: number }>({
  key: "productsList",
  get:
    ({ category, limit }) =>
    async () => {
      if (category === "all") {
        const response = await fetchWithTimeout(`${FAKE_STORE_API}/products`);
        const json = await response.json();
        return limit ? json.slice(0, limit) : json;
      } else {
        const response = await fetchWithTimeout(`${FAKE_STORE_API}/products/category/${encodeURIComponent(category)}`);
        const json = await response.json();
        return limit ? json.slice(0, limit) : json;
      }
    },
});

// 아이디 비교 fetch
export const fetchProductById = selectorFamily<Product, number>({
  key: "product",
  get: (id) => async () => {
    const response = await fetchWithTimeout(`${FAKE_STORE_API}/products/${id}`);
    const json = await response.json();
    return json;
  },
});
