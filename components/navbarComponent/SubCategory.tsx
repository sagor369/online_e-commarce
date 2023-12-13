import React from 'react';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
  } from "@/components/ui/menubar"
import Link from 'next/link';
import { FaCaretDown } from 'react-icons/fa';
   

const SubCategory = ({data} :{data:any}) => {
  const {label, link, items} = data || {}
    return (
        <div>
        <Menubar className="border-none p-0 m-0 ">
      <MenubarMenu >
        <MenubarTrigger className=' px-1'><p className='flex gap-2 items-center'><span>{label}</span> <FaCaretDown /></p></MenubarTrigger>
        <MenubarContent className=''>
          <MenubarItem className=''>
            <div className='flex flex-col '>
            {
              items?.map((it: any) => <Link className='mb-2' key={it._id} href={`/shops/${link}${it.link}`}>{it.label} </Link>)
            }

            </div>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
        </div>
    );
};

export default SubCategory;