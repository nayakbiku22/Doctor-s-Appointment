import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


function Doctors() {
  const {speciality}=useParams()
  // console.log(speciality)

  const navigate=useNavigate()
  const [filterDoc,setFilterDoc]=useState([])
  const {doctors}=useContext(AppContext)

  const applyFilter=()=>{
    if(speciality){
      setFilterDoc(doctors.filter((doc)=>doc.speciality===speciality))
    }else{
      setFilterDoc(doctors)
    }
  }

  useEffect(()=>{
    applyFilter()
  },[doctors,speciality])
  return (
    <div className='mt-5'>
      <p className='text-xl text-gray-600'>Browse through the doctors specialist</p>
      <div className='flex flex-col items-start gap-12 mt-5 sm:flex-row'>
        <div className='flex flex-col gap-3 cursor-pointer'>
          <p  onClick={()=>speciality==="General physician"?navigate('/doctors'): navigate('/doctors/General physician')}  className={`cursor-pointer w-[170px] border border-gray-400 rounded py-1 px-2 text-center text-base ${speciality==="General physician"?"bg-sky-100":"" }`}>General physician</p>
          <p onClick={()=>speciality==="Gynecologist"?navigate('/doctors'): navigate('/doctors/Gynecologist')} className={`cursor-pointer w-[170px] border border-gray-400 rounded py-1 px-2 text-center text-base ${speciality==="Gynecologist"?"bg-sky-100":"" }`}>Gynecologist</p>
          <p  onClick={()=>speciality==="Dermatologist"?navigate('/doctors'): navigate('/doctors/Dermatologist')}  className={`cursor-pointer w-[170px] border border-gray-400 rounded py-1 px-2 text-center text-base ${speciality==="Dermatologist"?"bg-sky-100":"" }`}>Dermatologist</p>
          <p  onClick={()=>speciality==="Pediatricians"?navigate('/doctors'): navigate('/doctors/Pediatricians')}  className={`cursor-pointer w-[170px] border border-gray-400 rounded py-1 px-2 text-center text-base ${speciality==="Pediatricians"?"bg-sky-100":"" }`}>Pediatricians</p>
          <p  onClick={()=>speciality==="Neurologist"?navigate('/doctors'): navigate('/doctors/Neurologist')}  className={`cursor-pointer w-[170px] border border-gray-400 rounded py-1 px-2 text-center text-base ${speciality==="Neurologist"?"bg-sky-100":"" }`}>Neurologist</p>
          <p  onClick={()=>speciality==="Gastroenterologist"?navigate('/doctors'): navigate('/doctors/Gastroenterologist')}  className={`cursor-pointer w-[170px] border border-gray-400 rounded py-1 px-2 text-center text-base ${speciality==="Gastroenterologist"?"bg-sky-100":"" }`}>Gastroenterologist</p>
        </div>
        <div className='grid w-full grid-cols-3 gap-1 gap-y-6'>
          
          {
            filterDoc.map((item,index)=>(
                            <div onClick={()=>navigate(`/appointment/${item._id}`)} key={index} className='border-slate-700 border-[1px] md:w-[200px] md:h-[280px] rounded-lg hover:translate-y-[-4px] transition-all duration-4000  hover:border-blue-700 hover:border-2'>
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
      </div>
    </div>
  )
}

export default Doctors
