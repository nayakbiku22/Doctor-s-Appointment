import React, { use, useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { DoctorContext } from '../context/DoctorContext.jsx'

function Sidebar() {
    const {aToken}=useContext(AdminContext)
    const {dToken}=use(DoctorContext)
   
  return (
    <div className='w-48 h-[700px] bg-white border-r-[1px] border-black'>
      {
        aToken && <ul>
            <NavLink  className={({isActive})=>isActive?'flex flex-row pt-2 pl-2 bg-sky-100 pb-2':'flex flex-row pt-2 pl-2 pb-2'} to={'/admin-dashboard'}>
                <img src={assets.home_icon} alt="" />
                <p className='pl-2'>Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=>isActive?'flex flex-row pt-2 pl-2 bg-sky-100 pb-2':'flex flex-row pt-2 pl-2 pb-2'} to={'/all-appointments'}>
                <img src={assets.appointment_icon} alt="" />
                <p className='pl-2'>Appointments</p>
            </NavLink>
            <NavLink className={({isActive})=>isActive?'flex flex-row pt-2 pl-2 bg-sky-100 pb-2':'flex flex-row pt-2 pl-2 pb-2'} to={'/add-doctor'}>
                <img src={assets.add_icon} alt="" />
                <p className='pl-2'>Add Doctor</p>
            </NavLink>
            <NavLink className={({isActive})=>isActive?'flex flex-row pt-2 pl-2 bg-sky-100 pb-2':'flex flex-row pt-2 pl-2 pb-2'} to={'/doctor-list'}>
                <img src={assets.people_icon} alt="" />
                <p className='pl-2'>Doctor List</p>
            </NavLink>
        </ul>
 
      }
      {
            dToken && <ul>
            <NavLink  className={({isActive})=>isActive?'flex flex-row pt-2 pl-2 bg-sky-100 pb-2':'flex flex-row pt-2 pl-2 pb-2'} to={'/doctor-dashboard'}>
                <img src={assets.home_icon} alt="" />
                <p className='pl-2'>Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=>isActive?'flex flex-row pt-2 pl-2 bg-sky-100 pb-2':'flex flex-row pt-2 pl-2 pb-2'} to={'/doctor-appointments'}>
                <img src={assets.appointment_icon} alt="" />
                <p className='pl-2'>Appointments</p>
            </NavLink>
            <NavLink className={({isActive})=>isActive?'flex flex-row pt-2 pl-2 bg-sky-100 pb-2':'flex flex-row pt-2 pl-2 pb-2'} to={'/doctor-profile'}>
                <img className='h-7 w-7' src={assets.doctor_icon} alt="" />
                <p className='pl-2'>My Profile</p>
            </NavLink>
        </ul>
      }
    </div>
  )
}

export default Sidebar
