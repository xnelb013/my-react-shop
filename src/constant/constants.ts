export const Category = {
  "men's clothing": "남성 패션",
  "women's clothing": "여성 패션",
  electronics: "디지털",
  jewelery: "액세서리",
} as const;

export type categoryType = (typeof Category)[keyof typeof Category];
