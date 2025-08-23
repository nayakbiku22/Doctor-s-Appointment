import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
function Contact() {
  
  return (
    <div>
      <div className='mt-8 font-sans text-2xl text-center '>
        <p className='text-gray-600'>CONTACT US</p>
      </div>
      <div className='flex flex-row justify-center gap-6 mt-12'>
       <img className='w-[30vw]' src={assets.contact_image} alt="" />
       <div className='flex flex-col mt-8' >
          <p className='text-2xl text-gray-700'>Our OFFICE</p>
          <p className='mt-4 text-gray-600'>17/2 Garia Road <br /> PolicePara, Panchpota, WB</p>
          <p className='mt-4 text-gray-600'>Tel : (112) 55-5089 <br /> Email: dummy@gmail.com</p>
          <p className='mt-4 text-gray-600'>Learn more about our teams and jobs</p>
          <button className='mt-4 border-[1.5px] border-gray-700 h-10 w-28 p-2 text-center hover:bg-violet-600 hover:text-white'>Explore Jobs</button>
       </div>
      </div>
    </div>
  )
}

export default Contact
