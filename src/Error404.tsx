import React from 'react'
import error from "./assets/404-error-fix.jpg"

const Error404:React.FC = () => {
  return (
    <div className='text-center w-screen'>
      <img src={error} alt="" className='text-center' />
    </div>
  )
}

export default Error404