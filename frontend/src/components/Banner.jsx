import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'
function Banner() {
    const Navigate=useNavigate()
  return (
    <div className='mb-6'>
     <div className='md:w-[1/2] flex flex-col md:flex-row h-[50vh] bg-violet-400 rounded-lg mt-4 justify-center items-center'>
          <div className='flex flex-col justify-center mx-6'>
            <div className='font-serif text-4xl text-white'>
                Book Appointment <br  />
                <p className='text-3xl'> With 100+ Trusted Doctors</p>
               
            </div>
            
            <a onClick={()=>{Navigate('/login');scrollTo(0,0)}}
            className='flex flex-row h-10 gap-4 px-[21px] mx-5 my-4 text-center bg-white w-40 py-[5px] text-violet-700 text-md rounded-2xl  hover:bg-slate-200 hover:text-black' href="">
                Create Account
            </a>
          </div>
          <div className='md:w-[1/2] flex flex-col md:flex-row h-[50vh] bg-violet-400 rounded-lg ml-[20%]'>
            <img  src={assets.appointment_img} alt="" />
          </div>
        </div>
        </div>
  )
}

export default Banner
