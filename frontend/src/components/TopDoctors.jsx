import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
function TopDoctors() {
  const {doctors}=useContext(AppContext)
  const navigate=useNavigate()
  return (
    <div className='flex flex-col items-center'>
      <p className='mb-1 text-3xl text-slate-700'>Top Doctors for Appointment</p>
      <p className=' text-slate-700'>Simply browse through our list of expert doctors</p>
      <div className='grid items-center grid-cols-4 gap-5 mt-6 ml-2 ' >
           
                    {  
                        doctors.slice(0,8).map((item,index)=>(
                            <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} key={index} className='border-slate-700 border-[1px] md:w-[200px] md:h-[280px] rounded-lg hover:translate-y-[-4px] transition-all duration-4000  hover:border-blue-700 hover:border-2 cursor-pointer'>
                                <img className='md:w-[200px] md:h-180px bg-sky-50 rounded-lg ' src={item.image} alt="" />
                                <div className='flex flex-row '>
                                    <span className={`w-2 h-2 mt-[9px] ml-3 mr-1 ${item.available?'bg-green-500':'bg-gray-700' } rounded-full`}></span><p className={`mt-1 text-sm font-medium ${item.available?'text-green-500':'text-gray-500' }`}>{item.available?'Available':'Not Available'}</p>
                                </div>
                                <p className='ml-3 text-lg font-semibold '>{item.name}</p>
                                <p className='ml-3 text-slate-800'>{item.speciality}</p>
                             </div>
                        ))
                    }
                    
                   
           
      </div>
       <button onClick={()=>{navigate('/doctors');scrollTo(0,0)}} className='md:ml-[25px] pt-1 pb-1 w-[120px]  bg-violet-300 mt-6 text-center text-black font-serif text-xl rounded-md mb-8 hover:bg-purple-600 hover:text-white '>more</button>
    </div>
  )
}

export default TopDoctors
