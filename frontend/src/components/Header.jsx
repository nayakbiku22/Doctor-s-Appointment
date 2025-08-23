import React from 'react'
import {assets} from '../assets/assets_frontend/assets'
function Header() {
  return (
    <div className='md:w-[1/2] flex flex-col md:flex-row h-[75vh] bg-violet-400 rounded-lg'>
      <div className='flex flex-col justify-center mx-6'>
        <p className='font-serif text-4xl text-white'>
            Book Appointment <br />With Trusted Doctors
        </p>
        <div className='flex flex-row justify-center my-1 text-slate-950'>
            <img className='h-12 my-2' src={assets.group_profiles} alt="" />
            <p className='mx-2 font-serif'>Simply browse through our extensive list of trusted doctors <br />Schedule your appointment hassle-free.</p>
        </div>
        <a className='flex flex-row h-10 gap-4 px-[10px] mx-4 my-4 text-center bg-white w-48 py-1 text-violet-700 text-md rounded-2xl hover:bg-slate-200 hover:text-black ' href="/doctors">
            Book appointment <img className='w-6' src={assets.arrow_icon} alt="#speciality" />
        </a>
      </div>
      <div>
        <img className='h-[75vh]' src={assets.header_img} alt="" />
      </div>
    </div>
  )
}

export default Header
