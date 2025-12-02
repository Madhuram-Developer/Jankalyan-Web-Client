import React from 'react'

const Button = ({className, children, ...props}) => {
  return (
    <button className={`rounded-lg cursor-pointer ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button