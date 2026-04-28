import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import {motion} from 'motion/react'

export default function Cardetails() {

    const {id}=useParams();
    const {axios ,navigate, cars,pickupDate,setPickupDate,returnDate,setReturnDate}= useAppContext()
   

    const [car,setCar]=useState(null);

     const currency = import.meta.env.VITE_CURRENCY;



     const handlesubmit= async (e)=>{
      e.preventDefault()
     try {
      if (new Date(returnDate) <= new Date(pickupDate)) {
  toast.error("Return date must be after pickup date");
  return;
}
      const {data}= await axios.post('/api/bookings/create',{
      car:id,
      pickupDate,
      returnDate
     }) 
     if (data.success) {
  toast.success(data.message)

  setTimeout(() => {
    navigate('/my-booking')
  }, 300)   // 300–500ms is enough
}else{
           toast.error(data.message)
     }
     } catch (error) {
       toast.error(error.message)
     }
     }


   useEffect(() => {
  if (cars.length > 0) {
    const foundCar = cars.find(car => car._id.toString() === id);
    setCar(foundCar);
  }
}, [id, cars]);




  return  car ? (
    <div className='px-6 sm:px-16 lg:px-24 xl:px-32 pt-24 bg-linear-to-r relative  from-slate-900
     via-gray-900  to-emerald-900'>

      <motion.div
       initial={{x:-140,opacity:0,scale:0.95}}
                        whileInView={{x:0,opacity:1,scale:1}}
                        transition={{duration:1,ease:"easeOut"}}
                        viewport={{once:true,amount:0.3}}
       className=' mb-10 pt-10'>
        
    <button  onClick={()=>{navigate(-1);scrollTo(0,10)}} className='flex items-center gap-2  
      cursor-pointer
     bg-white/40 hover:bg-white/30 duration-500 hover:-translate-1 backdrop-blur-lg  
     px-4 py-2 rounded-full text-white'>
      <img src={assets.arrow_icon} alt="arrow_icon" className='rotate-180 opacity-60' />

      Back To All Cars
    </button>
      </motion.div>

    <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-12 gap-8'>

      {/* Left image side */}

      <motion.div 
      initial={{x:-140,opacity:0,scale:0.95}}
                        whileInView={{x:0,opacity:1,scale:1}}
                        transition={{duration:1,ease:"easeOut"}}
                        viewport={{once:true,amount:0.3}}
      className='lg:col-span-2 '>

        <img src={car.image} alt="car" className='md:w-full h-auto md:h-120   object-cover rounded-xl mb-6 shadow-md ' />


        <div className='space-y-6'>

          <div className=''>

                   <h1 className='text-3xl font-bold text-white'>
                    {car.brand}     {car.model}
                   </h1>
                   <p className='text-lg text-white/70'>
                    {car.category}  {car.year}
                   </p>


           {/* <div className='bg-white/40 backdrop-blur-lg w-fit px-12 py-2  rounded-lg'>
               
            <h2 className='text-xs text-gray-900'> Car Brand</h2>
            
            <h1 className='text-sm text-white '>
              {car.brand} 
            </h1>
           </div>

            <div className='bg-white/40 backdrop-blur-lg max-w-fit px-14 py-2  rounded-lg'>
              <h2  className='text-xs text-gray-900'>Model</h2>
              
            <h1 className='text-sm text-white '>
              {car.model} 
            </h1>
            </div>

            <div className='bg-white/40 backdrop-blur-lg w-fit px-12 py-2  rounded-lg'>
              <h2 className='text-xs text-gray-900'>Category</h2>
              <h1 className='text-sm text-white '>
              {car.category} 
            </h1>
            </div>
          
          <div className='bg-white/40 backdrop-blur-lg w-fit px-14 py-2  rounded-lg'>

          <h2 className='text-xs text-gray-900'>Year</h2>
            
            <h1 className='text-white text-sm '>
              {car.year}
            </h1>
          </div> */}
          </div>

          <hr className='border border-neutral-500 my-6'/>


          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {
                [
                  {icon : assets.users_icon , text : `${car.seating_capacity} seats` },
                  {icon : assets.fuel_icon , text : `${car.fuel_type}`},
                  {icon : assets.car_icon , text : `${car.transmission}`},
                  {icon : assets.location_icon , text : `${car.location}`},
                ].map(({icon , text})=>(

                  <div key={text} className='flex flex-col items-center mx-10 md:mx-0 px-6 py-1 border border-neutral-500 
                  rounded-lg bg-linear-to-l from-black
                 via-gray-700 to-black '>

                    <img src={icon} alt="icon" className='h-5 mb-1 text-white' />
                    <h1 className='text-white'>{text}</h1> 

                  </div>
                ))}


          </div>

          {/* description */}

          <div className='text-white/90'>
            <h1 className='text-xl font-medium mb-3'>
              Description
            </h1>
            <p>
              {car.description}
            </p>
          </div>

          {/* Features */}

          <div className='text-white/90 mb-8'>
            <h1 className='text-xl font-medium mb-3'>Features</h1>
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'> 
              {
                ["360 camera", "Bluetooth" , "heated seats","4 airbags"

                ].map((item)=>(
                  <li key={item} className='flex items-center'>
                    <img src={assets.check_icon} alt="check_icon" className='h-4 mr-2' />{item}
                  </li>
                ))

              }

            </ul>
          </div>



        </div>

      </motion.div>
 
       {/* Booking form */}

       <motion.form
        initial={{x:140,opacity:0,scale:0.95}}
                        whileInView={{x:0,opacity:1,scale:1}}
                        transition={{duration:1,ease:"easeOut"}}
                        viewport={{once:true,amount:0.3}}
        onSubmit={handlesubmit} className='shadow-lg sticky mb-10 md:mb-0 top-18 h-max rounded-xl p-6 space-y-6 bg-white/50 backdrop-blur-lg'>

        <p className='flex items-center justify-between text-gray-800 font-semibold text-2xl'>
          {currency} {car.pricePerDay}<span className='text-base font-normal'> Per Day</span>
          
        </p>

        <hr className='border border-neutral-800 my-6'/>

        <div className='flex flex-col gap-2'>
          <label htmlFor="Pick-up Date">PickUp Date</label>
          <input value={pickupDate} onChange={(e)=>setPickupDate(e.target.value)}
          type="date" className='px-3 py-2 rounded-lg border border-white' 
          required id='Pick-up Date' min={new Date().toISOString().split('T')[0]}/>

        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor="return Date">Return Date</label>
          <input value={returnDate} onChange={(e)=>setReturnDate(e.target.value)}
          type="date" className='px-3 py-2 rounded-lg border border-white' 
          required id='return Date' min={new Date().toISOString().split('T')[0]}/>

        </div>

        <button className='w-full mx-auto cursor-pointer text-white rounded-xl  py-3 bg-linear-to-tr from-[#2e2c2c]
                 via-[#4f4c4c] to-black hover:scale-105 duration-300 '>Book Now</button>


                 <p className='text-sm  text-center'>No Credit Card Required To Reserve</p>

       </motion.form>

    </div>

 

    </div>
  ) : <Loader/>
}
