import React from 'react'

function ChartIndicator() {
  return (
    <div className="w-full h-full opacity-50 absolute bottom-0">
              <div className="w-full h-[20%] gap-x-[10px] flex items-end">
                <p>100</p>
                <div className="w-full h-[1px] bg-black"></div>
              </div>
              <div className="w-full h-[20%] gap-x-[10px] flex items-end">
                <p>80</p>
                <div className="w-full h-[1px] bg-black"></div>
              </div>
              <div className="w-full h-[20%] gap-x-[10px] flex items-end">
                <p>60</p>
                <div className="w-full h-[1px] bg-black"></div>
              </div>
              <div className="w-full h-[20%] gap-x-[10px] flex items-end">
                <p>40</p>
                <div className="w-full h-[1px] bg-black"></div>
              </div>
              <div className="w-full h-[20%] gap-x-[10px] flex items-end">
                <p>20</p>
                <div className="w-full h-[1px] bg-black"></div>
              </div>
              
            </div>
  )
}

export default ChartIndicator