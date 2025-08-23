import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
function About() {
  return (
    <div>
      <div className='mt-8 font-sans text-2xl text-center '>
        <p className='text-gray-600'>ABOUT US</p>
      </div>
      <div className='flex flex-row gap-4 mt-10 '>
        <img className='w-[35vw] h-80 rounded-xl' src={assets.about_image} alt="" />
        <div className='text-gray-800 '>
          <p className='p-2 text-lg'>Welcome to our doctor’s appointment booking platform, designed to make healthcare simple, fast, and accessible. We connect patients with trusted doctors across various specialties, allowing you to find the right medical professional at the right time—all from the comfort of your home.</p>
          <p className='p-2 text-lg'>Our platform offers easy search options, detailed doctor profiles, consultation fees, and real-time availability to help you make informed decisions.</p>
          <b className='pl-2'>Our Vision</b>
          <p className='p-2 text-lg'>
            Our vision is to simplify healthcare access by connecting patients with trusted doctors anytime, anywhere, ensuring convenience, transparency, and quality care.</p>
        </div>
      </div>
      <div className='text-xl my-9'>
        <p>WHY <span className='text-gray-700'>CHOOSE US</span></p>
      </div>
      <div className='grid w-full h-40 grid-cols-3 gap-1 text-lg'>
        <div className='flex flex-col justify-center p-3 hover:bg-violet-500 hover:text-white border-[1.5px] m-2 border-gray-400 '>
          <b>Efficiency:</b>
          <p className='mt-2'>Quick appointment booking with minimal steps and delays.</p>
        </div>
        <div className='border-[1.5px] border-gray-400 flex flex-col justify-center p-3 m-2 hover:bg-violet-500 hover:text-white'>
          <b>Convenience:</b>
          <p>Access doctors anytime, anywhere, from your device.
          </p>
        </div>
        <div className='border-[1.5px] border-gray-400 flex flex-col justify-center p-3 m-2 hover:bg-violet-500 hover:text-white'>
          <b>Personalization:</b>
          <p> Doctor recommendations matching your health needs.</p>
        </div>

      </div>
    </div>
  )
}

export default About
