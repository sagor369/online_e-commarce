import React from 'react';

const SectionTitle = ({title}: {title:string}) => {
    return (
        <div className=' inline-block  border-b-8 px-2 pb-1  border-multi-primary'>
            <p className='text-4xl font-bold pb-2'>{title} </p>
        </div>
    );
};

export default SectionTitle;