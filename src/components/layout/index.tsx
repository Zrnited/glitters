"use client";
import { useEffect, useState } from "react";
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
  const [cartItems, setCartItems] = useState<Array<object>>();

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

  function getCartArr() {
    const cartItems = sessionStorage.getItem("cartItems");
    if (!cartItems) {
      // console.log("Cannot find cart in session storage");
      return;
    } else {
      const exisCartArr: object[] = JSON.parse(cartItems);
      // console.log(exisCartArr);
      setCartItems(exisCartArr);
      // console.log("existing cart array gotten and set to cartArr");
    }
  }

  useEffect(() => {
    getCartArr();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          cartItems={cartItems}
          setAside={setAside}
          isLoggedin={isLoggedin}
          searchbar={searchbar}
          showSearchbar={showSearchbar}
          logoutBar={logoutBar}
          showLogoutBar={showLogoutBar}
          logout={logout}
        />
        <Sidebar isLoggedin={isLoggedin} logout={logout} cartItems={cartItems} aside={aside} setAside={setAside} />
        <main>{children}</main>
        {checkPath() && <Footer />}
      </div>
    </div>
  );
}
