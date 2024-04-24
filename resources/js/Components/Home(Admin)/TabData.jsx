import React from 'react'

function TabData({day , value}) {
  return (
<div className={`w-[45px] h-[25%] bg-[#C5A68B] relative group ml-[8%]`}>
        <p className='absolute -bottom-8 text-sm opacity-0 group-hover:opacity-100 font-bold'>{day}</p>
        <p className='absolute -bottom-12 text-sm opacity-0 group-hover:opacity-100 text-center'>{value}%</p>
    </div>
  )
}

export default TabData