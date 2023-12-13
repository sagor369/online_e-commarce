import CardItem from '@/components/userComponent/AddCardComponent.tsx/CardItem';
import OrderComponent from '@/components/userComponent/OrderComponent/OrderComponent';
import React from 'react';


const MyOrder = () => {
    return (
        <div >
            <div className=' mx-6 '>
                <OrderComponent></OrderComponent>
                <OrderComponent></OrderComponent>
                <OrderComponent></OrderComponent>
            </div>
            
        </div>
    );
};

export default MyOrder;