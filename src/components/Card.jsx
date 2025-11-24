import React from 'react'

const Card = ({className,children}) => {
  return (
    <div className={`bg-white shadow-[0_0_12px_0_#0000005E]  rounded-xl ${className}`}>
        {children}
    </div>
  )
}

export default Card