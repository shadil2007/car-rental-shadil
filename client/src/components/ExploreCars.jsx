import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

export default function ExploreCars() {

const navigate = useNavigate()

    return (
        <>
            <motion.style
             initial={{y:50,scale:0.9}}
                      whileInView={{y:0,scale:1}}
                      transition={{duration:1,delay:0.6}}>{`
                @keyframes shine {
                    0% {
                        background-position: 0% 50%;
                    }
            
                    50% {
                        background-position: 100% 50%;
                    }
            
                    100% {
                        background-position: 0% 50%;
                    }
                }
            
                .button-bg {
                    background: conic-gradient(from 0deg, #00F5FF, #FF00C7, #FFD700, #00FF85, #8A2BE2, #00F5FF);
                    background-size: 300% 300%;
                    animation: shine 4s ease-out infinite;
                }
            `}</motion.style>
            <motion.div
                      initial={{y:50,opacity:0}}
                      whileInView={{y:0,opacity:1}}
                      transition={{duration:1,delay:0.6}}
             className="button-bg rounded-full p-0.5  hover:scale-105 transition duration-300 active:scale-100">
                <motion.button 
                 initial={{y:50,scale:0.9}}
                          whileInView={{y:0,scale:1}}
                          transition={{duration:1}}
                onClick={()=>{navigate('/cars'), scrollTo(0,0)}}  className="px-8 cursor-pointer text-sm py-2.5 text-white rounded-full  font-medium bg-gray-800">
                    Explore all cars
                </motion.button>
            </motion.div>
        </>
    );
};