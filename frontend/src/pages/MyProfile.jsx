import React, {  useContext, useState } from 'react'
import {assets} from "../assets/assets_frontend/assets.js"
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
function MyProfile() {

 const {userData,setUserData,token,backendUrl,loadUserData}=useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [image,setImage]=useState(false)

  const updateUserData=async ()=>{
    try {
      const formData=new FormData()
      
      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)

      image && formData.append('image',image)
      
      const {data}=await axios.post(backendUrl+`/api/user/update-profile`,formData,{headers:{token}})
      if(data.success){
        toast.success(data.message)
       await loadUserData()
       setIsEdit(false)
       setImage(false)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='flex flex-col max-w-md gap-2 mt-4 text-sm'>
      {
        isEdit?
        <label htmlFor="image">
          <div className='inline-block opacity-75 cursor-pointer'>
            <img className='rounded w-36' src={image?URL.createObjectURL(image):userData.image} alt="" />
            <img  className='absolute w-10 bg-slate-300 left-[165px] top-[227px]' src={image?null:assets.upload_icon} alt="" />
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image'  hidden/>
        </label>
        :<img className='rounded w-36' src={userData.image} alt="" />
      }
      

      {
        isEdit ?
          <input className='mt-3 text-2xl bg-gray-200 border rounded-md w-60' type="text" value={userData.name} onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))} /> :
          <p className='mt-4 text-2xl font-medium text-neutral-600'>{userData.name}</p>
      }
      <hr className='h-[1px] bg-black' />
      <div>
        <p className='mt-3 text-lg font-normal underline'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] mt-3 gap-y-2 text-lg'>
          <p>Email :</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p>Phone :</p>
          {
            isEdit ?
              <input className='w-64 bg-gray-200 border rounded-md' type="text" value={userData.phone} onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))} /> :
              <p className='text-blue-500'>{userData.phone}</p>
          }
          <p>Address:</p>
          {
            isEdit ?
              <p>
                <input className='w-64 bg-gray-200 border rounded-md' type="text" value={userData.address.line1} onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} />
                <br /> 
                <input className='bg-gray-200 border rounded-md w-64 mt-[3px]' type="text" value={userData.address.line2} onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
              </p> :
              <p>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }
        </div>
      </div>
      <div>
        <p className='mt-3 text-lg font-normal underline'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] mt-3 gap-y-2 text-lg gap-x-2'>
          <p>Gender :</p>
          {
            isEdit ?
              <select className='w-40 bg-gray-200 border rounded-md' value={userData.gender} onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))} name="" id="">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select> :
              <p>{userData.gender}</p>
          }
          <p>Date of Birth :</p>
          {
            isEdit ?
              <input className='w-40 bg-gray-200 border rounded-md' type="date"  value={ userData.dob} onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))} /> :
              <p className='font-semibold'>{userData.dob}</p>
          }
        </div>
      </div>

      <div className='mt-4 ml-2 '>
        {
          isEdit?
          <button className='px-6 py-1 font-semibold bg-gray-300 border rounded-xl hover:bg-gray-500 hover:text-white' onClick={updateUserData}>Save information</button>:
          <button className='px-6 py-1 font-semibold bg-gray-300 border rounded-xl hover:bg-gray-500 hover:text-white' onClick={()=>setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile
