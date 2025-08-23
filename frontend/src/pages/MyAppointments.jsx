import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

function MyAppointments() {
  const {backendUrl,token,getAllDoctors}=useContext(AppContext)
  const [appointments,setAppointments]=useState([])
  const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const slotDateFormat=(slotDate)=>{
    const dateArray=slotDate.split('_')
    return dateArray[0]+" "+months[Number(dateArray[1])-1]+" "+dateArray[2]
  }
  const getUserAppointments=async ()=>{
    try {
      const {data}=await axios.get(backendUrl+'/api/user/appointments',{headers:{token}})
      if(data.success){
        setAppointments((data.appointments).reverse())
        // console.log(appointments)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
const cancelAppointment=async (appointmentId)=>{
  try {
    const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
    if(data.success){
      toast.success(data.message)
      getUserAppointments()
      getAllDoctors()
    }else{
      toast.error(data.message)
    }
  } catch (error) {
     console.log(error)
      toast.error(error.message)
  }
}

  useEffect(()=>{
    if(token){
      getUserAppointments()
    }
  },[token])
  return (
    <div>
      <p className='mt-8 font-sans text-2xl text-center '>My Appointments</p>
      <div className='mt-16 ml-4 mr-4'>
        {
          appointments.map((item,index)=>(
              <div key={index} className='flex flex-row mb-4 border'>
                  <div className=''>
                    <img className='w-40 h-40 rounded-sm bg-sky-100' src={item.docData.image} alt="" />
                  </div>
                  <div className='flex flex-col justify-center p-2 ml-4 text-sm bg-gray-100 rounded-sm w-96 '>
                    <p className='font-semibold'>{item.docData.name}</p>
                    <p>{item.speciality}</p>
                    <p className='mt-1 font-medium text-zinc-700'>Address :</p>
                    <p className='text-xs'>{item.docData.address.line1}</p>
                    <p className='text-xs'>{item.docData.address.line2}</p>
                    <p className='mt-1'><span className='font-medium text-zinc-800'>Date & Time :</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                  </div>
                  <div className='flex flex-col justify-end gap-3 mb-2 ml-24 mt-14'>
                    {!item.cancelled && !item.isCompleted && <button className='px-3 py-2 text-sm text-blue-500 transition-all duration-300 bg-gray-100 border rounded-lg hover:text-white hover:bg-blue-500'>Pay online</button>}
                    {!item.cancelled && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className='px-3 py-2 text-sm text-black transition-all duration-300 bg-gray-100 border rounded-lg hover:text-white hover:bg-red-500'>Cancel Appointment</button> }
                    {item.cancelled  && !item.isCompleted  && <button className='px-3 py-2 mb-12 mr-10 text-sm text-red-500 bg-gray-100 border border-red-500 rounded-lg '>Appointment Cancelled</button>}
                    {item.isCompleted &&  <button className='px-3 py-2 mb-12 mr-10 text-sm text-green-500 bg-gray-100 border border-green-500 rounded-lg '>Appointment Completed</button>}
                  </div>
                  
              </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments
