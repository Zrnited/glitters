import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/glittersLogo.png";
import { AiOutlineClose } from "react-icons/ai";
import accIcon from "@/assets/icons/account-circle-icon.png";
import cartIcon from "@/assets/icons/shopping-cart-icon.png";

export interface AsideProps {
  aside: boolean;
  setAside: Dispatch<SetStateAction<boolean>>;
  cartItems: object[] | undefined;
}

export default function Sidebar({ aside, cartItems, setAside }: AsideProps) {
  return (
    <>
      {aside === true && (
        <div
          onClick={() => setAside(false)}
          className="bg-overlay fixed top-0 left-0 right-0 bottom-0 z-30"
        ></div>
      )}
      <aside
        className={
          aside
            ? "fixed h-full bg-[#F7EBEE] shadow-lg z-40 right-0 top-0 w-2/3 transition-all ease-in-out delay-100 p-2 sm:hidden"
            : "-right-full fixed h-full bg-[#F7EBEE] transition-all ease-in-out delay-100 top-0 w-1/2"
        }
      >
        <div className="flex flex-col gap-y-4 border border-black p-2.5 h-full">
          <div className="flex justify-end">
            <button
              onClick={() => setAside(false)}
              className="text-lg p-1 bg-red-500 rounded-full"
            >
              <AiOutlineClose color="white" />
            </button>
          </div>
          <div className="flex justify-center">
            <Image alt="logo" priority src={logo} className="w-3/4 h-auto" />
          </div>
          <ul className="flex flex-col gap-y-2">
            <li className="p-2 rounded-sm hover:bg-[#E8C3CB] transition ease-in-out delay-100">
              <Link className="font-medium" href={"/"}>
                Store
              </Link>
            </li>
            <li className="p-2 rounded-sm hover:bg-[#E8C3CB] transition ease-in-out delay-100">
              <Link className="font-medium" href={"/"}>
                About us
              </Link>
            </li>
            <li className="p-2 rounded-sm hover:bg-[#E8C3CB] transition ease-in-out delay-100">
              <Link className="font-medium" href={"/"}>
                Partners
              </Link>
            </li>
          </ul>
          <div className="flex flex-col gap-y-2 grow">
            <div className="flex flex-col gap-y-3">
              <div className="flex flex-col gap-y-2">
                <input
                  type="text"
                  placeholder="Enter the item name"
                  className="pl-3 pr-10 h-[50px] border border-black focus:outline-none"
                />
                <button className="h-[50px] rounded-sm text-center font-medium w-full bg-[#CF8292] text-white">
                  Search
                </button>
              </div>
            </div>
            {/* Cart & login */}
            <div className="justify-end flex grow flex-col">
              <div className="flex flex-row gap-x-2 items-center cursor-pointer p-2">
                <Image
                  src={cartIcon}
                  priority
                  alt="icon"
                  className="w-[30px] h-auto"
                />
                <Link href={"/cart"} className="text-lg font-semibold">
                  Cart
                </Link>
                <p className="w-[20px] h-[20px] text-center text-white font-medium rounded-full bg-red-500">
                  {cartItems ? `${cartItems.length}` : `0`}
                </p>
              </div>
              <div className="flex flex-row gap-x-2 items-center cursor-pointer p-2">
                <Image
                  src={accIcon}
                  priority
                  alt="icon"
                  className="w-[30px] h-auto"
                />
                <Link href={"/signin"} className="text-lg font-semibold">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
