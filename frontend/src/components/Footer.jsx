import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
function Footer() {

    return (
        <div className='mt-24 mb-10 text-gray-700'>
            <div className='grid grid-cols-2 gap-20'>
                {/* left */}
                <div className=''>
                    <img className='h-16 w-44' src={assets.logo} alt="" />
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem rerum animi molestiae natus aut est saepe, maiores aliquam odit officia provident.</p>
                </div>

                {/* centre */}
                <div className='grid grid-cols-2 gap-24 mt-6'>
                <div className=''>
                    <p className='mb-2 font-serif text-xl text-black'>COMPANY</p>
                    <ul className='hover:cursor-pointer'>
                        
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                {/* right */}
                <div className=''>
                    <p className='mb-2 font-serif text-xl text-black'>GET IN TOUCH</p>
                    <p>+1-121-345-6547</p>
                    <p>dummy@gmail.com</p>
                </div>
                </div>
               
            </div>
        </div>


    )
}

export default Footer
