import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { motion } from 'motion/react';

export default function OwnerNavbar() {

    const {user}=useAppContext();

  return (
    <motion.div 
    initial={{y:-40,opacity:0}}
        animate={{y:0,opacity:1}}
        transition={{duration:0.5}}
        
    className='flex justify-between px-6 md:px-10 items-center border-b border-neutral-500 text-white  
    relative transition-all '>


        <Link to='/'> 
        <img src={assets.logo} alt=""  className='h-22 ml-14 w-21'/>
        </Link>
        <p>Welcome { user?.name || "owner " } ! </p>



    </motion.div>
  )
}
