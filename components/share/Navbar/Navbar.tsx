"use client";
import Link from "next/link";
import AllProduct from "@/components/navbarComponent/AllProduct";
import { useEffect, useState } from "react";
import SubCategory from "@/components/navbarComponent/SubCategory";
import { HelpCircle } from "lucide-react";
import { IoLocationSharp } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


const Navbar = () => {
  const [navData, setNavdata] = useState<any>([]);
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
  

  return (

    <div className="shadow bg-white z-50">
      <nav className="container mx-auto py-3 lg:flex hidden items-center justify-between">
      <div className="flex gap-6 items-center">
        <Link href="/" className=" text-slate-700"> Home</Link>
        <Link href="/shops" className=" text-slate-700">Shops</Link>
        
        {navData?.map((data: any) => (
          <SubCategory key={data._id} data={data}></SubCategory>
        ))}
        <Link href="/about" className=" text-slate-700"> About</Link>
        <Link href="/contact" className=" text-slate-700"> Contact</Link>
      </div>

      {/* toogle */}
      <div className="flex items-center gap-6">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Link href="/faq">
              <div className="flex items-center gap-1">
              <HelpCircle className="text-2xl text-slate-600" /> 
              Help Center 
              </div>
        
            </Link></TooltipTrigger>
          <TooltipContent>
            <p> Help Center / FAQ</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> 
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Link href="/store">
              <div className="flex items-center gap-1">
              <IoLocationSharp className="text-2xl text-slate-600" /> 
             Physical Store
              </div>
        
            </Link></TooltipTrigger>
          <TooltipContent>
            <p>Location / Store</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider> 
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
