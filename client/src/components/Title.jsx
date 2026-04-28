import React from 'react'
import { motion } from 'motion/react'

export default function Title({title ,subTitle , align}) {
  return (
    <motion.div 
      initial={{y:20,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{duration:1,delay:0.5}}
    className={`flex flex-col items-center justify-center text-center 
       ${align === "left" && "md:items-start  md:text-left"}`}>

        <h1 className='font-semibold text-4xl md:text-[40px] mb-4 text-white'>
            {title}
        </h1>

        <p className='text-sm md:text-base mt-2 max-w-156 text-white'>
            {subTitle}
        </p>

    </motion.div>
  )
}
