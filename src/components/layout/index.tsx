"use client";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import Aos from 'aos';
import 'aos/dist/aos.css';
import Footer from "./footer";
import Navbar from "./navbar";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import { ToastContainer } from 'react-toastify';
import { checkForCookie } from "@/app/action/actions";
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [searchbar, setSearchbar] = useState<boolean>(false);
  const [logoutBar, setLogoutBar] = useState<boolean>(false);
  const [aside, setAside] = useState<boolean>(false);
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);

  const { cart } = useAppContext();

  function checkPath() {
    if (path === "/signup") {
      return false;
    } else if (path === "/signin") {
      // setPaths(false);
      return false;
    } else if (path === "/resetpassword") {
      // setPaths(false);
      return false;
    } else if (path === "/createnewpassword") {
      // setPaths(true);
      return false;
    } else {
      return true;
    }
  }

  function showSearchbar() {
    if (logoutBar) {
      setLogoutBar(false);
      setSearchbar(!searchbar);
    } else {
      setSearchbar(!searchbar);
    }
  }

  function showLogoutBar() {
    if (searchbar) {
      setSearchbar(false);
      setLogoutBar(!logoutBar);
    } else {
      setLogoutBar(!logoutBar);
    }
  }

  function logout (){
    setLogoutBar(false);
    setIsLoggedin(false);
  }

  useEffect(()=>{
    Aos.init({
      duration: 800,
      once: false
    })
  })

  //check if a token exists from the sessionStorage
  async function checkToken() {
    const tokenstatus = checkForCookie();
    if(await tokenstatus){
      setIsLoggedin(true);
    } else {
      return;
    }
  }

  useEffect(()=>{
    checkToken();
  }, [])

  return (
    <div className="flex justify-center">
      <ToastContainer />
      <div className="container">
        <Navbar
          cartItems={cart}
          setAside={setAside}
          isLoggedin={isLoggedin}
          searchbar={searchbar}
          showSearchbar={showSearchbar}
          logoutBar={logoutBar}
          showLogoutBar={showLogoutBar}
          logout={logout}
        />
        <Sidebar isLoggedin={isLoggedin} logout={logout} cartItems={cart} aside={aside} setAside={setAside} />
        <main>{children}</main>
        {checkPath() && <Footer />}
      </div>
    </div>
  );
}
