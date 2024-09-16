import Image from "next/image";
import glittersLogo from "@/assets/images/glittersLogo.png";
import hamburgerMenu from "@/assets/icons/menu-bar.png";
import search from "@/assets/icons/search-icon.png";
import cart from "@/assets/icons/shopping-cart-icon.png";
import account from "@/assets/icons/account-circle-icon.png";
import logout from "@/assets/icons/logout.png";
import Link from "next/link";

export interface NavProps {
  searchbar: boolean;
  logoutBar: boolean;
  isLoggedin: boolean;
  showSearchbar(): void;
  showLogoutBar(): void;
}

export default function Navbar({
  searchbar,
  logoutBar,
  showLogoutBar,
  showSearchbar,
  isLoggedin,
}: NavProps) {
  return (
    <header>
      <nav className="m-3 p-3 border border-[#2E2729] flex flex-row justify-between items-center lg:px-8">
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
          <Link href={"/cart"}>
            <Image
              src={cart}
              alt="cart-icon"
              className="w-[25px] h-auto cursor-pointer md:w-[30px]"
            />
          </Link>
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
              <div className="bg-white absolute flex flex-row gap-x-3 px-4 items-center border border-black h-[50px] w-[115px] top-8 -left-20 cursor-pointer">
                <p className="text-[#FF0C10]">Logout</p>
                <Image
                  src={logout}
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
          />
        </button>
      </nav>
    </header>
  );
}
