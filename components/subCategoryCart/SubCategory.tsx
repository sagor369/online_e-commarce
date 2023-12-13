import Image from 'next/image';
import React from 'react';

const SubCategory = ({img} :{img:any}) => {
    return (
        <div className=''>
            <div className='relative '>
            <div className='md:flex hidden gap-4 justify-center items-center'>
                <Image src={img} alt='' width={500} height={500} ></Image>
                <Image src={img} alt='' width={300} height={300}></Image>
                <Image src={img} alt='' width={400} height={400}></Image>
            </div>
                <div className='h-56 absolute top-1/2 left-1/3'>
                    <div className='flex flex-col justify-between'>
                        <h1 className='text-8xl text-multi-primary font-semibold'>CUSTOM PRINT</h1>
                        <div className='text-center mt-20'>

                        <button className='bg-multi-primary text-white text-2xl py-2 px-3 '>Buy Now </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubCategory;