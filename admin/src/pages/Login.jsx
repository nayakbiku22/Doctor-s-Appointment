import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import { AdminContext } from '../context/AdminContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext.jsx'
const Login = () => {
    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate=useNavigate()
    const {setAToken,backendUrl}=useContext(AdminContext)
    const {setDToken}=useContext(DoctorContext)
    const onSubmitHandler=async (event)=>{
        event.preventDefault()

        try {
            if(state === 'Admin'){
                const {data}=await axios.post(backendUrl+'/api/admin/login',{email,password})
                if(data.success){
                    localStorage.setItem('aToken',data.token)
                    setAToken(data.token)
                     navigate('/admin-dashboard')
                }else{
                    toast.error(data.message)
                }
               
            }else{
                const {data}=await axios.post(backendUrl+'/api/doctor/login',{email,password})
                 if(data.success){
                    localStorage.setItem('dToken',data.token)
                    setDToken(data.token)
                     navigate('/doctor-dashboard')
                }else{
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form onSubmit={onSubmitHandler} className='flex flex-row items-center min-h-[80vh] justify-center mt-8  ' action="">
            <div className='flex flex-col items-start gap-3 p-8 border shadow-2xl rounded-xl w-80'>
                <p className='text-2xl font-medium text-blue-600 '>{state === 'Admin' ? 'Admin Login' : 'Doctor Login'}</p>


                <div className='w-full'>
                    <p>Email</p>
                    <input className='w-full p-1 mt-1 border rounded-lg border-zinc-500' type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input className='w-full p-1 mt-1 border rounded-lg border-zinc-500' type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <button className='w-full py-2 mb-1 text-white bg-blue-500 rounded-lg hover:bg-blue-700 hover:font-semibold'> Login</button>

                {
                    state === 'Admin' ?
                        <p>Doctor Login? <span onClick={() => setState('Doctor')} className='text-blue-700 underline cursor-pointer'> Click here</span></p>
                        : <p>Admin Login? <span onClick={() => setState('Admin')} className='text-blue-700 underline cursor-pointer'>click here</span> </p>
                }
            </div>
        </form>

    )
}

export default Login
