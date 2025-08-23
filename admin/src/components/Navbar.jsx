import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets.js'

import { NavLink, useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext.jsx';
import { DoctorContext } from '../context/DoctorContext.jsx';
function Navbar() {
    const {aToken,setAToken}=useContext(AdminContext)
    const {dToken,setDToken}=useContext(DoctorContext)
    const Navigate=useNavigate();
    const handleLogout=()=>{
        Navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }
  return (
    <div className='flex items-center justify-between py-2 text-sm border-b-[1.5px] border-b-gray-600n pr-3 h-14' >
        <div className='flex flex-row'>
            <img  className='cursor-pointer h-14 w-44' src={assets.logo} alt=''/>
            <p className='px-2 py-1 bg-gray-200 border-black border-[1px] rounded-2xl w-14 h-8 mt-2 cursor-pointer'>{aToken?'Admin':'Doctor'}</p>
        </div>
          <button onClick={handleLogout} className='hidden w-auto px-6 py-2 font-serif text-white bg-blue-600 rounded-3xl hover:font-semibold md:block'>Logout</button>
        
       
      
    </div>
  )
}

export default Navbar
