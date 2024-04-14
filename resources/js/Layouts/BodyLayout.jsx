import React from 'react'

function BodyLayout({children , className}) {
  return (
    <div className={`flex flex-col flex-1 h-fit ml-16 ${className || ''}`}>
        {children}
    </div>
  )
}

export default BodyLayout