import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Search from "./Search";
import { useRecoilState } from "recoil";
import { searchState } from "@/atoms/SearchAtom";

const Layout = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useRecoilState(searchState);

  return (
    <div>
      <Navbar />
      {children}
      {isPopupOpen && <Search />}
      <Footer />
    </div>
  );
};

export default Layout;
