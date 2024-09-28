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
  orders: Item[];
  setOrders: Dispatch<SetStateAction<object[]>>;
  getOrderArr(): void,
  setOrderToSessionStorage(cartItems: object[]): void
}

const CartContext = createContext<ContextProps>({
    cart: [],
    setCart: () => null,
    getCartArr: function (): void {},
    setCartToSessionStorage: function (): void {},
    orders: [],
    setOrders: () => null,
    getOrderArr: function (): void {},
    setOrderToSessionStorage: function (): void {}
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Item[]>([]);
  const [orders, setOrders] = useState<Item[]>([]);
//   console.log(cart);

  function getCartArr() {
    const cartItems = sessionStorage.getItem("cartItems");
    if (!cartItems) {
      // console.log("Cart Array is empty");
      return;
    } else {
      const exisCartArr: Item[] = JSON.parse(cartItems);
      setCart(exisCartArr);
      // console.log("existing cart array gotten and set to cartArr");
    }
  }

  function setCartToSessionStorage (cartItems: object[]){
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  function getOrderArr() {
    const orderItems = sessionStorage.getItem("orders");
    if (!orderItems) {
      // console.log("Cart Array is empty");
      return;
    } else {
      const exisCartArr: Item[] = JSON.parse(orderItems);
      setCart(exisCartArr);
      // console.log("existing cart array gotten and set to cartArr");
    }
  }

  function setOrderToSessionStorage (cartItems: object[]){
    sessionStorage.setItem('orders', JSON.stringify(cartItems));
  }

  useEffect(()=>{
    getCartArr();
    getOrderArr();
  }, [])

  return (
    <CartContext.Provider value={{ cart, setCart, getCartArr, setCartToSessionStorage, orders, setOrders, getOrderArr, setOrderToSessionStorage}}>
      {children}
    </CartContext.Provider>
  );
}

export function useAppContext() {
  return useContext(CartContext);
}
