import React, { useContext, useEffect, useState } from 'react'
import logo from '../assets/assets_frontend/logo.jpg'
import profile from '../assets/assets_frontend/profile_pic.png'
import dropdown from '../assets/assets_frontend/dropdown_icon.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
function Navbar() {
  const {token,setToken,userData}=useContext(AppContext)
  const navigate=useNavigate();
  const [showMenu,setShowMenu]=useState(false);
  const logOut=()=>{
    setToken(false)
    localStorage.removeItem('token')
    navigate('/')
  }
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <div className='flex items-center justify-between py-4 text-sm border-b-[1.5px] border-b-gray-600' >
      <img onClick={()=>navigate('/')} className='cursor-pointer h-14 w-44' src={logo} alt=''/>
      <ul className='items-start hidden gap-5 font-semibold md:flex'>
        <NavLink to='/'>
            <li className='hover:text-blue-500 hover:font-bold'>HOME</li>
            
        </NavLink>
        <NavLink to='/doctors'>
            <li className='hover:text-blue-500 hover:font-bold'>ALL DOCTORS</li>
          
        </NavLink>
        <NavLink to='about'>
            <li className='hover:text-blue-500 hover:font-bold'>ABOUT</li>
            
        </NavLink>
        <NavLink to='/contact'>
            <li className='hover:text-blue-700 hover:font-bold'>CONTACT</li>
            
        </NavLink>
      </ul>
      <div>
        {
          token?
          <div className='relative flex items-center gap-2 cursor-pointer group'>
            <img className='w-8 rounded-full' src={userData.image} alt="" />
            <img className='w-2.5' src={dropdown} alt="" />
            <div className='absolute top-0 right-0 z-20 hidden pt-16 text-base group-hover:block'>
              <div className='flex flex-col gap-4 p-4 text-gray-600 min-w-44 bg-stone-200'>
                <p onClick={()=>navigate('my-Profile')} className='cursor-pointer hover:text-black'>My profile</p>
                <p onClick={()=>navigate('my-appointments')} className='cursor-pointer hover:text-black'>My Appointments</p>
                <p onClick={logOut} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>
          </div>:
          <button onClick={()=>navigate('login')} className='hidden p-2 text-white bg-blue-600 rounded-xl hover:font-semibold md:block'>Create account</button>
        }
       
      </div>
    </div>
  )
}

export default Navbar
