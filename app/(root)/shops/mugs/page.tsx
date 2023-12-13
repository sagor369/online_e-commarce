import TshirtCategory from '@/components/categorysComponent/TshirtCategory';
import React from 'react';
import img1 from "@/public/images/model.png"
import PagePagination from '@/components/pagePagination/PagePagination';


const MugsPage = async() => {
    // const res = await fetch('/api/products')
    // const data = await res.json()
    // const bagData = data.filter((bag:any) => bag.category == "mugs")
    return (
        <div>
            <TshirtCategory img1={img1}></TshirtCategory>
            <PagePagination></PagePagination>

        </div>
    );
};

export default MugsPage;