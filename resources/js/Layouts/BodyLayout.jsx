import React from 'react'

function BodyLayout({children , className}) {
  return (
    <div className={`flex flex-col flex-1 h-[100vh] ml-16 overflow-scroll ${className || ''}`}>
        {children}
    </div>
  )
}

export default BodyLayout