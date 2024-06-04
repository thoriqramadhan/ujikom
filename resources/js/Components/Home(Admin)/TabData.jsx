import React from 'react'
import { formatRupiah } from '@/module/rupiah-formater'

function TabData({day , percentage, value}) {
  let values = percentage
  if(values >= 100){
    values = 100
  }
  return (
    <>
      <div className={`w-[45px] bg-[#C5A68B] relative group ml-[8%]`} style={{ height: `${values}%` }}>
          <p className='absolute -bottom-8 text-sm opacity-0 group-hover:opacity-100 font-bold'>{day}</p>
          <p className='absolute -bottom-12 text-sm opacity-0 group-hover:opacity-100 text-center'>{percentage}%</p>
          <p className='absolute -bottom-[70px] text-sm opacity-0 group-hover:opacity-100 text-center'>{formatRupiah(value)}</p>
      </div>
    </>
  )
}

export default TabData