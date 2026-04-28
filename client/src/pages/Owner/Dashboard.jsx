import React, { useEffect, useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/assets'
import Title from '../../components/owner/Title';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react';




export default function Dashboard() {



  const {isOwner,axios,currency}=useAppContext()
  

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0

  })

  const fetchDashboardData = async () => {
  try {
    const response = await axios.get('/api/owner/dashboard');
    if (response.data.success) {
      const dashboard = response.data.dashboardData;

      // normalize
      setData({
        totalCars: dashboard.totalCars || 0,
        totalBookings: dashboard.totalBookings || 0,
        pendingBookings: dashboard.pendingBookings || 0,
        completedBookings: dashboard.completedBookings || 0,
        recentBookings: dashboard.recentBookings || [],
        monthlyRevenue: dashboard.monthlyRevenue || 0
      });
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};



  const dashboardCard = [
    {
      title: "Total Cars", value: data.totalCars, icon: assets.carIconColored
    },
    {
      title: "Total Booking", value: data.totalBookings, icon: assets.calendar_icon_colored
    },
    {
      title: "pending", value: data.pendingBookings, icon: assets.cautionIconColored
    },
    {
      title: "Confirmed", value: data.completedBookings, icon: assets.listIconColored
    }
  ]

 const location = useLocation();

useEffect(() => {
  if (isOwner) {
    fetchDashboardData();
  }
}, [isOwner, location.pathname]);
  


  return (
    <div className='bg-linear-to-t from-[#020617] via-[#0F172A] to-[#020617] min-h-screen px-4 pt-10 md:px-10 flex-1'>

      <Title title="Admin Dashboard" subtitle="Monitor overall Platform Perfomance Including Total Cars ,Booking , Revenue And recent Activities" />


      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-3xl gap-6 my-8'>

        {dashboardCard.map((card, index) => (
          <motion.div 
           initial={{x:-120,opacity:0,scale:0.8}}
      whileInView={{x:0,opacity:1,scale:1}}
      transition={{duration:0.8,ease:"easeOut",delay:index*0.2}} 
      viewport={{once:true,amount:0.3}}
        
          key={index} className='flex items-center justify-between gap-6 p-4 rounded-md border border-white/70'>


            <div className=' text-white'>
              <h1 className='text-xs'>
                {card.title}
              </h1>
              <p className='text-lg font-semibold'>
                {card.value}
              </p>

            </div>

            <div className='flex justify-center items-center w-10 h-10  rounded-full bg-white/10'>

              <img src={card.icon} alt="" className='h-4 w-4' />

            </div>
          </motion.div>
        ))}

      </div>

      <div className='flex flex-wrap items-start gap-6 mb-6 w-full'>

        {/* recent booking */}
        <motion.div
        initial={{x:-80,opacity:0,scale:0.8}}
      whileInView={{x:0,opacity:1,scale:1}}
      transition={{duration:0.8,ease:"easeOut",delay:0.2}} 
      viewport={{once:true,amount:0.3}}
         className='p-4 md:p-6 rounded-md  max-w-lg border border-white/60 w-full'>
          <h1 className='text-lg font-medium text-white'>Recent Booking</h1>
          <p className='text-white/70'>Latest Customer Booking</p>
          {data.recentBookings?.map((booking, index) => (
            <div key={index} className='flex items-center justify-between mt-4'>

              <div className='flex items-center gap-2'>
                <div className='hidden md:flex  items-center justify-center w-12 h-12 rounded-full bg-white/10'>

                  <img src={assets.listIconColored} alt="" className='h-4 w-4' />

                </div>
                <div>
                  <p className='text-white/90'>{booking.car.brand} {booking.car.model}  </p>
                  <p className='text-sm text-white/70'>{booking.createdAt.split('T')[0]}</p>
                </div>
              </div>

              <div className='flex items-center gap-2 font-medium'>
                <p className='text-sm text-white/80'>{currency}{booking.price}</p>
                <p className={`px-3 py-0.5 rounded-full text-sm border border-white/50 ${booking.status === 'confirmed' ? 'bg-green-400/15 text-green-600' :
                  "bg-red-400/15 text-red-600"}`}>{booking.status}</p>

              </div>
            </div>
          ))}

        </motion.div>
        {/* Monthy Revenue */}
        <motion.div 
        initial={{x:-120,opacity:0,scale:0.8}}
      whileInView={{x:0,opacity:1,scale:1}}
      transition={{duration:0.8,ease:"easeOut",delay:0.2}} 
      viewport={{once:true,amount:0.3}}
        className='p-4 md:p-6 border  border-white/50 rounded-md w-full md:max-w-xs'>
          <h1 className='text-xl font-medium text-white'>Monthly Revenue</h1>
          <p className='text-white/70'>revenue Of Current month</p>
          <p className='text-3xl mt-4 text-blue-600 font-semibold'>{currency}{data.monthlyRevenue}</p>

        </motion.div>

      </div>





    </div>
  )
}
