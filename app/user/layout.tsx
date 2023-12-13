
import SiteBar from "@/components/userComponent/SiteBar";
import React from "react";
import Navbar from "@/components/share/Navbar/Navbar";
import Footer from "@/components/share/Footer/Footer";
import "@/app/styles/Address.css"
import Link from "next/link";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const UserLayout = ({ children }: Props) => {

  return (
    <html lang="en" data-theme="light">
      <body >
        <div className="">
        <div >
        <Navbar></Navbar>
        </div>
        <div className="flex flex-col md:flex-row gap-4 container mx-auto">
          <div className="  ">
            <SiteBar></SiteBar>
          </div>
          <div className="contact-bg  w-full mt-4">{children}</div>
        </div>
        <Footer></Footer>

        </div>
      </body>
    </html>
  );
};

export default UserLayout;
