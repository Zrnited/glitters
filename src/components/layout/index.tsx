"use client";
import { useState } from "react";
// import { useState } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import { usePathname } from "next/navigation";
// import Sidebar from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [searchbar, setSearchbar] = useState<boolean>(false);
  const [logoutBar, setLogoutBar] = useState<boolean>(false);

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

  function showSearchbar (){
    if(logoutBar){
      setLogoutBar(false);
      setSearchbar(!searchbar);
    } else {
      setSearchbar(!searchbar);
    }
  }

  function showLogoutBar (){
    if(searchbar){
      setSearchbar(false);
      setLogoutBar(!logoutBar);
    } else {
      setLogoutBar(!logoutBar);
    }
  }

  return (
    <div className="flex justify-center">
      <div className="container">
        <Navbar searchbar={searchbar} showSearchbar={showSearchbar} logoutBar={logoutBar} showLogoutBar={showLogoutBar} />
        {/* <Sidebar /> */}
        <main>
          {children}
        </main>
        {checkPath() && <Footer />}
      </div>
    </div>
  );
}
