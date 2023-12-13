"use client"
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const SalesChart = () => {
    const [soldProducts, setSoldProducts] = useState([]);
    const [totalSoldCount, setTotalSoldCount] = useState(0);
    const [totalSoldPrice, setTotalSoldPrice] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/chart');
                const data = await response.json();

                setSoldProducts(data.soldProducts);
                setTotalSoldCount(data.totalSoldCount);
                setTotalSoldPrice(data.totalSoldPrice);
            } catch (error) {
                console.error('Error fetching sold products:', error);
            }
        };

        fetchData();
    }, []);

    // Group sold products by month
    const soldProductsByMonth: Record<any, { count: number; totalAmount: number }> = soldProducts.reduce(
        (acc: any, product: any) => {
            const month: any = new Date(product.createdAt).toLocaleString('en-US', { month: 'long' });

            if (!acc[month]) {
                acc[month] = { count: 0, totalAmount: 0 };
            }

            acc[month].count += product.solded;
            acc[month].totalAmount += product.price * product.solded;

            return acc;
        },
        {}
    );

    const chartData = {
        options: {
            xaxis: {
                categories: Object.keys(soldProductsByMonth),
            },
        },
        series: [
            {
                name: 'Sold Count',
                data: Object.values(soldProductsByMonth).map((monthData: any) => monthData.count),
            },
            {
                name: 'Total Sold Amount',
                data: Object.values(soldProductsByMonth).map((monthData: any) => monthData.totalAmount),
            },
        ],
    };
    return (
        <div className='shadow-lg p-7 shadow-green-100'>
            <h2 className='text-xl font-bold mb-3'>Sale's Reports</h2>
            <div className='w-[400px] lg:w-full overflow-y-scroll overflow-x-hidden'>
                <ReactApexChart
                    type="bar"
                    options={chartData.options}
                    series={chartData.series}
                    width={800}
                    height={300}
                />
            </div>
        </div>
    );
};

export default SalesChart;