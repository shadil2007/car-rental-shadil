import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';

export default function MAnageCars() {


  const {isOwner, axios,currency}=useAppContext()


   const [cars,setCars]=useState([])


   const fetchcardetails = async ()=>{
    try {
      const {data}= await axios.get('/api/owner/cars')
      if(data.success){
        setCars(data.cars)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
    }
    
   }

   const toggleAvailablility = async (carId)=>{
    try {
      const {data}= await axios.post('/api/owner/toggle-car', { car_id: carId });
      if(data.success){
         toast.success(data.message)
         fetchcardetails()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
    }
    
   }
   const deleteCar = async (carId)=>{
    try {

     const confirm = window.confirm('Are you sure you want to delete this car ?')

     if(!confirm) return null

      const {data}= await axios.post('/api/owner/delete-car',{ car_id: carId })
      if(data.success){
         toast.success(data.message)
         fetchcardetails()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
    }
    
   }


   useEffect(()=>{
   isOwner && fetchcardetails()
   },[isOwner])

     




  return (
    <div className='px-4 md:px-10 pt-14 w-full overflow-hidden'>

      <Title title="Manage Cars" subtitle="View All Listed Cars, Update their details , or remove from booking platform." />

      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-slate-300 mt-6'>
             
            <table className='w-full border-collapse text-left text-sm text-white'>
              <thead>
                <tr>
                  <th className='font-medium p-3'>Cars</th>
                  <th className='font-medium p-3 max-md:hidden'>Category</th>
                  <th className='font-medium p-3'>Price /day</th>
                  <th className='font-medium p-3 max-md:hidden'>Status</th>
                  <th className='font-medium p-3'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car,index)=>(
                  <motion.tr 
                  initial={{x:-120,opacity:0,scale:0.8}}
                  whileInView={{x:0,opacity:1,scale:1}}
                   transition={{duration:0.8,ease:"easeOut",delay:index*0.2}} 
                   viewport={{once:true,amount:0.3}}
                  key={index} className='border-t border-slate-500'>

                    <td className='p-3 items-center flex gap-3'>
                      <img src={car.image} alt="" className='w-12 h-12 aspect-square object-cover rounded-md'/>


                      <div className='max-md:hidden'>
                        <p className='text-white/90 font-medium'>
                          {car.brand} {car.model}
                        </p>
                        <p className='text-xs text-white/70'>
                          {car.seating_capacity} {car.transmission}
                        </p>

                      </div>

                    </td>

                    <td className='p-3 max-md:hidden'>
                      {car.category}
                    </td>
                    <td className='p-3 text-blue-500 font-medium'>
                    {currency}  {car.pricePerDay}
                    </td>

                    <td className='p-3 max-md:hidden'>

                      <span className={`px-3 py-1 rounded-full text-xs ${car.isAvaliable  ? 'bg-green-400/15 text-green-600' :
                  "bg-red-400/15 text-red-600"}`}>
                        {car.isAvaliable ? "Available" : "Unavailable"}
                      </span>

                    </td>

                    <td className='flex items-center p-3 gap-3'>

                      <img onClick={()=>toggleAvailablility(car._id)} src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon} alt="" className='bg-white/70 w-fit  rounded-full cursor-pointer active:scale-95'/>


                      <img onClick={()=>deleteCar(car._id)} src={assets.delete_icon} alt="" className='bg-red-400 w-fit  rounded-full cursor-pointer active:scale-95'/>

                    </td>
                    

                  </motion.tr>
                ))}
              </tbody>

            </table>

      </div>

    </div>
  )
}
