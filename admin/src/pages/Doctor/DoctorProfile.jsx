import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect,useState } from 'react'
import { assets } from '../../../../frontend/src/assets/assets_frontend/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const {dToken,profileData,setProfileData,getProfileData,backendUrl}=useContext(DoctorContext)
 
  const [isEdit,setIsEdit]=useState(false)
  const updateProfile=async ()=>{
    try {
      const updateData={
        address:profileData.address,
        fees:profileData.fees,
        available:profileData.available
      }
      const {data}=await axios.post(backendUrl+'/api/doctor/update-profile',updateData,{headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(data.message)
    }
  }
  useEffect(()=>{
    if(dToken){
      getProfileData()
    }
  },[dToken])
  return profileData && (
    <div className='flex flex-col gap-2 mt-5 ml-1 w-[90%]' >
                    <div className='w-[28%] ml-2'>
                        <img className='w-full bg-indigo-400 rounded-lg' src={profileData.image} alt="" />
                    </div>
                    <div className='flex flex-col pl-6 ml-2 bg-white border border-gray-400 rounded-lg w-[72%]'>
                        <p className='flex gap-2 mt-2 text-2xl'>{profileData.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
                        <div className='flex gap-2 mt-1 text-sm font-medium text-gray-700'>
                            <p>{profileData.degree} - {profileData.speciality}</p>
                            <button className='py-0.5 px-2 rounded-full  border border-black'>{profileData.experience}</button>
                        </div>
                        <div>
                            <p className='flex gap-1 mt-2 text-sm font-medium' >About <img src={assets.info_icon} alt="" /></p>
                            <p className='mt-1 text-gray-600 tex-sm'>{profileData.about}</p>
                        </div>
                        <p className='py-1 mt-1 font-medium'>Appointment fee: <span> Rs. {isEdit?<input className='w-[92px] bg-gray-200 border rounded-md' type='number' onChange={(e)=>setProfileData(prev=>({...prev,fees:e.target.value}))} value={profileData.fees}/>:profileData.fees}  </span></p>
                        <div className='flex flex-row gap-2 '>
                          <p>Address:</p>
                          <p>{isEdit?<input className='bg-gray-200 border rounded-md' type='text' value={profileData.address.line1} onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))}/>:profileData.address.line1}
                            <br className='mt-1' />
                            {isEdit?<input className='mt-1 bg-gray-200 border rounded-md' type='text' value={profileData.address.line2} onChange={(e)=>setProfileData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))}/>:profileData.address.line2}
                          </p>
                        </div>
                        <div className='flex flex-row gap-2 py-1'>
                          <input onChange={()=>isEdit && setProfileData(prev=>({...prev,available:!prev.available}))} checked={profileData.available} type="checkbox" />
                          <p>Available</p>
                        </div>
                        <div className='py-2 mt-2 mb-1'>
                          {
                            isEdit?  <button  onClick={updateProfile} className='px-5 py-1 text-center text-white bg-blue-500 border-none rounded-full hover:bg-blue-600'>Save</button>: <button onClick={()=>setIsEdit(true)} className='px-5 py-1 text-center text-white bg-blue-500 border-none rounded-full hover:bg-blue-600'>Edit</button>
                          }
                         
                        
                        </div>
                    </div>
                </div>
  )
}

export default DoctorProfile
