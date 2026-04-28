import React from 'react'
import { assets } from '../assets/assets'
import {motion} from 'motion/react'

export default function Footer() {
  return (
    <footer className=" bg-linear-to-r  from-slate-900 via-gray-900  to-emerald-900   border-t border-neutral-400  text-white py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-20">
                <motion.div 
                   initial={{x:-100,opacity:0}}
                   whileInView={{x:0,opacity:1}}
                   transition={{duration:1,delay:0.5}}
                   viewport={{once:true,amount:0.3}}
                className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-8 md:gap-16">
                    
                    <div className="lg:col-span-3 space-y-6">
                       <img src={assets.logo} alt="logo"  className='h-18 md:h-32'/>
                        <p className="text-sm md:text-base">Join our newsletter for regular updates.</p>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <input type="email" placeholder="example@email.com" className="bg-[#14171A] text-white/70 border border-white/10 px-3 py-3 rounded-md w-full sm:flex-1 sm:max-w-xs placeholder:text-sm placeholder:font-light focus:outline-none focus:ring-1 focus:ring-gray-600"/>
                            <button className="bg-[#14171A] text-white px-5 py-3 rounded-md border border-white/10 text-sm hover:bg-gray-800 transition-colors">
                                Subscribe
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-28 items-start">
                        {/* Products */}
                        <div>
                            <h3 className="font-medium text-sm mb-4 md:mb-6">LINKS</h3>
                            <ul className="space-y-3 md:space-y-4 text-sm text-white/70">
                                <li><a href="#" className="hover:text-white">Admin</a></li>
                                <li><a href="#" className="hover:text-white">Home</a></li>
                                <li><a href="#" className="hover:text-white">My-booking</a></li>
                                <li><a href="#" className="hover:text-white">About-us</a></li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h3 className="font-medium text-sm mb-4 md:mb-6">CARS</h3>
                            <ul className="space-y-3 md:space-y-4 text-sm text-white/70">
                                <li><a href="#" className="hover:text-white">Porsche</a></li>
                                <li><a href="#" className="hover:text-white">BMW</a></li>
                                <li><a href="#" className="hover:text-white">Mercedes</a></li>
                                <li><a href="#" className="hover:text-white">Toyota</a></li>
                                <li><a href="#" className="hover:text-white">Suzuki</a></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="col-span-2 md:col-span-1">
                            <h3 className="font-medium text-sm mb-4 md:mb-6">CONTACT US</h3>
                            <ul className="space-y-3 md:space-y-4 text-sm text-white/70">
                                <li><a href="#" className="hover:text-white">Car-Rental</a></li>
                                <li><a href="#" className="hover:text-white">Kozhikode,kerala</a></li>
                                
                                <li><a href="#" className="hover:text-white">+901 90273789</a></li>
                                <li><a href="#" className="hover:text-white">Car-Rental@gmail.com</a></li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                initial={{x:100,opacity:0}}
                   whileInView={{x:0,opacity:1}}
                   transition={{duration:1,delay:0.5}}
                   viewport={{once:true,amount:0.3}}
                className="max-w-7xl mx-auto mt-12 md:mt-16 pt-6 my-10 border-t border-neutral-700 flex flex-col
                 md:flex-row justify-between items-center gap-6">
                    <p className="text-white/70 text-xs sm:text-sm order-2 md:order-1">© {new Date().getFullYear()} CAR-RENTAL_SHADIL</p>
                    <div className="flex gap-5 md:gap-6 order-1 md:order-2">

                        <a href="#"><img src={assets.facebook_logo} alt="facebook_logo" className='w-5 h-5  ' /> </a>
                        <a href="#"><img src={assets.instagram_logo} alt="instagram_logo" className='w-5 h-5 ' /> </a>
                        <a href="#"><img src={assets.twitter_logo} alt="twitter_logo" className='w-5 h-5     ' /> </a>
                        <a href="#"><img src={assets.gmail_logo} alt="gmail_logo" className='w-5 h-5        ' /> </a>
                       
                    </div>
                </motion.div>
            </footer>
  )
}
