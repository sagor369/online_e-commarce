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
import "@/app/styles/Dropdown.css";

type linkData = {
  label: string;
  link: string;
};
const AllProduct = ({ navData }: { navData: any }) => {
  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <Link href="/shops">Shops</Link>
            </NavigationMenuTrigger>
            <NavigationMenuContent className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-52 rounded-md contact-bg p-2 data-[state=open]:transition-all">
              <ul className="flex flex-col items-start gap-2">
                {navData.map((data: linkData) => (
                  <Link href={`/shops/${data.link}`}> {data.label}</Link>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default AllProduct;
