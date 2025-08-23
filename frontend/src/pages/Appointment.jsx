import React, { useEffect, useState, useContext, use } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

function Appointment() {
    const { docId } = useParams()
    const { doctors,backendUrl,token,getAllDoctors,userData } = useContext(AppContext)
    const navigate=useNavigate()
  const daysOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT']
    const [docInfo, setDocInfo] = useState(null)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')
    const fetchDocInfo = async () => {
        const doctorInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(doctorInfo);
        // console.log(doctorInfo)
    }

    const getAvailableSlots = async () => {
        setDocSlots([])
        //get current date
        let today = new Date();
        for (let i = 0; i < 7; i++) {
            //getting date with index
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            //setting end time of date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            //setting hours
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0);
            }
            let timeSlots = []
            while (currentDate < endTime) {
                let formatteedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

                let day=currentDate.getDate()
                let month=currentDate.getMonth()+1
                let year=currentDate.getFullYear()

                const slotDate=day+"_"+month+"_"+year
                const slotTime=formatteedTime
                const isSlotAvailable=docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime)?false:true

                if(isSlotAvailable){
                     //add slot to array
                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formatteedTime
                })
                }
               
                //increment cuttent time by 30 min
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }
            setDocSlots((prev) => ([...prev, timeSlots]))
        }
    }


    const bookAppointment=async ()=>{
        if(!token){
            toast.warn('Login to book appointment')
            return navigate('/login')
        }
        try {
            const date=docSlots[slotIndex][0].datetime
            let day=date.getDate()
            let month=date.getMonth()+1
            let year=date.getFullYear()

            const slotDate=day+"_"+month+"_"+year
            const userId=userData._id
            const {data}=await axios.post(backendUrl+'/api/user/book-appointment',{docId,slotDate,slotTime,userId},{headers:{token}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
                navigate('/my-appointments')
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    
    useEffect(() => {
        console.log(docSlots)
    }, [docSlots])
    useEffect(() => {
        getAvailableSlots()
    }, [docInfo])
    useEffect(() => {
        fetchDocInfo()
    }, [doctors, docId])
    return docInfo && (
        <div>
            <div className='flex flex-row gap-6 mt-5' >
                <div className='w-[28%]'>
                    <img className='w-full bg-indigo-500 rounded-lg' src={docInfo.image} alt="" />
                </div>
                <div className='flex flex-col p-3 mx-2 bg-white border border-gray-400 rounded-lg w-[72%]'>
                    <p className='flex gap-2 text-2xl'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
                    <div className='flex gap-2 mt-1 text-sm font-medium text-gray-700'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 rounded-full  outline-1'>{docInfo.experience}</button>
                    </div>
                    <div>
                        <p className='flex gap-1 mt-2 text-sm font-medium' >About <img src={assets.info_icon} alt="" /></p>
                        <p className='mt-1 text-gray-600 tex-sm'>{docInfo.about}</p>
                    </div>
                    <p className='mt-1 font-medium'>Appointment fee: <span> Rs. {docInfo.fees}  </span></p>
                </div>
            </div>
            {/* Booking slots */}
            <div className='mt-10 ml-[276px]'>
                <p className='text-3xl text-blue-600'>Booking Slots</p>
                <div className='flex flex-row items-center w-full gap-3 mt-6 '>
                    {
                        docSlots.length && docSlots.map((item, index) => (
                            <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 rounded-full cursor-pointer  w-16  ${slotIndex===index?`bg-blue-500 text-white`:`border-2`}`} key={index}>
                                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                <p>{item[0] && item[0].datetime.getDate()}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-row items-center w-full gap-3 mt-6 overflow-x-scroll'>
                    {
                        docSlots.length && docSlots[slotIndex].map
                        ((item,index)=>(
                            <p onClick={()=>setSlotTime(item.time)} className={`text-small px-5 py-2  rounded-full text-center flex-shrink-0 cursor-pointer ${item.time===slotTime?'bg-blue-500 text-white':'border-2'}`} key={index}>{item.time.toLowerCase()}</p>
                        ))
                    }
                </div>
                <button onClick={bookAppointment} className='px-8 py-2 mt-4 ml-1 text-white bg-blue-500 rounded-full px- hover:bg-blue-600'>Book an Appointment</button>
            </div>
            {/* Listing related doctors */}
            <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
    )
}

export default Appointment
