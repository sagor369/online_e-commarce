"use client";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import TshirtCart from "@/components/homeComponent/Arrival/TshirtCart";
import { FaArrowLeft } from "react-icons/fa";


const PagePagination = () => {
  


  const items = [
      {
        id: 1,
        image: "/images/image 35.png",
        tshirt_name: "Unisex T-Shirt",
        price: "₹345.00 – ₹845.00",
        bgColor: "#A58341",
      },
      {
        id: 2,
        image: "/images/image 38.png",
        tshirt_name: "Polo T-Shirt",
        price: "₹345.00 – ₹845.00",
        bgColor: "#F4DCCA",
      },
      {
        id: 3,
        image: "/images/image 41.png",
        tshirt_name: "Hoodies",
        price: "₹345.00 – ₹845.00",
        bgColor: "#1D213E",
      },
      {
        id: 4,
        image: "/images/image 53.png" ,
        tshirt_name: "Hoodies",
        price: "₹345.00 – ₹845.00",
        bgColor: "#1D213E",
      },
    ];

  const Items = ({ currentItems }: { currentItems: any }) => {
    return (
      <>
      <div className='flex gap-8 items-center mb-16'>
                <button className='bg-multi-primary py-2 rounded px-10 ml-4'><FaArrowLeft className='text-white text-2xl' /></button>
                <select name="" id="" className='bg-multi-primary text-white px-4 py-2 text-xl'>
                    <option value="">Default Sorting</option>
                </select>
                </div>
        {currentItems && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            {currentItems.map((tshirt:any,) => (
              <div key={tshirt.id} className="w-3/4 mx-auto">
                <TshirtCart tsData={tshirt} ></TshirtCart>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  const PaginatedItems = ({ itemsPerPage }: { itemsPerPage: any }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event: any) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          previousLinkClassName="py-1 px-2 text-2xl font-bold  rounded text-multi-primary"
          nextLinkClassName="py-1 px-2 font-bold text-2xl rounded text-multi-primary"
          pageClassName=" py-1 px-2 font-bold  rounded bg-multi-primary"
          activeClassName="text-white "
          className="text-center items-center gap-1  flex justify-center"
        />
      </>
    );
  };
  return (
    <div>
      <PaginatedItems itemsPerPage={3}></PaginatedItems>
    </div>
  );
};

export default PagePagination;
