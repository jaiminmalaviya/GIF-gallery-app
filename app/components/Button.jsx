import React from 'react'

const Button = ({ type, children, disabled }) => {
   return (
      <button
         type={type}
         className={`w-full text-white ${
            disabled ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
         } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
         disabled={disabled}
      >
         {children}
      </button>
   )
}

export default Button
