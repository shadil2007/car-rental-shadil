import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

export default function Mybooking() {


  const {currency,axios,user}=useAppContext()

  const [booking, setBooking] = useState([])

  const fetchmybooking = async () => {
   try {
    const {data}= await axios.get('/api/bookings/user')
     console.log("API RESPONSE:", data)
    if(data.success){
      setBooking(data.bookings)
    }else{
      toast.error(data.message)
    }
    
   } catch (error) {
      toast.error(error.message)
    
   }
  }

 
  useEffect(() => {
  user&&  fetchmybooking()
  }, [user])

  return (
    <div className='px-6 sm:px-16 lg:px-24 xl:px-32 2xl:px-44 pt-24 text-sm bg-linear-to-r 
     from-slate-900 via-gray-900  to-emerald-900 
    '>

      <div className='mt-16'>  <Title title="My-Booking" subTitle="Veiw And MAnage All Your Car Booking  " align="left" /></div>



      <motion.div
      
      className='pb-10 max-w-5xl text-white'>
        {booking.map((booking, index) => (
          <motion.div
          initial={{x:-120,opacity:0,scale:0.8}}
      whileInView={{x:0,opacity:1,scale:1}}
      transition={{duration:0.8,ease:"easeOut",delay:index*0.2}} 
      viewport={{once:true,amount:0.3}}
           key={booking._id} className='grid grid-cols-1 relative md:grid-cols-4 gap-6 p-6  w-full rounded-lg border border-white/70
          mt-5 first:mt-12'>

            {/* car img+ info */}

            <div className='col-span-1'>
              <div className='overflow-hidden mb-3 rounded-md'>

                <img src={booking.car.image} alt="" className='w-full h-auto aspect-video  object-cover' />

              </div>

              <p className='text-lg font-medium mt-3 text-white'>
                {booking.car.brand}  {booking.car.model}
              </p>
              <p className='text-white/60 pr-4'>
                {booking.car.year}  {booking.car.category} {booking.car.location}
              </p>
            </div>

            {/* Booking info */}

            <div className='md:col-span-2'>

              <div className='flex items-center gap-2'>

                <p className='px-3 py-1.5 bg-white/10 rounded-lg  backdrop-blur-md'>
                  Booking #{index + 1}
                </p>
                <p className={`px-3 py-1 rounded-full ${booking.status === 'confirmed' ? 'bg-green-400/15 text-green-600' :
                  "bg-red-400/15 text-red-600"}`}>
                  {booking.status}
                </p>

              </div>


              <div className='flex items-start mt-2 gap-2'>
                <img src={assets.calendar_icon_colored} alt="" className='w-4 h-4 mt-2 ml-1' />
                <div >
                  <p className='text-white/60 mt-1'>Rental Period</p>
                  <p>
                    {booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]}
                  </p>
                </div>
              </div>

              <div className='flex items-start mt-2 gap-2'>
                <img src={assets.location_icon_colored} alt="" className='w-4 h-4 mt-2 ml-1' />
                <div >
                  <p className='text-white/60 mt-1'>PickUp Loaction</p>
                  <p>
                    {booking.car.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Price */}

            <div className='md:col-span-2 flex flex-col  md:absolute gap-6 md:right-10 md:top-10'>
              <div className='text-sm text-white/80 text-right '>
                <p>Total Price</p>
                <h1 className='font-semibold text-2xl text-blue-500'>
                  {currency} {booking.price}
                </h1>
                <p>
                  Booked On       :{booking.createdAt.split('T')[0]}
                </p>

              </div>

            </div>

          </motion.div>
        ))}
      </motion.div>


    </div>
  )
}
