import React, { useState } from 'react'
import { assets, cityList } from '../assets/assets'
import Button from './Button'
import { useAppContext } from '../context/AppContext'
import {motion} from 'motion/react'

export default function Hero() {

    const { pickupDate, setPickupDate, returnDate, setReturnDate, navigate } = useAppContext()

    const [pickuplocation, setPickuplocation] = useState('')
const handlesubmit = (e) => {
  e.preventDefault()

  if (!pickuplocation || !pickupDate || !returnDate) {
    alert("Please fill all fields")
    return
  }

  if (returnDate < pickupDate) {
    alert("Return date cannot be before pickup date")
    return
  }

  navigate(
    `/cars?pickuplocation=${encodeURIComponent(pickuplocation)}&pickupDate=${pickupDate}&returnDate=${returnDate}`
  )
}

    return (
        <motion.div 
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.8,delay:0.2}}
        
        className='h-screen flex relative items-center mx-auto justify-between gap-14
         bg-linear-to-r  from-slate-900 via-gray-900  to-emerald-900 text-center overflow-hidden'>

            

            <div className='flex flex-col  md:pl-38  pl-10 '>

                <div 
                initial={{y:50,opacity:0}}
        animate={{y:0,opacity:1}}
        transition={{duration:0.8,delay:0.2}} className='md:hidden flex justify-center items-center h-12 absolute top-32 ml-8'>
                    <img src={assets.logo} alt="logo" />
                </div>

                <motion.h1
                   initial={{translateX:-200,opacity:0}}
                   animate={{translateX:0,opacity:1}}
                   whileInView={{x:0,opacity:1}}
                   transition={{duration:0.6}} 
                   
                className='text-4xl md:text-5xl  font-semibold max-w-56 mb-8 transition duration-300 md:max-w-full text-white'>Luxury Cars On Rent</motion.h1>


                <motion.form 
                   initial={{x:-200,opacity:0,scale:0.95}}
                   animate={{x:0,opacity:1,scale:1}}
                    whileInView={{x:0,opacity:1}}
                    transition={{duration:0.8,delay:0.4}}
                onSubmit={handlesubmit} className='flex flex-col md:flex-row items-start z-50 md:z-0 md:items-center justify-between
                p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200  bg-white/40 md: backdrop-blur-2xl shadow-[0px_8px_20px_rgba(0,0,0,0.1)]' >

                    <div className='flex flex-col md:flex-row items-start md:items-center gap-10 md:ml-8'>

                        <div className='flex flex-col items-start gap-2'>
                            <select required value={pickuplocation} onChange={(e) => setPickuplocation(e.target.value)}>
                                <option value="" className='text-md text-white'>PickUp Location</option>
                                {cityList.map((city) => <option key={city} value={city}>{city}</option>
                                )}
                            </select>
                            <p className='px-1 text-sm text-white'>{pickuplocation ? pickuplocation : 'Please Select Location'}</p>

                        </div>


                        <div className='flex flex-col items-start gap-2'>

                            <label htmlFor="pickup-date">Pick-Up Date</label>
                            <input value={pickupDate} onChange={e => setPickupDate(e.target.value)} type="date" id="pickup-date" min={new Date().toISOString().split('T')[0]}
                                className='text-sm text-white' />

                        </div>
                        <div className='flex flex-col items-start gap-2'>

                            <label htmlFor="return-date">Return Date</label>
                            <input 
                                 className='text-sm text-white'
                                value={returnDate}
                                onChange={e => setReturnDate(e.target.value)}
                                type="date"
                                id="return-date"
                                min={pickupDate || new Date().toISOString().split('T')[0]}
                            />


                        </div>

                        <Button>
                            <img src={assets.search_icon} alt="search" className='brightness-300 text-2xl ' />
                            Search </Button>
                    </div>
                </motion.form>




            </div>


            <div>
               
                <motion.img
                  initial={{x:200,opacity:0,scale:0.95}}
                 animate={{x:0,opacity:1,scale:1}}
                  transition={{duration:0.8}}
                 src={assets.side_car} alt="" className='max-h-100  md:block pr-20 scale-105 hover:scale-110 mt-10 duration-500' />
            </div>

        </motion.div>
    )
}
