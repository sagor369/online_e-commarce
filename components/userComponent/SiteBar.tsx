"use client"
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaBook, FaUser } from "react-icons/fa";
import "@/app/styles/Address.css"
import Navlink from "../share/Navbar/Navlink";
import Image from "next/image";
import usrLogo from "@/public/images/profile-pic-male_4811a1 (1).svg"
type data = {
  title: string;
  link: string;
};

const SiteBar = () => {
  const accountLink = [
    {
      title: "Profile Inpormation",
      link: "/user",
    },
    {
      title: "Manage Addresses",
      link: "/user/address",
    },
    
  ];
  const siteLink = [
    {
      title: "My Order",
      link: "/user/my-order",
    },
    {
      title: "My Faviourate",
      link: "/user/faviourate",
    },
  ];

  const router = useRouter();

  return (
    <div className="md:w-96 w-full px-4 ">
      <div className="flex gap-4 items-center px-3 py-2 contact-bg my-4 rounded ">
        <Image className="w-12 h-12" src={usrLogo} alt=""></Image>
        <div>
          <p>Hi, </p>
          <p className="uppercase">MD Sahidul Islam</p>
        </div>
      </div>
      <div className="contact-bg   px-8 py-2 rounded">
        <div className="  ">
          <div className="flex items-center gap-3 text-xl my-6">
            <FaUser className="text-multi-primary" />
            <p>Account Settings</p>
          </div>

          {accountLink.map((dt: data, i: number) => (
            <p key={i} className="mb-2 ">
              <Navlink exact={dt.link == "/user"} activeClassName="text-multi-primary font-bold" className=" mb-3  ml-5" href={dt.link} >{dt.title} </Navlink>
              
            </p>
          ))}

        </div>
        <div className="mt-4">
          <div className="flex items-center gap-3 text-xl my-4">
            <FaBook className="text-multi-primary" />
            <p>Histry</p>
          </div>
          {siteLink.map((dt: data, i: number) => (
            <p key={i} className="mb-2">
             <Navlink exact={dt.link == "/user"} activeClassName="text-multi-primary font-bold" className=" mb-3  ml-5" href={dt.link} >{dt.title} </Navlink>
            </p>
          ))}
        </div>
        <div onClick={() => {
          signOut({ redirect: false }).then(() => {
            router.push("/"); // Redirect to the home page after signing out
          });
        }} className="mt-10 ">
          <button className="bg-multi-primary text-white py-1 px-3">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default SiteBar;
