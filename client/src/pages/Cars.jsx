import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import Carcard from '../components/Carcard'
import { assets,  } from '../assets/assets'
import { useSearchParams } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

export default function Cars() {

   const {axios,cars}=useAppContext()
  const [input , setInput]=useState('');
   const [searchParams]=useSearchParams();

   const pickuplocation =searchParams.get('pickuplocation')
   const pickupDate =searchParams.get('pickupDate')
   const returnDate =searchParams.get('returnDate')

   const isSearchData= pickupDate && pickuplocation && returnDate
   const [filterCar,setFilterCar]=useState([])

   const applyFilter =async()=>{
    if(input === ''){
      setFilterCar(cars)
      return null
    }

    const filtered =cars.slice().filter((car)=>{
      return car.brand.toLowerCase().includes(input.toLowerCase()) ||
      car.model.toLowerCase().includes(input.toLowerCase()) ||
      car.category.toLowerCase().includes(input.toLowerCase()) ||
      car.transmission.toLowerCase().includes(input.toLowerCase()) 
    })
    setFilterCar(filtered)
   }


   const searchCarAvailability = async ()=>{
     const {data}= await axios.post('/api/bookings/check-availability',{pickupDate,returnDate, pickuplocation})

     console.log("API RESPONSE:", data);

     if(data.success){
     setFilterCar(data.availableCar)
     if(data.availableCar.length === 0){
      toast.error('No cars available !')
     }
     return null
     }
   }

   useEffect(() => {
  if (isSearchData) {
    searchCarAvailability()
  }
}, [pickupDate, returnDate, pickuplocation])


useEffect(()=>{
  cars.length>0 && !isSearchData &&applyFilter()
},[input,cars])
      

       

  return (
    <motion.div 
    
    className='bg-linear-to-r relative  from-slate-900
     via-gray-900  to-emerald-900 pt-24'>

      <motion.div 
      initial={{opacity:0,y:40}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.6,ease:"easeIn"}}
      className='flex items-center flex-col md:py-20 py-10 backdrop-blur-xl  max-md:px-4 text-center'>
        <Title title="Available Cars" subTitle="Browse our collection of premium vehicles available for your next adventure"/>

        <motion.div
        initial={{opacity:0,y:20}}
      animate={{opacity:1,y:0}}
      transition={{duration:0.6,delay:0.3}}
         className='flex items-center justify-between px-4 mt-6  bg-white/80 max-w-140 w-full h-12 rounded-full shadow'>

        <img src={assets.search_icon} alt=""  className='w-4.5 h-4.5 mr-2'/>

        <input onChange={(e)=>setInput(e.target.value)}
        value={input}
         type="text"
          placeholder='Search By brand , Model or Features'
        className='w-full text-gray-700 outline-none border-none h-full ml-2' />

        <img src={assets.filter_icon} alt=""  className='w-4.5 h-4.5 ml-2'/>

        </motion.div>

      </motion.div>


      <motion.div 
       initial={{y:40,opacity:0}}
                        whileInView={{y:0,opacity:1}}
                        transition={{duration:1,delay: 0.5,ease:"easeOut"}}
                        
      className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>

        <p className='text-white xl:px-20 mx-auto max-w-7xl'>
  { `Showing ${filterCar.length} Cars`}
</p>
        <motion.div 
         
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 max-w-7xl xl:px-20 mx-auto pb-14'>

          {filterCar.map((car,index)=>(
            <motion.div 
            initial={{y:40,opacity:0}}
                        whileInView={{y:0,opacity:1}}
                        transition={{duration:1,delay:index * 0.5,ease:"easeOut"}}
                        viewport={{once:true,amount:0.3}}
            key={index} className=''>
              <Carcard car={car} />
            </motion.div>
          ))}

        </motion.div>

      </motion.div>


    </motion.div>
  )
}
