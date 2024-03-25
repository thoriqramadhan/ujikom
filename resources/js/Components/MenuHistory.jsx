import React from 'react'
import DashedLine from './DashedLine'
import HistoryCard from './HistoryCard'
import TextInput from './TextInput'

function MenuHistory({openSide, setOpenSide}) {
  return (
    <div className={`h-[100vh] w-[400px] pl-[29px] pr-[40px] bg-white shadow-lg border transition-all duration-500 fixed right-0 ${openSide ? 'transform translate-x-0' : 'transform translate-x-[1000px]'} `}>
        <div onClick={()=> setOpenSide(false)} className="w-[70px] h-[70px] shadow-lg bg-[#7D5E42] text-white rounded-full absolute -left-10 top-1/2 cursor-pointer z-10 text-2xl flex justify-center items-center">{'<'}</div> 
        <div className="mt-[20px]">
            <p className='font-bold text-[26px]'>Pesanan</p>
            <TextInput className="w-full mt-[5px]" placeholder="Nama pembeli"/>
        </div>
        <div className="w-full h-[300px] mt-[25px] overflow-y-scroll flex flex-col flex-nowrap gap-2">
            <HistoryCard/>
            <HistoryCard/>
            <HistoryCard/>
            <HistoryCard/>
        </div>
        <div className="w-[350px] h-fit bg-[#FFFFFF] shadow-lg border mt-[20px] rounded-[20px]">
          <div className="px-[30px] mt-[25px]">
            <div className="w-full flex justify-between">
              <p className='opacity-30 font-bold'>Sub Total</p>
              <p className='font-bold'>76K</p>
            </div>
            <div className="w-full flex justify-between">
              <p className='opacity-30 font-bold'>{'Pajak (10%)'}</p>
              <p className='font-bold'>7.6K</p>
            </div>
            <DashedLine/>
            <div className="w-full flex justify-between mt-[20px]">
              <p className='opacity-30 font-bold'>Total</p>
              <p className='font-bold'>80.6K</p>
            </div>
          </div>
          <div className="mb-[20px] mx-[20px] h-[50px] mt-[20px] flex gap-3 justify-center">
            <button onClick={()=> setOpenSide(false)} className='flex-1 border-2 rounded-[18px]  font-bold'>Nanti</button>
            <button className='flex-1 rounded-[18px] font-bold text-white bg-[#7D5E42]'>Bayar</button>
          </div>
        </div>
    </div>
  )
}

export default MenuHistory