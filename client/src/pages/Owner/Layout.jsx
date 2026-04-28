import React, { useEffect } from 'react'
import OwnerNavbar from '../../components/owner/OwnerNavbar'
import Sidebar from '../../components/owner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

export default function Layout() {

  const {isOwner,navigate}=useAppContext()


  useEffect(()=>{
    if(!isOwner){
      navigate('/')
    }
  },[isOwner])


  return (
    <div className='flex flex-col bg-linear-to-t from-[#020617] via-[#0F172A] to-[#020617]'>
      <OwnerNavbar/>

      <div className='flex'>

        <Sidebar/>
         <Outlet/>
      </div>

    </div>
  )
}
