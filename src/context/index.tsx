"use client";
import { StaticImageData } from "next/image";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type Item = {
  id?: number;
  coverImg?: StaticImageData;
  fullImg?: StaticImageData;
  name?: string;
  desc?: string;
  about?: string;
  price?: number;
  status?: string;
  category?: string;
  color?: string;
  quantity?: number;
};

interface ContextProps {
  cart: Item[];
  setCart: Dispatch<SetStateAction<object[]>>;
  getCartArr(): void,
  setCartToSessionStorage(cartItems: object[]): void
}

const CartContext = createContext<ContextProps>({
    cart: [],
    setCart: () => null,
    getCartArr: function (): void {
        // throw new Error("Function not implemented.");
    },
    setCartToSessionStorage: function (): void {
        // throw new Error("Function not implemented.");
    }
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Item[]>([]);
//   console.log(cart);

  function getCartArr() {
    const cartItems = sessionStorage.getItem("cartItems");
    if (!cartItems) {
      console.log("Cart Array is empty");
      return;
    } else {
      const exisCartArr: Item[] = JSON.parse(cartItems);
      setCart(exisCartArr);
      console.log("existing cart array gotten and set to cartArr");
    }
  }

  function setCartToSessionStorage (cartItems: object[]){
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  useEffect(()=>{
    getCartArr();
  }, [])

  return (
    <CartContext.Provider value={{ cart, setCart, getCartArr, setCartToSessionStorage }}>
      {children}
    </CartContext.Provider>
  );
}

export function useAppContext() {
  return useContext(CartContext);
}
