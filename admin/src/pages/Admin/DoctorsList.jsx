import React, { useContext, useEffect } from 'react'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors,changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
      console.log(doctors)
    }
  }, [aToken])
  return (
    <div className='mt-5 ml-7'>
      <p className='font-sans text-xl font-medium'>All Doctors</p>

      <div className='grid w-full grid-cols-4 gap-3 gap-y-6'>

        {
          doctors.map((item, index) => (
            <div key={index} className='border-slate-700 border-[1px] md:w-[200px] md:h-[280px] rounded-lg hover:translate-y-[-4px] transition-all duration-4000  hover:border-blue-700 hover:border-2 cursor-pointer'>
              <img className='md:w-[200px] md:h-180px bg-sky-50 rounded-lg ' src={item.image} alt="" />
              <div className='flex flex-row '>
                
                <input onChange={()=>changeAvailability(item._id)} className='mt-1 ml-3 mr-2' type="checkbox" checked={item.available} />
                <p className='mt-1 text-sm font-medium text-green-500 '>Available</p>
              </div>
              <p className='ml-3 text-lg font-semibold '>{item.name}</p>
              <p className='ml-3 text-slate-800'>{item.speciality}</p>
            </div>
          ))
        }

      </div>
    </div>
    
  )
}

export default DoctorsList
