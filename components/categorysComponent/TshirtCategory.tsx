import React from 'react';

import Image from 'next/image';

const TshirtCategory = ({img1}: {img1:any}) => {
    return (
        <div className='bg-multi-primary  flex gap-8 mb-9 items-center'>
            <Image width={500} src={img1} alt='' />
            <div className='text-center'>
                <h1 className='text-7xl text-white mb-10'>CUSTOM PRINT</h1>
                <h4 className='text-4xl text-white mb-16'>PRINT YOUR DESIGN</h4>
                <button className='bg-white text-multi-primary py-2 px-10 text-5xl rounded'>Buy Now</button>
            </div>
        </div>
    );
};

export default TshirtCategory;