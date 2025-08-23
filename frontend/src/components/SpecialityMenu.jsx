import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import {Link} from 'react-router-dom'
function SpecialityMenu() {
  return (
    <div id='speciality' className='flex flex-col items-center pt-10'>
      <h1 className='mb-2 font-serif text-3xl text-violet-600'>Find By Speciality</h1>
      <p className='font-serif text-lg '>Simply browse through our extensive list of trusted doctors, schedule your appointments hassle-free</p>
      <div className='flex flex-row items-center gap-5 mt-3 mb-16'>
        {
          specialityData.map((item,index)=>(
            <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center flex-shrink-0 cursor-pointer hover:translate-y-[-10px] transition-all duration-4000' key={index} to={`/doctors/${item.speciality}`}>
                <img className='w-16 mt-2 mb-2 sm:w-24' src={item.image} alt="" />
                <p className='flex text-center'>{item.speciality}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default SpecialityMenu
