import React from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className=' bg-linear-to-r  from-slate-900 via-gray-900  to-emerald-900'>

      <Hero/>
      <FeaturedSection/>
      <Banner/>
      <Testimonial/>
      

    </div>
  )
}
