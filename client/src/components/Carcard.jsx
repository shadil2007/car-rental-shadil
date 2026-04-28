import React from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

export default function Carcard({car}) {
   
        const currency = import.meta.env.VITE_CURRENCY;
        const navigate = useNavigate();

  return (
    <div onClick={()=>{navigate(`/car-details/${car._id}`); scrollTo(0,0)}} 
    className='  group rounded-xl overflow-hidden shadow-lg hover:-translate-1
    cursor-pointer transition-all duration-300 bg-white/10 backdrop-blur-md'>


        <div className='h-48 overflow-hidden relative'>

            <img src={car.image} alt="Car image" className='w-full h-full object-cover transition-transform duration-500
            group-hover:scale-105' />

            {car.isAvaliable && <p className='absolute top-4 left-4 text-white text-xs bg-emerald-500
            px-2.5 py-1 rounded-full'>Available</p>}

            <div className='absolute right-4 bottom-4 bg-white/40 backdrop-blur-lg text-white
            px-1 py- rounded-2xl'>
                <span className='font-semibold text-xs'>
                   {currency} {car.pricePerDay}
                </span>
                <span className='text-xs text-white'> /Day </span>

            </div>


        </div>

         <div className='p-5 md:p-4'>

            <div className='flex flex-col justify-between items-start mb-2 text-white'>

                <div>
                    <h3 className='font-semibold text-lg'>
                        {car.brand} {car.model}
                    </h3>
                    <p className='text-sm text-muted-foreground'> 
                        {car.category}  {car.year}
                    </p>
                </div>

            </div>

            <div className='mt-4 grid grid-cols-2 gap-y-2 text-white '>
                <div className='flex items-center text-sm text-muted-foreground'>
                    <img src={assets.users_icon} alt="usericon" className='h-4 mr-2'/>
                    <span>{car.seating_capacity} Seats</span>
                </div>
                <div className='flex items-center text-sm text-muted-foreground'>
                    <img src={assets.fuel_icon} alt="usericon" className='h-4 mr-2'/>
                    <span>{car.fuel_type}</span>
                </div>
                <div className='flex items-center text-sm text-muted-foreground'>
                    <img src={assets.car_icon} alt="usericon" className='h-4 mr-2'/>
                    <span>{car.transmission} </span>
                </div>
                <div className='flex items-center text-sm text-muted-foreground'>
                    <img src={assets.location_icon} alt="usericon" className='h-4 mr-2'/>
                    <span>{car.location} </span>
                </div>

            </div>


         </div>

    </div>
  )
}
