import Image from "next/image";
import glittersLogo from "@/assets/images/glittersLogo.png";
import hamburgerMenu from "@/assets/icons/menu-bar.png";
import search from "@/assets/icons/search-icon.png";
import cart from "@/assets/icons/shopping-cart-icon.png";
import account from "@/assets/icons/account-circle-icon.png";
import Link from "next/link";

export default function Navbar() {
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
        <Image
          priority
          src={glittersLogo}
          alt="logo"
          className="w-[110px] lg:w-[135px]"
        />
        <div className="hidden sm:flex flex-row gap-x-5 md:gap-x-8 lg:gap-x-10">
          <Image
            src={search}
            alt="search-icon"
            className="w-[25px] h-auto cursor-pointer md:w-[30px]"
          />
          <Link href={'/cart'}>
            <Image
              src={cart}
              alt="cart-icon"
              className="w-[25px] h-auto cursor-pointer md:w-[30px]"
            />
          </Link>
          <Image
            src={account}
            alt="account-icon"
            className="w-[25px] h-auto cursor-pointer md:w-[30px]"
          />
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
