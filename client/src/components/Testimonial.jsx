import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets';
import { motion } from 'motion/react';

export default function Testimonial() {

    const testimonials = [
        {
            name: "Emma Rodriguez",
            address: "Barcelona, Spain",
            image: assets.testimonial_image_1,
            review: "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!"

        },
        {
            name: "Cristiano Romero",
            address: "Madrid, Spain",
            image: assets.testimonial_image_2,
            review: "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!"

        },
        {
            name: "George Best",
            address: "Barcelona, Spain",
            image: assets.testimonial_image_1,
            review: "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!"

        },


    ];

    return (
        <motion.div 
        initial={{y:50,opacity:0}}
        whileInView={{y:0,opacity:1}}
        transition={{duration:1,ease:"easeOut"}}
        className=" px-6 py-28 md:px-16 lg:px-24 xl:px-32">



            <Title title="What Our Customers Says" subTitle="Discover why Travellers choose stayVenture
        For Their Luxury Accomadation Around the World"/>



            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-18">
                {testimonials.map((testimonial, index) => (
                    <motion.div 
                        initial={{y:40,opacity:0}}
                        whileInView={{y:0,opacity:1}}
                        transition={{duration:1,delay:index * 0.5,ease:"easeOut"}}
                        viewport={{once:true,amount:0.3}}
                    key={index} className="bg-white/20 backdrop-blur-2xl p-6 rounded-xl mx-10 md:mx-auto shadow-lg hover:-translate-y-1      transition-all duration-500">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-white text-xl">{testimonial.name}</p>
                                <p className="text-white/80">{testimonial.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <img key={index} src={assets.star_icon} alt="star-icon" />

                            ))}
                        </div>
                        <p className="text-white/80 max-w-90 mt-4">"{testimonial.review}"</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
