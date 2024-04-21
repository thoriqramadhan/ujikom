import React from 'react'
import SettingsSvg from '../svgComp/SettingsSvg'

function DekstopNav({children , clickedAt , setClickedAt}) {
    console.log(children)
  return (
    <div className="h-[100vh] w-16 bg-white fixed top-0 left-0 z-10 flex flex-col" id='sidenav'>
        <div className="h-[70%] flex flex-col items-center gap-y-8 mt-[15px]">
          {children}
        </div>
        <div className="h-[30%] flex justify-center items-end pb-[20px]">
          <SettingsSvg clickedAt={clickedAt} setClickedAt={setClickedAt}/>
        </div>
    </div>
  )
}

export default DekstopNav