import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Cardetails from './pages/Cardetails'
import Cars from './pages/Cars'
import Mybooking from './pages/Mybooking'
import Footer from './components/Footer'
import Layout from './pages/Owner/Layout'
import Dashboard from './pages/Owner/Dashboard'
import Addcar from './pages/Owner/Addcar'
import MAnageCars from './pages/Owner/MAnageCars'
import ManageBooking from './pages/Owner/ManageBooking'
import Login from './components/Login'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

export default function App() {

  const {showLogin}=useAppContext()
  const isOwner = useLocation().pathname.startsWith('/owner')

  return (
    <>

    <Toaster/>

      {showLogin && <Login />}

       {!isOwner && <Navbar />}


     <Routes>
          
      <Route path='/' element={<Home/>}/>
      <Route path='/car-details/:id' element={<Cardetails/>}/>
      <Route path='/cars' element={<Cars/>}/>
      <Route path='/my-booking' element={<Mybooking/>}/>

      <Route path='/owner' element={<Layout/>} >

      <Route index element={<Dashboard/>} />
      <Route path='add-car' element={<Addcar/>} />
      <Route path='manage-cars' element={<MAnageCars/>} />
      <Route path='manage-bookings' element={<ManageBooking/>} />

      </Route>

     </Routes>
     

     {!isOwner && <Footer/>}

    </>
  )
}




