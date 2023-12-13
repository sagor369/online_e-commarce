import Image from "next/image";
import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { HiAnnotation } from "react-icons/hi";
import storeImg from "@/public/images/shopStore.webp"
import { Accordion,AccordionContent,AccordionItem,AccordionTrigger, } from "@/components/ui/accordion"

const AddressShop = () => {
  return (
    <div className="container mx auto">
      <div className="grid grid-cols-1 md:grid-cols-3 justify-between ">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold text-slate-600 mb-10">
            Shops Locations Name{" "}
          </h1>
          <div className="flex gap-4 items-center mt-4">
            <FaMapMarkerAlt className="text-multi-primary w-6 h-6" />
            <p>
              No.122/1 & 122/2 Brigade road, Richmond town, Bangalore - 560025
            </p>
          </div>
          <div className="flex gap-4 items-center my-4">
            <FaPhone className="text-multi-primary w-6 h-6" />
            <p>+918509733240</p>
            <HiAnnotation className="text-multi-primary w-6 h-6" />
            <p>brg.blr@printo.in</p>
          </div>
          <div>
          <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>
            <div className="flex gap-3 items-center underline-0">
            <FaCalendarAlt  />
            <p>open Now ( 11:00Am To 08:00Pm)</p>
            </div>
        </AccordionTrigger>
        <AccordionContent>
          <div>
            <h2 className="text-2xl font-bold text-slate-600 text-center mb-4">
                Store Hours
            </h2>
            
            <div className="grid grid-cols-2 text-xl mb-1">
                <p className="text-slate-600">Monday</p>
                <p>Open (11:00Am to 08:00Pm)</p>
            </div>
            <div className="grid grid-cols-2 text-xl mb-1 ">
                <p className="text-slate-600">Tuesday</p>
                <p>Open (11:00Am to 08:00Pm)</p>
            </div>
            <div className="grid grid-cols-2 text-xl mb-1 ">
                <p className="text-slate-600">Wednesday</p>
                <p>Open (11:00Am to 08:00Pm)</p>
            </div>
            <div className="grid grid-cols-2 text-xl mb-1 ">
                <p className="text-slate-600">Thursday</p>
                <p>Open (11:00Am to 08:00Pm)</p>
            </div>
            <div className="grid grid-cols-2 text-xl mb-1 ">
                <p className="text-slate-600">Friday</p>
                <p>Open (11:00Am to 08:00Pm)</p>
            </div>
            <div className="grid grid-cols-2 text-xl mb-1 ">
                <p className="text-slate-600">Saturday</p>
                <p>Open (11:00Am to 08:00Pm)</p>
            </div>
            <div className="grid grid-cols-2 text-xl mb-1 ">
                <p className="text-slate-600">Sunday</p>
                <p>Close</p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      
    </Accordion>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold  text-slate-600 mb-10">Store Photo </h1>
          <Image src={storeImg} alt="" width={200} height={300}></Image>
        </div>
      </div>
    </div>
  );
};

export default AddressShop;
