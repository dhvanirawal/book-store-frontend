/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

export interface ICartCountContext {
  totalCartItems: number;
  setTotalCartItems: (data: number) => void;
}

const CartCountContext = createContext<ICartCountContext>({
  totalCartItems: 0,
  setTotalCartItems: () => {},
});

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export default function CartCountContextProvider({
  children,
}: AuthContextProviderProps) {
  const [totalCartItems, setTotalCartItems] = useState(0);

  const cartTotalDataStates = useMemo(
    () => ({
      totalCartItems,
      setTotalCartItems,
    }),
    [totalCartItems]
  );
  return (
    <CartCountContext.Provider value={cartTotalDataStates}>
      {children}
    </CartCountContext.Provider>
  );
}

export function useCartCountContext() {
  const context = useContext(CartCountContext);
  if (!context) {
    throw new Error(
      "useCartCountContext must be used within an CartCountContextProvider"
    );
  }

  return context;
}
