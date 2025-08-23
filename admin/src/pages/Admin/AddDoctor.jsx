import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [about, setAbout] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (!docImg) {
        return toast.error('Image not selected')
      }

      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))


      // formData.forEach((value,key)=>{
      //   console.log(`${key}:${value}`)
      // })

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setExperiencece('1 Year')
        setFees('')
        setSpeciality('General physician')
        setDegree('')
        setAddress1('')
        setAddress2('')
        setAbout('')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }

  }
  return (
    <form onSubmit={onSubmitHandler} action="" className='w-full m-5'>
      <div>
        <p className='pl-3 font-sans text-xl font-medium'>Add Doctor</p>
      </div>
      <div className="pt-3 pl-8 bg-white w-[600px] mt-3 rounded-md">
        <div className='flex flex-row gap-4' >
          <label htmlFor="doc-img">
            <img className='w-20 h-20 rounded-full cursor-pointer border-[1px]  border-black' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id='doc-img' hidden />
          <p className='pt-6 font-medium'>upload image</p>
        </div>
        <div className='flex flex-row gap-10 pt-4'>
          <div className='w-60'>
            <div className='w-full pt-2'>
              <p className='text-lg'>Doctor Name</p>
              <input onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full h-8 pl-1 mt-1 border-[1px] border-black rounded-md " type="text" placeholder='Name' required />
            </div>
            <div className='w-full pt-2'>
              <p className='text-lg'>Doctor Email</p>
              <input onChange={(e) => setEmail(e.target.value)}
                value={email} className="w-full h-8 pl-1 mt-1 border-[1px] border-black rounded-md " type="email" placeholder='Email' required />
            </div>
            <div className='w-full pt-2'>
              <p className='text-lg'>Doctor Password</p>
              <input onChange={(e) => setPassword(e.target.value)}
                value={password} className="w-full h-8 pl-1 mt-1 border-[1px] border-black rounded-md " type="password" placeholder='Password' required />
            </div>
            <div className='w-full pt-2'>
              <p className='text-lg'>Experience</p>
              <select onChange={(e) => setExperience(e.target.value)}
                value={experience} className="w-full h-8 pl-1 mt-1 border-[1px] border-black rounded-md " name="" id="" required>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
                <option value="11 Year">11 Year</option>
                <option value="12 Year">12 Year</option>
                <option value="13 Year">13 Year</option>
                <option value="14 Year">14 Year</option>
                <option value="15 Year">15 Year</option>
              </select>
            </div>
            <div className='w-full pt-2'>
              <p className='text-lg'>Fees</p>
              <input onChange={(e) => setFees(e.target.value)}
                value={fees} className="w-full h-8 pl-1 mt-1 border-[1px] border-black rounded-md " type="number" placeholder='fees' required />
            </div>
          </div>
          <div className='w-60'>
            <div className='w-full pt-2'>
              <p className='text-lg'>Speciality</p>
              <select onChange={(e) => setSpeciality(e.target.value)}
                value={speciality} className="w-full h-8 pl-1 mt-1 border-[1px] border-black rounded-md " name="" id="" required>
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className='w-full pt-2'>
              <p className='text-lg'>Education</p>
              <input onChange={(e) => setDegree(e.target.value)}
                value={degree} className="w-full h-8 pl-1 mt-1 border-[1px] border-black rounded-md " type="text" placeholder='Education' required />
            </div>
            <div className='w-full pt-2'>
              <p className='text-lg'>Address</p>
              <input onChange={(e) => setAddress1(e.target.value)}
                value={address1} className="w-full h-8 pl-1 mt-1 border-[1px] border-black rounded-md " type="text" placeholder='Address Line1' required /><br />
              <input onChange={(e) => setAddress2(e.target.value)}
                value={address2} className="w-full h-8 pl-1 mt-1 border-[1px] border-black rounded-md " type="text" placeholder='Address Line2' required />
            </div>
          </div>
        </div>
        <div className='pt-3'>
          <p className='text-lg'>About Doctor</p>
          <textarea onChange={(e) => setAbout(e.target.value)}
            value={about} className=" pl-1 mt-1 border-[1px] border-black rounded-md " name="" id="" rows={5} cols={69} placeholder='Write about doctor' required></textarea>
        </div>
        <button className='px-3 py-1 mt-5 mb-5 bg-blue-400 rounded-xl hover:bg-blue-500 hover:text-white'>Add Doctor</button>
      </div>

    </form>
  )
}

export default AddDoctor
