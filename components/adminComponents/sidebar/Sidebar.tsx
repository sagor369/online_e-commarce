import { X } from "lucide-react";
import SidebarLink from "../links/SidebarLinks";
import React from "react";
import Image from "next/image";
import { PrintStyleLogo } from "@/app/admin/images";
import { IRoute } from "@/app/admin/types/navigation";

const Sidebar = (props: { routes: IRoute[]; [x: string]: any }) => {
  const { routes, open, setOpen } = props;

  return (
    <div
      className={`w-[250px] sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white border-r pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96 xl:translate-x-0"
      }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={() => setOpen(false)}
      >
        <X />
      </span>
      <div className={`mx-[30px] mt-[20px] flex items-center`}>
        <div className="ml-1 mt-1 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white flex">
          <Image src={PrintStyleLogo} alt="logo" />
        </div>
      </div>
      <div className="mb-7 mt-[20px] h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        {routes.map((route, index) => (
          <SidebarLink key={index} route={route} />
        ))}
      </ul>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
