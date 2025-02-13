import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Success = () => {
  const location = useLocation()
    
    console.log("location",)  
  return (
    <div className=' dark:bg-gray-700 dark:text-white m-2 w-full max-w-md bg-red-200 p-4 py-5 rounded mx-auto flex flex-col justify-center items-center gap-5 dark:text-white dark:bg-gray-700'>
        <p className='text-gray-800 font-bold text-lg text-center'>{Boolean(location?.state?.text) ? location?.state?.text : "Payment" } Successfully</p>
        <Link to="/" className="border border-red-900 text-white-900 hover:bg-gray-900 hover:text-white transition-all px-4 py-1">Go To Home</Link>
    </div>
  )
}

export default Success
