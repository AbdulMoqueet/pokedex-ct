import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Search from "./Search";
import { useRecoilState } from "recoil";
import { searchState } from "@/atoms/SearchAtom";
import Loader from "./Loader";
import { loadingState } from "@/atoms/LoadingAtom";

const Layout = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useRecoilState(searchState);
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  return (
    <div>
      <Navbar />
      {children}
      <Footer />
      {isPopupOpen && <Search />}
      {isLoading && <Loader />}
    </div>
  );
};

export default Layout;
