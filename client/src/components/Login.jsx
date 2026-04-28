import React from 'react'
import { assets } from '../assets/assets'
import { FaLock } from "react-icons/fa";
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';


export default function Login() {

  const [state, setState] = React.useState("login")

  const {setShowLogin,navigate,axios,setToken}=useAppContext()

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmit =async (e) => {
        try {
            e.preventDefault()
            const {data}= await axios.post(`/api/user/${state}`,formData)
             
            if(data.success){
                navigate('/')
                setToken(data.token)
                localStorage.setItem('token',data.token)
                setShowLogin(false)
            }else{
                toast.error(data.message)
            }

        } catch (error) {
             toast.error(error.message)
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

  return (


    <div onClick={()=>setShowLogin(false)} className=' fixed top-0 bottom-0 left-0 right-0 flex items-center text-white z-100 bg-black/50 justify-center'>


         <form
            onSubmit={handleSubmit}
            onClick={(e)=>e.stopPropagation()}
            className="sm:w-87.5 w-full text-center bg-gray-900 border border-gray-800 rounded-2xl px-8">
            <h1 className="text-white text-3xl mt-10 font-medium">
                {state === "login" ? "Login" : "Sign up"}
            </h1>

            <p className="text-gray-400 text-sm mt-2">Please sign in to continue</p>

            {state !== "login" && (
                <div className="flex items-center mt-6 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                    <img src={assets.users_icon} alt="" className='h-4'/>
                    <input type="text" name="name" placeholder="Name" className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none " value={formData.name} onChange={handleChange} required />
                </div>
            )}

            <div className="flex items-center w-full mt-4 bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
               <img src={assets.gmail_logo} alt="" className='h-4' />
                <input type="email" name="email" placeholder="Email id" className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none " value={formData.email} onChange={handleChange} required />
            </div>

            <div className=" flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                <FaLock  className='h-3 text-gray-500'/>
                <input type="password" name="password" placeholder="Password" className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="mt-4 text-left">
                <button className="text-sm text-indigo-400 hover:underline duration-700 transition-all">
                    Forget password?
                </button>
            </div>

            <button type="submit" className="mt-2 w-full active:scale-95 h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition " >
                {state === "login" ? "Login" : "Sign up"}
            </button>

            <p onClick={() => setState(prev => prev === "login" ? "register" : "login") } className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer" >
                {state === "login" ? "Don't have an account?" : "Already have an account?"}
                <span className="text-indigo-400 hover:underline ml-1">click here</span>
            </p>
        </form>


    </div>
  )
}
