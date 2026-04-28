import React from 'react'
import { assets,  } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import NavbarButton from './NavbarButton'
import {motion} from 'motion/react'

export default function Navbar() {

      const {  isOwner ,axios  ,setIsOwner}=useAppContext()
    const navigate = useNavigate()


    const changeRole =async ()=>{
        try {
            const {data}= await axios.post('/api/owner/change-role')
            if(data.success){
                setIsOwner(true)
                toast.success(data.message)


            }else{
                toast.error(data.message)
            }
        } catch (error) {
                toast.error(error.message)
            
        }
    }

    return (

        <motion.div 
        initial={{y:-40,opacity:0}}
        animate={{y:0,opacity:1}}
        transition={{duration:0.5,ease:"easeIn"}}
        
        className=' md:bg-linear-to-r from-slate-900 via-gray-900  to-emerald-900   justify-center
         overflow-hidden flex md:justify-between px-10 fixed md:absolute bottom-2 left-0  right-0 z-50
          bg-white/20 backdrop-blur-md w-[80%]  md:w-full md:mx-0 mx-auto  gap-5 border rounded-lg 
           border-gray-900 md:border-none md:rounded-none md:top-0 md:bottom-auto md:border-t-0 md:border-b'>

            <Link to='/'>
                <motion.img whileHover={{scale:1.05}} src={assets.logo} alt="logo" className='h-24  hidden md:block  pl-16' />
            </Link>

            <div className='flex justify-around gap-10 ml-10 md:justify-center md:font-medium md:pt-8  md:pr-14 md:space-x-2 text-white  h-14 md:h-16 items-center'
            >

                <Link to='/' className='hover:text-amber-300 transition-all duration-500'>
                    Home
                </Link>

                <Link to='/cars' className='hover:text-amber-300 transition-all duration-500'>
                    Cars
                </Link>

                <Link to='/my-booking' className='hover:text-amber-300 transition-all duration-500'>
                    My Booking
                </Link>

                <div className='hidden md:flex duration-500 items-center text-sm hover:scale-105 bg-white/70 backdrop-blur-md rounded-full px-3 gap-2  max-w-56 '>
                    <input type="text"
                        className='  w-full py-2 border-none outline-none  text-black pl-2 cursor-pointer  '
                        placeholder='Search cars' />

                    <img src={assets.search_icon} alt="search" />
                </div>

                <div className='gap-2 pr-10 flex'>
                    <button
                        onClick={() =>isOwner? navigate('/owner'): changeRole()}
                        className='cursor-pointer mr-4
                         hover:text-amber-300 hidden md:block transition-all duration-500'
                         >{isOwner ?'Dashboard' : 'List Cars'}</button>

                   <NavbarButton> <button
                       
                       ></button></NavbarButton>
                </div>

            </div>

        </motion.div>
    )
}
