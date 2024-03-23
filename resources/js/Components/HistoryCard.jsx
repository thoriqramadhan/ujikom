import React, { useState } from 'react'

function HistoryCard() {
  const [number , setNumber] = useState(1)
  function decreaseHandler(){
    if(number == 1){
      return
    }
    setNumber(prevState => prevState - 1)
  }
  return (
    <div className="w-full h-[100px] bg-[#F9F9F9] rounded-[20px] shrink-0 flex items-center relative border shadow-sm ">
      <div className="w-[25px] h-[25px] bg-black rounded-full absolute right-2 top-2 cursor-pointer">

      </div>
                <div className="w-[80px] h-[75px] bg-[#D9D9D9] ml-[12px] rounded-[15px]">
                </div>
                <div className="flex flex-col ml-[10px]">
                    <p className='text-[20px] font-bold mb-[8px]'>White Coffe</p>
                    <p className='font-bold opacity-40'>32K</p>
                </div>
                <div className="flex h-[100%] justify-end items-end pb-[10px] pr-[10px] flex-1">
                    <div onClick={decreaseHandler} className="w-[25px] h-[25px] bg-[#D9D9D9] rounded-full flex justify-center items-center text-white cursor-pointer">-</div>
                    <p className='mx-[6px]'>{number}</p>
                    <div onClick={() => setNumber(prevState => prevState + 1)} className="w-[25px] h-[25px] bg-[#D9D9D9] rounded-full flex justify-center items-center text-white cursor-pointer">+</div>
                </div>
    </div>
  )
}

export default HistoryCard