import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import "@/app/styles/Address.css";
import { FaUserAlt } from "react-icons/fa";

type linkData = {
  label: string;
  link: string;
  icon:any
};

const UserLink = ({linkData}: {linkData:any}) => {
  return (
    <div className="">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Link href="/user"><FaUserAlt className="w-6 h-6"/> </Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-52 rounded-md contact-bg p-2 data-[state=open]:transition-all">
              <ul >
                {linkData.map((data: linkData) => (
                    <div className="flex gap-4 mb-2 items-center ml-2">
                        <p>{data.icon}</p>
                        <Link className="text-slate-600 text-base" href={`${data.link}`}> {data.label}</Link>
                    </div>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default UserLink;
