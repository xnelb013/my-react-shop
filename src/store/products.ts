import { selectorFamily } from "recoil";

const FAKE_STORE_API = "https://fakestoreapi.com";

interface Rating {
  readonly rate: number;
  readonly count: number;
}

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
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 20000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(url, { ...options, signal: controller.signal });
  clearTimeout(id);

  return response;
};

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

export const fetchProductById = selectorFamily<Product, number>({
  key: "product",
  get: (id) => async () => {
    const response = await fetchWithTimeout(`${FAKE_STORE_API}/products/${id}`);
    const json = await response.json();
    return json;
  },
});
