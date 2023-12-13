"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const UserCustomer = () => {
    const [pieKeys, setPieKeys] = useState<any>([]);
    const [pieValues, setPieValues] = useState<any>([])
    useEffect(() => {
        axios.get("/api/dashboard")
            .then((res) => {
                // console.log(res.data);
                const totalUsers = res.data.totalUsers;
                const totalOrders = res.data.totalOrders;
                setPieValues(totalUsers);
                setPieKeys(totalOrders)
            })
    }, [])



    const series = [pieValues, pieKeys]
    // const options = ['Category 1', 'Category 2', 'Category 3'],
    const options = {
        labels: ["Total User", "Orders"]
    }
    return (
        <div className='shadow-lg p-7 shadow-blue-100 h-[410px]'>
            <h2 className='text-xl font-bold mb-10'>Customer reports</h2>
            <ReactApexChart
                options={options}
                series={series}
                type="pie"
                height={500}
                width={400}
            />
        </div>
    );
};

export default UserCustomer;