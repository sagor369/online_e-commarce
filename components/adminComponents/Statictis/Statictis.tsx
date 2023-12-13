"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegUserCircle, FaUserCheck, FaCommentDollar } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdEventAvailable } from "react-icons/md";


// totalInStockProducts
// : 
// 12
// totalOrders
// : 
// 1
// totalProducts
// : 
// 12
// totalSolded
// : 
// 48016
// totalUsers
// : 
// 50

const Statictis = () => {
    const [data, setData] = useState<any>("");
    useEffect(() => {
        axios.get("/api/dashboard")
            .then(res => {
                // console.log(res.data);
                setData(res.data);
            })
    });
    return (
        <div>
            <section className='grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10'>
                <div className='flex justify-center items-center gap-5 shadow-2xl py-7 rounded-xl border px-4'>
                    <div className='rounded-full flex justify-center items-center w-20 h-20 bg-green-100'>
                        <FaRegUserCircle className='text-3xl text-green-900' />
                    </div>
                    <div className='text-left'>
                        <h2 className='text-3xl font-bold'>{data?.totalUsers || 0}</h2>
                        <p className='text-gray-600 mt-1'>Total Users</p>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-5 shadow-2xl py-7 rounded-xl border px-4'>
                    <div className='rounded-full flex justify-center items-center w-20 h-20 bg-orange-100'>
                        <FaUserCheck className='text-3xl text-orange-900' />
                    </div>
                    <div className='text-left'>
                        <h2 className='text-3xl font-bold'>{data?.totalOrders}</h2>
                        <p className='text-gray-600 mt-1'>Total Order</p>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-5 shadow-2xl py-7 rounded-xl border px-4'>
                    <div className='rounded-full flex justify-center items-center w-20 h-20 bg-red-100'>
                        <MdOutlineProductionQuantityLimits className='text-3xl text-red-900' />
                    </div>
                    <div className='text-left'>
                        <h2 className='text-3xl font-bold'>{data?.totalProducts || 0}</h2>
                        <p className='text-gray-600 mt-1'>Total Product</p>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-5 shadow-2xl py-7 rounded-xl border px-4'>
                    <div className='rounded-full flex justify-center items-center w-20 h-20 bg-yellow-100'>
                        <FaCommentDollar className='text-3xl text-yellow-900' />
                    </div>
                    <div className='text-left'>
                        <h2 className='text-3xl font-bold'>{data?.totalSolded || 0}</h2>
                        <p className='text-gray-600 mt-1'>Sold Products</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Statictis;