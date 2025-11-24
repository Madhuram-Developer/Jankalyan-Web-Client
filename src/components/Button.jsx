import React from 'react'

const Button = ({className,children}) => {
  return (
    <button className={`rounded-lg ${className}`}>
        {children}
    </button>
  )
}

export default Button