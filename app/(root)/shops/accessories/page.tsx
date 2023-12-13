import React from "react";
import img1 from "@/public/images/model.png";
import TshirtCategory from "@/components/categorysComponent/TshirtCategory";
import PagePagination from "@/components/pagePagination/PagePagination";

const Accessories = () => {
  return (
    <div>
      <TshirtCategory img1={img1}></TshirtCategory>
      <PagePagination></PagePagination>
    </div>
  );
};

export default Accessories;
