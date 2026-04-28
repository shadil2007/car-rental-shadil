import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { assets, dummyUserData, ownerMenuLinks } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'motion/react';

export default function Sidebar() {

 const {user,axios,fetchUser}=useAppContext()
  const location =useLocation();
  const [image,setImage]=useState('');

  const updateImage = async () => {
  if (!image) return toast.error("Please select an image")

  try {
    const formData = new FormData()
    formData.append('image', image)

    const { data } = await axios.post('/api/owner/update-image', formData)

    if (data.success) {
      fetchUser()
      toast.success(data.message)
      setImage('')
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message)
  }
}

  return (
    <div className='relative min-h-screen md:flex  md:flex-col items-center border-r  ml-10 pt-8 max-w-16 md:max-w-60 w-full  
    text-sm '>

      <div className='relative group md:mr-12'>
        <label htmlFor="image">
          <img src={image ? URL.createObjectURL(image): user?.image || assets.user_profile} alt="" 
           className='rounded-full h-11 md:h-20 object-cover
          w-12 md:w-20 mx-auto '/>
          <input type="file"  id="image"  accept='image/*' hidden onChange={e=>setImage(e.target.files[0])}/>
        <div className='absolute right-0 bottom-0 left-0 top-0 hidden rounded-full bg-black/10 group-hover:flex items-center 
      justify-center cursor-pointer'> 

      <img src={assets.edit_icon} alt="" />

      </div>  
      
      
      </label>

      </div>

      {image && (
        <button className='absolute top-0 right-0 cursor-pointer flex p-2 m-2 rounded-lg gap-1 bg-white/10 text-white'onClick={updateImage}>Save 
        <img src={assets.check_icon} width={12} alt="" /></button>
      )}

      <p className='mt-2 text-white max-md:hidden mr-12'>
        {user?.name}
      </p>

      <motion.div
      initial={{x:-80,opacity:0}}
        animate={{x:0,opacity:1}}
        transition={{duration:0.5,ease:"easeOut"}}
        
      className='w-full md:mt-12 md:mr-10'>
        {ownerMenuLinks.map((link,index)=>(

          <NavLink
        
        
           key={index } to={link.path} className={` flex items-center gap-2  text-white relative w-full py-4 back
          drop-blur-lg  pl-3 first:mt-6
           ${link.path === location.pathname ? 'bg-white/40 backdrop-blur-lg' :'bg-transparent backdrop-blur-lg'}`}>
            <img src={link.path === location.pathname ? link.coloredIcon : link.icon} alt=" carIcon" />
            <span className='max-md:hidden'>
              {link.name}
            </span>

            <div className={`${link.path === location.pathname && "bg-blue-600 "} w-1.5 h-8 rounded-l-lg right-0 absolute`}>

            </div>
          </NavLink>

        ))}
      </motion.div>

      

    </div>
  )
}
