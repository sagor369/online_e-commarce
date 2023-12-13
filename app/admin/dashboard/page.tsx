import SalesChart from '@/components/adminComponents/SalesChart/SalesChart';
import Statictis from '@/components/adminComponents/Statictis/Statictis';
import UserCustomer from '@/components/adminComponents/userCustomer/UserCustomer';
const Dashboard = () => {


  return (
    <div className='mt-3 p-4'>

      <Statictis />
      {/* charts */}

      <section className='lg:flex justify-between items-start mt-20'>
        <SalesChart />
        <UserCustomer />
      </section>
    </div>
  )
}

export default Dashboard