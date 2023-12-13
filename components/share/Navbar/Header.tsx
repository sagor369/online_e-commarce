"use client"
import Navbar from "./Navbar";
import Topbar from "./Topbar";
import { useTranslation } from "react-i18next";

const Header = () => {
  const {t} = useTranslation()
  return (
    <header >
      <Topbar />
      {/* <div className="sticky top-4">

      <Navbar />
      </div> */}
    </header>
  );
};

export default Header;
