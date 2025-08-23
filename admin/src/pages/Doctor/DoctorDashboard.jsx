import React from 'react'
import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets'
const DoctorDashboard = () => {
  const { dToken, dashData, setDashData, getDashData,cancelAppointment,completeAppointment } = useContext(DoctorContext)
   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
  }
  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken,dashData])
  return dashData && (
    <div className='m-8'>
      <div className='flex flex-row gap-10'>
        <div className='flex flex-row gap-3 p-5 cursor-pointer rounded-xl bg-sky-200 hover:translate-y-[-4px] transition-all duration-100'>
          <img src={assets.earning_icon} alt="" />
          <div className='font-medium text-center'>
            <p className='text-xl'>{dashData.earnings}</p>
            <p>Earnings</p>
          </div>
        </div>
        <div className='flex flex-row gap-3 p-5 cursor-pointer rounded-xl bg-sky-200  hover:translate-y-[-4px] transition-all duration-100'>
          <img src={assets.patients_icon} alt="" />
          <div className='font-medium text-center'>
            <p className='text-xl'>{dashData.patients}</p>
            <p>Patients</p>
          </div>
        </div>
        <div className='flex flex-row gap-3 p-5 cursor-pointer rounded-xl bg-sky-200  hover:translate-y-[-4px] transition-all duration-100'>
          <img src={assets.appointments_icon} alt="" />
          <div className='font-medium text-center'>
            <p className='text-xl'>{dashData.appointments}</p>
            <p>Appointments</p>
          </div>
        </div>
      </div>
      <div className='mt-8 bg-white'>
        <div className='flex flex-row items-center gap-2 px-4 py-3  border-[1px] rounded-t  border-b-black'>
          <img src={assets.list_icon} alt="" />
          <p className='font-medium'>
            Latest Bookings
          </p>
        </div>
        <div className='overflow-y-scroll border border-t-0 black border- border-1'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div className='flex flex-row items-center gap-3 px-6 py-2 hover:bg-gray-100' key={index}>
                <img className='bg-gray-200 rounded-full w-14' src={item.userData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='font-medium text-gray-700'>{item.userData.name}</p>
                  <p className='text-gray-800'>{slotDateFormat(item.slotDate)}</p>
                </div>
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

    </div>
  )
}

export default DoctorDashboard
