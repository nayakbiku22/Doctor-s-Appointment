import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

function RelatedDoctors({ docId, speciality }) {
    const { doctors } = useContext(AppContext)
    const [relDoc, setRelDoc] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            
            console.log(doctorsData)
            setRelDoc(doctorsData)
            
        }
    }, [doctors, speciality, docId])
    return (
        <div className='mt-10 '>
            <p className='text-2xl text-center text-gray-500'>Top Related doctors</p>
             <div className='grid items-center grid-cols-4 gap-5 mt-8 ml-2 ' >
           
                    {  
                        relDoc.slice(0,5).map((item,index)=>(
                            <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} key={index} className='border-slate-700 border-[1px] md:w-[200px] md:h-[280px] rounded-lg hover:translate-y-[-4px] transition-all duration-4000  hover:border-blue-700 hover:border-2'>
                                <img className='md:w-[200px] md:h-180px bg-sky-50 rounded-lg ' src={item.image} alt="" />
                                <div className='flex flex-row '>
                                    <span className='w-2 h-2 mt-[9px] ml-3 mr-1 bg-green-500 rounded-full'></span><p className='mt-1 text-sm font-medium text-green-500 '>Available</p>
                                </div>
                                <p className='ml-3 text-lg font-semibold '>{item.name}</p>
                                <p className='ml-3 text-slate-800'>{item.speciality}</p>
                             </div>
                             
                        ))
                    }
                   
                   
           
      </div>
        </div>
    )
}

export default RelatedDoctors
