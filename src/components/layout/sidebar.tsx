import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/glittersLogo.png";
import { AiOutlineClose } from "react-icons/ai";

export interface AsideProps {
  aside: boolean
  setAside: Dispatch<SetStateAction<boolean>> 
}

export default function Sidebar ({aside, setAside}: AsideProps) {
    return (
      <>
        {aside === true && (<div onClick={()=>setAside(false)} className="bg-overlay fixed top-0 left-0 right-0 bottom-0 z-20"></div>)}
        <aside className={aside ? "fixed h-full bg-[#F7EBEE] shadow-lg z-30 right-0 top-0 w-1/2 transition-all ease-in-out delay-100 p-2 sm:hidden" : "-right-full fixed h-full bg-[#F7EBEE] transition-all ease-in-out delay-100 top-0 w-1/2"}>
          <div className="flex flex-col gap-y-4 border border-black p-2.5">
            <div className="flex justify-end">
              <button onClick={()=>setAside(false)} className="text-lg p-1 bg-red-500 rounded-full">
                <AiOutlineClose color="white" />
              </button>
            </div>
            <div className="flex justify-center">
              <Image alt="logo" priority src={logo} className="w-3/4 h-auto" />
            </div>
            <ul>
              <li>
                <Link className="" href={'/'}>
                  Store
                </Link>
              </li>
            </ul>
            <div>
              search input bar
              cart icon
              account icon
            </div>
          </div>
        </aside>
      </>
    );
  }
  