import React from 'react'
import { motion } from 'motion/react'

export default function Title({title , subtitle}) {
  return (
    <motion.div
    initial={{x:-120,opacity:0,scale:0.8}}
      whileInView={{x:0,opacity:1,scale:1}}
      transition={{duration:0.8,ease:"easeOut",delay:0.2}} 
      viewport={{once:true,amount:0.3}}
    >

        <h1 className='font-semibold text-3xl text-white/90'>
            {title}
        </h1>
        <p className='text-sm md:text-base text-white/50 mt-6 max-w-156'>
            {subtitle}
        </p>

    </motion.div>
  )
}
