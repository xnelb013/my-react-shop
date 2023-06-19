import { createContext } from "react";

export const CartContext = createContext({
  totalQuantity: 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTotalQuantity: (value: number) => {},
});
