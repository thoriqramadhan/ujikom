import React, { useState } from 'react'
import HistorySvg from '@/Components/svgComp/HistorySvg'
import MenuSvg from './svgComp/MenuSvg'
import SettingsSvg from './svgComp/SettingsSvg'
import OrderSvg from './svgComp/OrderSvg'

function SideNav() {
  const [clickedAt , setClickedAt] = useState('Menu')
  return (
    <div className="h-[100vh] w-16 fixed top-0 left-0 z-10 flex flex-col" id='sidenav'>
        <div className="h-[70%] flex flex-col items-center gap-y-8 mt-[15px]">
          <div className="w-[40px] h-[40px] bg-black rounded-full"></div>
          <MenuSvg clickedAt={clickedAt} setClickedAt={setClickedAt}/>
          <OrderSvg clickedAt={clickedAt} setClickedAt={setClickedAt}/>
          <HistorySvg clickedAt={clickedAt} setClickedAt={setClickedAt}/>

        </div>
        <div className="h-[30%] flex justify-center items-end pb-[20px]">
          <SettingsSvg clickedAt={clickedAt} setClickedAt={setClickedAt}/>
        </div>
      </div>
  )
}

export default SideNav