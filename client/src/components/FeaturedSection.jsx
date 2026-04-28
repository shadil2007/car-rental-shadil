import React from 'react'
import Title from './Title'
import { assets, dummyCarData } from '../assets/assets'
import Carcard from './Carcard'
import { useNavigate } from 'react-router-dom'
import ExploreCars from './ExploreCars'
import { useAppContext } from '../context/AppContext'
import { motion } from 'motion/react'

export default function FeaturedSection() {

     const navigate=useNavigate()
     const {cars}=useAppContext()

     const exploreOnclick=()=>{
      navigate('/cars')
      scrollTo(0,0)
     }

  return (
    <motion.div 
        initial={{y:50,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{duration:1,ease:"easeOut"}}
    className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32 
     bg-linear-to-r  from-slate-900 via-gray-900  to-emerald-900'>


       <motion.div
         initial={{y:20,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{duration:1,delay:0.5}}
       >
          <Title title='Featured Vehicles' subTitle='Explore Our Selection Of Premiun Vehicles
          Available For Your Next adventure'/>
       </motion.div>


       <motion.div 
         initial={{y:200,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{duration:1,delay:0.5}}
       className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-16 gap-8 mb-8'>

       {
        cars.slice(0,6).map((car)=>(

           <motion.div key={car._id}
             initial={{y:50,scale:0.8}}
            whileInView={{y:0,scale:1}}
            transition={{duration:0.4,ease:"easeOut",delay: car._id * 0.5}}
            viewport={{once:true,amount:0.3}}
           >
                      <Carcard car={car}/>
             
           </motion.div>
        ))
       }

       </motion.div>


       <ExploreCars  >
         <motion.button
        
          className='cursor-pointer' onClick={exploreOnclick}></motion.button>
       </ExploreCars>


    </motion.div>
  )
}
