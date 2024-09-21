"use client";
import { use, useEffect, useState } from "react";
// import { useState } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Sidebar from "./sidebar";

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
        />
        <Sidebar cartItems={cartItems} aside={aside} setAside={setAside} />
        <main>{children}</main>
        {checkPath() && <Footer />}
      </div>
    </div>
  );
}
