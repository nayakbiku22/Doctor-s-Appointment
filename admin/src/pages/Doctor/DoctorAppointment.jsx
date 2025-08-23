import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
const DoctorAppointment = () => {
  const { getAllAppointments, appointments, dToken, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge } = useContext(AppContext)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
  }
  useEffect(() => {
    if (dToken) {
      getAllAppointments()
    }
  }, [dToken])
  return (
    <div className='w-full m-5'>
      <p className='mb-6 text-xl font-normal'>All Appointments</p>
      <div className='text-sm bg-white border rounded-none max-h-[80vh] overflow-y-scroll min-h-[60vh] grid-flow-col w-full overflow-x-scroll'>
        <div className='grid grid-cols-[0.5fr_3fr_1fr_1fr_3fr_1fr_2fr] py-3  border-b items-center text-center  px-6'>
          <p className='text-blue-600'>#</p>
          <p className='text-blue-600'>Patient</p>
          <p className='text-blue-600'>Paymment</p>
          <p className='text-blue-600'>Age</p>
          <p className='text-blue-600'>Date & Time</p>
          <p className='text-blue-600'>Fees</p>
          <p className='text-blue-600'>Action</p>
        </div>
        {

          appointments.map((item, index) => (
            <div className='grid grid-col-[0.5fr_3fr_1fr_1fr_3fr_1fr_2fr] items-center py-3 ml-6 border-b bg-white hover:bg-gray-200  grid-flow-col gap-2 max-h-[60px] text-center ' key={index}>
              <p  >{index + 1}</p>
              <div className='flex flex-row items-center gap-2'>
                <img className='w-8 bg-gray-200 rounded-full' src={item.userData.image} alt="" /> <p className=''>{item.userData.name}</p>
              </div>
              <p>{item.payment ? 'Online' : 'CASH'} </p>
              <p>{calculateAge(item.userData.dob)} </p>
              <p>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>

              <p>{item.docData.fees} </p>
              {
                item.cancelled ?
                  <p className='text-red-500'>Cancelled</p>
                  : item.isCompleted ? <p className='text-green-500'>Completed</p> : <div className='flex flex-row gap-1'>
                    <img onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt="" />
                    <img onClick={() => completeAppointment(item._id)} src={assets.tick_icon} alt="" />
                  </div>
              }

            </div>
          ))
        }
      </div>

    </div>
  )
}

export default DoctorAppointment
