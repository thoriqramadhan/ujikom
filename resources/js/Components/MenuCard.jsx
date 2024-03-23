import React from 'react'

function MenuCard() {
  return (
    <div className="w-[270px] h-[340px] rounded-[30px] bg-white border shadow-lg px-[20px] pt-[27px] pb-[18px] relative">
        <div className="h-[156px] w-[230px] bg-[#F4F4F4] rounded-[25px]"></div>
        <div className="h-fit w-full flex justify-between mt-2">
            <p className='font-bold text-[22px]'>{'American \n Latte'}</p>
            <p className='font-bold opacity-60 text-[20px]'>50K</p>
        </div>
        <div className="">
            
        </div>
        <button className='w-[227px] h-[55px] bg-[#7D5E42] rounded-[18px] text-white text-[18px] absolute bottom-3 left-5'>
            <p className='font-[500]'>Tambah</p>
        </button>
    </div>
  )
}

export default MenuCard