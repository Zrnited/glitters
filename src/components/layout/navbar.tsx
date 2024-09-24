import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { deleteCookies } from "@/app/action/actions";
import glittersLogo from "@/assets/images/glittersLogo.png";
import hamburgerMenu from "@/assets/icons/menu-bar.png";
import search from "@/assets/icons/search-icon.png";
import cart from "@/assets/icons/shopping-cart-icon.png";
import account from "@/assets/icons/account-circle-icon.png";
import logoutIcon from "@/assets/icons/logout.png";
import Link from "next/link";

export interface NavProps {
  searchbar: boolean;
  logoutBar: boolean;
  isLoggedin: boolean;
  cartItems: object[] | undefined;
  setAside: Dispatch<SetStateAction<boolean>>
  showSearchbar(): void;
  showLogoutBar(): void;
  logout(): void
}

export default function Navbar({
  searchbar,
  logoutBar,
  logout,
  showLogoutBar,
  showSearchbar,
  isLoggedin,
  cartItems,
  setAside
}: NavProps) {
  return (
    <header>
      <nav className="fixed top-0 right-0 left-0 z-20 xl:flex xl:justify-center bg-[#F7EBEE]">
        <div className="m-3 p-3 border border-[#2E2729] bg-[#F7EBEE] flex flex-row justify-between items-center xl:container lg:px-8">
          <ul className="hidden sm:flex flex-row gap-x-4 lg:font-medium lg:gap-x-6">
            <li>
              <Link className="md:text-lg" href={"/"}>
                Store
              </Link>
            </li>
            <li>
              <Link className="md:text-lg" href={"/"}>
                About us
              </Link>
            </li>
            <li>
              <Link className="md:text-lg" href={"/"}>
                Partners
              </Link>
            </li>
          </ul>
          <Link href={"/"}>
            <Image
              priority
              src={glittersLogo}
              alt="logo"
              className="w-[110px] lg:w-[135px]"
            />
          </Link>
          <div className="hidden sm:flex flex-row gap-x-5 md:gap-x-8 lg:gap-x-10">
            <div className="relative">
              <Image
                src={search}
                alt="search-icon"
                className="w-[25px] h-auto cursor-pointer md:w-[30px]"
                onClick={showSearchbar}
              />
              {searchbar && (
                <div className="absolute top-8 -left-24">
                  <input
                    type="text"
                    className="bg-white pl-3 pr-10 border border-black h-[50px] focus:outline-none"
                    placeholder="Enter the item name"
                  />
                  <Image
                    alt="icon"
                    priority
                    src={search}
                    className="absolute w-[22px] h-[22px] right-3 bottom-4 cursor-pointer"
                  />
                </div>
              )}
            </div>
            <div className="relative">
              <Link href={"/cart"}>
                <Image
                  src={cart}
                  alt="cart-icon"
                  className="w-[25px] h-auto cursor-pointer md:w-[30px]"
                />
              </Link>
              {cartItems && (<p className="bg-red-500 w-[20px] h-[20px] text-center text-white rounded-full absolute -right-2 -top-1 text-xs place-content-center">{`${cartItems?.length}`}</p>)}
            </div>
            <div className="relative">
              {!isLoggedin && (<Link href={"/signin"}>
                <Image
                  src={account}
                  alt="account-icon"
                  className="w-[25px] h-auto cursor-pointer md:w-[30px]"
                />
              </Link>)}
              {isLoggedin && (<Image
                src={account}
                alt="account-icon"
                className="w-[25px] h-auto cursor-pointer md:w-[30px]"
                onClick={showLogoutBar}
              />)}
              {logoutBar && (
                <div onClick={()=>{
                  deleteCookies();
                  logout();
                  toast.success("Logged out successfully");
                }} className="bg-white absolute flex flex-row gap-x-3 px-4 items-center border border-black h-[50px] w-[115px] top-8 -left-20 cursor-pointer">
                  <p className="text-[#FF0C10]">Logout</p>
                  <Image
                    src={logoutIcon}
                    alt="icon"
                    priority
                    className="w-[24px] h-[24px]"
                  />
                </div>
              )}
            </div>
          </div>
          <button className="sm:hidden">
            <Image
              priority
              src={hamburgerMenu}
              alt="menu-icon"
              className="w-[30px] h-[30px]"
              onClick={()=>setAside(true)}
            />
          </button>
        </div>
      </nav>
    </header>
  );
}
