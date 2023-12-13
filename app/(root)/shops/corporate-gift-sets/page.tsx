import TshirtCategory from '@/components/categorysComponent/TshirtCategory';
import PagePagination from '@/components/pagePagination/PagePagination';
import React from 'react';
import img1 from "@/public/images/model.png"


const GiftSets = () => {
    return (
        <div>
            <TshirtCategory img1={img1}></TshirtCategory>
            <PagePagination></PagePagination>

        </div>
    );
};

export default GiftSets;