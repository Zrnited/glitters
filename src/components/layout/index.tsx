"use client";
import { useState } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import { usePathname } from "next/navigation";
// import Sidebar from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  function checkPath() {
    if (path === "/signup") {
      return false;
    } else if (path === "/signin") {
      // setPaths(false);
      return false;
    } else if (path === "/resetpassword") {
      // setPaths(false);
      return false;
    } else {
      // setPaths(true);
      return true;
    }
  }

  return (
    <div className="flex justify-center">
      <div className="container">
        <Navbar />
        {/* <Sidebar /> */}
        <div className="flex justify-center items-center flex-grow">
          {children}
        </div>
        {checkPath() && <Footer />}
      </div>
    </div>
  );
}
