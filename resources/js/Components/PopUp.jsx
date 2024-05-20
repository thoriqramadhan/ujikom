import React, { useEffect, useState } from 'react'
import CloseSvg from './svgComp/CloseSvg'
import WarningSvg from './svgComp/WarningSvg'

function PopUp({condition , msg , setCondition}) {
  return (
    <div className={`absolute w-full h-[200px] bg-white z-10 flex flex-col shadow-lg rounded-xl transition-all duration-1000 ${condition ? 'translate-y-0' : '-translate-y-[500px]'} md:w-[600px] md:translate-x-1/2`}>
        <div className="w-full h-fit py-2 px-2 flex justify-between border">
            {/* icon and text header */}
            <div className="flex gap-x-[4px] justify-center">
                <WarningSvg width={30} height={30}/>
                <p className='text-xl font-bold'>Message</p>
            </div>
            {/* body */}
            <CloseSvg setOpenModal={setCondition} openModal={condition}/>
        </div>
        <div className="w-full flex-1 flex  items-center  px-[40px] gap-x-[10px]">
            <WarningSvg width={60} height={60}/>
            <div className="flex-1 pl-[10px]">
                <p className='font-bold text-lg'>Warning Modal</p>
                <p className='opacity-50'>{msg}</p>
            </div>
        </div>
    </div>
  )
}

export default PopUp