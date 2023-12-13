import PagePagination from '@/components/pagePagination/PagePagination';
import SubCategory from '@/components/subCategoryCart/SubCategory';
import React from 'react';
import img from "@/public/images/image 57.png" 

const CapPage = () => {
    return (
        <div className='mt-6 container mx auto'>
           <div>
            <SubCategory img = {img}></SubCategory>
            <div className='mt-6 '>

            <PagePagination></PagePagination>
            </div>
           </div>
        </div>
    );
};

export default CapPage;