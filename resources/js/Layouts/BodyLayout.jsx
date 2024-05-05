import React from 'react'
import { useState } from 'react'

function BodyLayout({children , className}) {
  const [screenWidth , setScreenWidth] = useState(window.innerWidth)
  window.addEventListener('resize' , ()=>{
    setScreenWidth(window.innerWidth)
  })
  return (
    <>
    {screenWidth <= 750 ? 
    <div className={`px-[30px] pb-[80px] w-full h-[100vh] overflow-scroll ${className || ''}`}>
    {children}
    </div> :
    <div className={`flex flex-col flex-1 h-fit ${className || 'ml-16'}`}>
    {children}
    </div>
    }
    </>
  )
}

export default BodyLayout