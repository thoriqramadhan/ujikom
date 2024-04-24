import React, { useEffect, useState } from 'react'
import HistorySvg from '@/Components/svgComp/HistorySvg'
import MenuSvg from '../svgComp/MenuSvg'
import SettingsSvg from '../svgComp/SettingsSvg'
import OrderSvg from '../svgComp/OrderSvg'
import DekstopNav from './DekstopNav'
import MobileNav from './MobileNav'

function SideNav({ screenWidth, clickedAt , setClickedAt , children}) {
  const [UI,setUI] = useState(<DekstopNav children={children} clickedAt={clickedAt} setClickedAt={setClickedAt}/>)
  useEffect(()=>{
    if(screenWidth <= 1024){
      setUI(<MobileNav children={children}/>)
    }else{
      setUI(<DekstopNav children={children} clickedAt={clickedAt} setClickedAt={setClickedAt}/>)
    }
  },[clickedAt , screenWidth])

  return (
    <>
    {UI}
    </>
  )
}

export default SideNav