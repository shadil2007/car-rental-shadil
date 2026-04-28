import React, { useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

export default function Addcar() {

  const {axios}= useAppContext()

  const [image, setImage] = useState(null)
  const [car, setCar] = useState({
    model: '',
    brand: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 0,
    location: '',
    description: '',

  })

                            

 const [isloading,setIsloading]=useState(false)
  const onSumitHandler = async (e) => {
     e.preventDefault() 
     if(isloading) return null


     setIsloading(true)

     try {
      const formData= new FormData()
      formData.append('image',image)
      formData.append('carData',JSON.stringify(car))


      const {data}= await axios.post('/api/owner/add-car',formData)

      if(data.success){
        toast.success(data.message)
        setImage(null)
        setCar({
             model: '',
             brand: '',
             year: 0,
             pricePerDay: 0,
             category: '',
             transmission: '',
             fuel_type: '',
             seating_capacity: 0,
             location: '',
             description: '',
        })


         
      }else{
        toast.error(data.message)
      }
       
     } catch (error) {
       toast.error(error.message)
     }finally{
      setIsloading(false)
     }

    }


  return (
    <div className='px-6 py-10 md:px-10 flex-1'>

      <Title title="Add New Car" subtitle="Fill in Details to list Your car For Booking, including pricing, availibility and car specification." />


      <form 
      
      onSubmit={onSumitHandler} className='flex flex-col gap-6 text-sm text-white/80 max-w-xl mt-6'>

        {/* car image  */}

        <motion.div 
       initial={{x:-120,opacity:0,scale:0.8}}
      whileInView={{x:0,opacity:1,scale:1}}
      transition={{duration:0.8,ease:"easeOut",delay:0.2}} 
      viewport={{once:true,amount:0.3}}
        className='flex items-center gap-2 w-full'>
          <label htmlFor="car-image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="" className='h-14 rounded active:scale-95 cursor-pointer' />
            <input type="file" hidden id="car-image" accept='image/*' onChange={e => setImage(e.target.files[0])} />
          </label>
          <p className='text sm text-white/70 ml-4'>Upload Image Of Your Car</p>
        </motion.div>

        {/* car model and brand */}

        <motion.div 
        initial={{x:-120,opacity:0,scale:0.8}}
      whileInView={{x:0,opacity:1,scale:1}}
      transition={{duration:0.8,ease:"easeOut",delay:0.2}} 
      viewport={{once:true,amount:0.3}}
        className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
            <label >Brand</label>
            <input type="text" placeholder=' eg : BMW, Mercedes , Audi..' required
              className='px-3 py-2 mt-1 border border-white/60 rounded-lg outline-none' value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })} />
          </div>

          <div className='flex flex-col w-full'>
            <label >Model</label>
            <input type="text" placeholder=' eg : M5 , Maybach ,A4 ...' required
              className='px-3 py-2 mt-1 border border-white/60 rounded-lg outline-none' value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })} />

          </div>

        </motion.div>

        {/* car price year category */}

        <motion.div 
        initial={{x:-120,opacity:0,scale:0.8}}
      whileInView={{x:0,opacity:1,scale:1}}
      transition={{duration:0.8,ease:"easeOut",delay:0.2}} 
      viewport={{once:true,amount:0.3}}
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>

          <div className='flex flex-col w-full'>
            <label >Year</label>
            <input type="number" placeholder=' eg : 2000, 2010, 2020 ...' required
              className='px-3 py-2 mt-1 border border-white/60 rounded-lg outline-none' value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })} />

          </div>

          <div className='flex flex-col w-full'>
            <label >Price/Day</label>
            <input type="number" placeholder=' Daily Price' required
              className='px-3 py-2 mt-1 border border-white/60 rounded-lg outline-none' value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })} />

          </div>

          <div className='flex flex-col w-full'>
            <label >Category</label>
            <select value={car.category} onChange={(e) => setCar({ ...car, category: e.target.value })} className='px-3 py-2 mt-1 border border-white/60 rounded-lg outline-none'>
              <option className='text-black' value="">Select Category</option>
              <option className='text-black' value="Sedan">Sedan</option>
              <option className='text-black' value="SUV">SUV</option>
              <option className='text-black' value="Van">Van</option>
            </select>
          </div>

        </motion.div>


        {/* car transmittion , fuel type , seating capacity */}

        <motion.div 
        initial={{x:-120,opacity:0,scale:0.8}}
      whileInView={{x:0,opacity:1,scale:1}}
      transition={{duration:0.8,ease:"easeOut",delay:0.2}} 
      viewport={{once:true,amount:0.3}}
        className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>

          <div className='flex flex-col w-full'>
            <label >Transmision</label>
            <select value={car.transmission} onChange={(e) => setCar({ ...car, transmission: e.target.value })} className='px-3 py-2 mt-1 border border-white/60 rounded-lg outline-none'>
              <option className='text-black' value="">Transmision  type</option>
              <option className='text-black' value="Automatic">Automatic</option>
              <option className='text-black' value="Manual">Manual</option>
              <option className='text-black' value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>

          <div className='flex flex-col w-full'>
            <label >Fuel Type</label>
            <select value={car.fuel_type} onChange={(e) => setCar({ ...car, fuel_type: e.target.value })} className='px-3 py-2 mt-1 border border-white/60 rounded-lg outline-none'>
              <option className='text-black' value="">Select Fuel type</option>
              <option className='text-black' value="Petrol">Petrol</option>
              <option className='text-black' value="Diesel">Diesel</option>
              <option className='text-black' value="Hybrid">Hybrid</option>
              <option className='text-black' value="Electric">Electric</option>
            </select>
          </div>


          <div className='flex flex-col w-full'>
            <label >Seating Capacity</label>
            <input type="number" placeholder=' Number Of Seats' required
              className='px-3 py-2 mt-1 border border-white/60 rounded-lg outline-none' value={car.seating_capacity}
              onChange={(e) => setCar({ ...car, seating_capacity: e.target.value })} />

          </div>


        </motion.div>

        {/* car location */}

        <motion.div 
        initial={{x:-120,opacity:0,scale:0.8}}
      whileInView={{x:0,opacity:1,scale:1}}
      transition={{duration:0.8,ease:"easeOut",delay:0.2}} 
      viewport={{once:true,amount:0.3}}
        className='flex flex-col w-full'>
          <label >Location</label>
          <select value={car.location} onChange={(e) => setCar({ ...car, location: e.target.value })} className='px-3 py-2 mt-1 border border-white/60 rounded-lg outline-none'>
            <option className='text-black' value="">select a location</option>
            <option className='text-black' value="kottakal">kottakal</option>
            <option className='text-black' value="malappuram">malappuram</option>
            <option className='text-black' value="wayanad">wayanad</option>
            <option className='text-black' value="calicut">calicut</option>
            <option className='text-black' value="kondotti">kondotti</option>
            <option className='text-black' value="koduvally">koduvally</option>
            <option className='text-black' value="thamarassery">thamarassery</option>
          </select>
        </motion.div>

        {/* car Description */}


        <motion.div 
        initial={{x:-120,opacity:0,scale:0.8}}
      whileInView={{x:0,opacity:1,scale:1}}
      transition={{duration:0.8,ease:"easeOut",delay:0.2}} 
      viewport={{once:true,amount:0.3}}
        className='flex flex-col w-full'>
          <label >Description</label>
          <textarea rows={5} placeholder=' Enter Car Description' required
            className='px-3 py-2 mt-1 border border-white/60 rounded-lg outline-none' value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}></textarea>

        </motion.div>


        <motion.div 
        initial={{x:-20,opacity:0,}}
      whileInView={{x:0,opacity:1,}}
      transition={{duration:0.8,ease:"easeOut",}} 
      viewport={{once:true,amount:0.3}}
        className="relative group overflow-hidden bg-white/20 p-0.5 h-9 w-fit rounded-md active:scale-100 hover:scale-105 transition-all duration-300">
            <button className="text-white text-sm bg-linear-to-t px-7 from-black/50 to-black h-full w-full rounded">
              { isloading ?'Loading...': 'List your car'}
            </button>
            <div className="absolute -bottom-12 group-hover:-bottom-10 transition-all duration-200 left-1/2 -z-10 -translate-x-1/2 blur size-14 rounded-full bg-white"></div>
        </motion.div>

      </form>

    </div>
  )
}
