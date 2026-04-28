import React from 'react'
import { assets } from '../assets/assets'
import BannerButton from './BannerButton'
import {motion} from 'motion/react'

export default function Banner() {
  return (

    <motion.div 
          initial={{y:80,opacity:0}}
          whileInView={{y:0,opacity:1}}
          transition={{duration:0.6}}
          viewport={{once:true,amount:0.3}}
    className='flex flex-col md:flex-row md:items-center items-center mt-10 
    justify-between px-8 md:pl-18 pt-10 bg-white/20 backdrop-blur-lg max-w-6xl
    mx-10 rounded-lg md:mx-auto overflow-hidden'>

         <motion.div
          initial={{x:-150,opacity:0}}
          whileInView={{x:0,opacity:1}}
          transition={{duration:1,delay:0.6}}
          viewport={{once:true,amount:0.3}}
          className=' '>
            <h2 className='font-medium text-3xl text-white'>Do You Own A Luxury Car ?</h2>
            <p className='mt-2 text-white/90 font-medium'>Monetise Your car By Listing It On CarRental</p>
            <p className='max-w-120 mt-3 mb-6 text-white/90'>We take care of insurance, driver verification and payments--
                So you can earn passive income - stress free
            </p>

           <BannerButton   />

           
        

         </motion.div>


         <motion.img 
           initial={{x:150,opacity:0}}
          whileInView={{x:0,opacity:1}}
          transition={{duration:1,ease:"easeIn"}}
          
         src={assets.banner_car_image} alt="car"  className='h-40 md:h-62  hover:scale-105 duration-700 mb-6 md:mt-0'/>


          <button className='px-6 py-2  bg-linear-to-tr from-[#2e2c2c]
           via-[#4f4c4c] to-black mt-8 text-black hover:scale-105  duration-500 hover:bg-amber-200 rounded-lg 
           cursor-pointer transition-all text-sm md:hidden max-w-40 mb-3'>List Your Car </button> 



    </motion.div>
  )
}
