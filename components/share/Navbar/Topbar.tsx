"use client";

import { CartIcon, HeartIcon, Logo, SearchIcon, UserIcon } from "@/public";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import img1 from "@/public/images/logo1.png";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowLeft, Menu, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AllProduct from "@/components/navbarComponent/AllProduct";
import UserLink from "@/components/userComponent/UserLink";
import {
  FaCartPlus,
  FaCube,
  FaRegHeart,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import SubCategory from "@/components/navbarComponent/SubCategory";

const Topbar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [navData, setNavdata] = useState<any>([]);

  const { i18n } = useTranslation();
  const session = useSession();
  const userLink = [
    {
      link: "/user",
      label: "My Profile",
      icon: <FaUser className="text-slate-500" />,
    },
    {
      link: "/user/order",
      label: "Orders",
      icon: <FaCube className="text-slate-500" />,
    },
    {
      link: "/user/faviourate",
      label: "WishList",
      icon: <FaRegHeart className="text-slate-500" />,
    },
    {
      link: "/",
      label: "Logout",
      icon: <FaSignOutAlt className="text-slate-500" />,
    },
  ];

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shops" },
    { name: "About", link: "/about" },
  ];
  useEffect(() => {
    const dataFetch = async () => {
      const res = await fetch("/api/navdata");
      const data = await res.json();
      setNavdata(data);
    };
    return () => {
      dataFetch();
    };
  }, []);

  return searchActive ? (
    <div className="text-black bg-primary container mx-auto py-5 w-full md:hidden flex items-center gap-2">
      <ArrowLeft
        onClick={() => setSearchActive(false)}
        className="text-white cursor-pointer w-12"
      />
      <form>
        <div className="flex items-center border border-gray-300 rounded-l-md pl-3 w-full bg-[#2c2c2c]">
          <Image src={SearchIcon} alt="icon" />
          <Input
            type="text"
            placeholder="Search for Products"
            className="bg-transparent outline-none border-none active:outline-none"
          />
        </div>
      </form>
    </div>
  ) : (
    <div className="container bg-primary text-white mx-auto py-3 flex items-center gap-2 justify-between">
      {/* logo */}
      <div className="flex items-center gap-2">
        {/* responsive */}
        <div className="lg:hidden flex items-center gap-3">
          <Sheet key={"left"}>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent side={"left"}>
              <ul>
                {menuItems.map((menu) => (
                  <li key={menu.name} className="mb-1">
                    <Link href={menu.link}>{menu.name}</Link>
                  </li>
                ))}
                <li>
                  <Link href={"/contact"} className="lg:hidden">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href={"stor"} className="lg:hidden">
                    Physical Store
                  </Link>
                </li>
                <li>
                  <Link href={"/faq"} className="lg:hidden">
                    Help Center
                  </Link>
                </li>
                {navData?.map((data: any) => (
                  <SubCategory
                   key={data._id} data={data}></SubCategory>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
        <Link href={"/"}>
          <Image
            src={img1}
            alt="print-style"
            className="lg:w-[180px] w-[150px]"
          />
        </Link>
      </div>

      {/* search form */}
      <div className="text-black lg:w-2/3 lg:pl-10 hidden md:block">
        <form>
          <div className="flex items-center max-w-xl border border-gray-300  pl-3  bg-[#e8e4ec]">
            <Image className="text-slate-400" src={SearchIcon} alt="icon" />

            <Input
              type="text"
              placeholder="Search for Products "
              className="bg-transparent  outline-none border-none active:outline-none"
            />
            <button className="w-[120px] h-10 rounded-r-md text-primary bg-white">
              Search
            </button>
          </div>
        </form>
      </div>

      {/* icon button */}
      <div className="flex items-center lg:gap-7 gap-3">
        <Image
          src={SearchIcon}
          onClick={() => setSearchActive(true)}
          alt="icon"
          className="md:hidden cursor-pointer"
        />
        {session?.data?.user ? (
          <Link className="z-[100]" href="/user">
            <UserLink linkData={userLink}></UserLink>
            {/* <Image src={UserIcon} alt="" className=" w-[30px]" /> */}
          </Link>
        ) : (
          <Link href={"/login"}>
            <button className="bg-white rounded text-multi-primary py-1 px-2">
              Login
            </button>
          </Link>
          
        )}

        <Link href={"/add-cart"}>
          <div className="flex gap-1 items-center">
            <span className="text-lg">Cart </span>
            <FaCartPlus className="text-xl" />
            {/* <ShoppingCart className="lg:w-10 w-10" /> */}
          </div>
        </Link>

        <div className="md:flex hidden">
          <Select>
            <SelectTrigger className="text-md rounded-none outline-none bg-transparent border-none">
              <SelectValue placeholder="English" />
            </SelectTrigger>
            <SelectContent className="text-primary z-[100]">
              <SelectItem onClick={() => changeLanguage("en")} value="en">
                English
              </SelectItem>
              <SelectItem onClick={() => changeLanguage("bn")} value="bn">
                বাংলা
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
