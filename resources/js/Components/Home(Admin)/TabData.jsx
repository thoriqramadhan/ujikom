import React from 'react'

function TabData({day , value}) {
  return (
    <>
    {value === 0 ? 
      <div className={`w-[45px] relative group ml-[8%]`} style={{ height: `100%` }}>
        <p className='absolute -bottom-8 text-sm opacity-0 group-hover:opacity-100 font-bold'>{day}</p>
        <p className='absolute -bottom-12 text-sm opacity-0 group-hover:opacity-100 text-center'>{value}%</p>
      </div>
      :
      <div className={`w-[45px] bg-[#C5A68B] relative group ml-[8%]`} style={{ height: `${value}%` }}>
        <p className='absolute -bottom-8 text-sm opacity-0 group-hover:opacity-100 font-bold'>{day}</p>
        <p className='absolute -bottom-12 text-sm opacity-0 group-hover:opacity-100 text-center'>{value}%</p>
    </div>
    } 
    
    </>
  )
}

export default TabData