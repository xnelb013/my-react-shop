export const Category = {
  "men's clothing": "남성 패션",
  "women's clothing": "여성 패션",
  electronics: "디지털",
  jewelery: "액세서리",
} as const;

type CategoryEngType = {
  [key: string]: string;
};

//breadcrumbs의 Link를 위한 영어판 카테고리
export const CategoryEng: CategoryEngType = {
  "men's clothing": "fashion",
  "women's clothing": "fashion",
  electronics: "digital",
  jewelery: "accessories",
} as const;

export type categoryType = (typeof Category)[keyof typeof Category];
