import TshirtCategory from '@/components/categorysComponent/TshirtCategory';
import React from 'react';
import img1 from "@/public/images/model.png"
import PagePagination from '@/components/pagePagination/PagePagination';


const HoodiesPage = async() => {
    // const res = await fetch('/api/products')
    // const data = await res.json()
    // const bagData = data.filter((bag:any) => bag.category == "bags")
    return (
        <div>
            <TshirtCategory img1={img1}></TshirtCategory>
            <PagePagination></PagePagination>
        </div>
    );
};

export default HoodiesPage;