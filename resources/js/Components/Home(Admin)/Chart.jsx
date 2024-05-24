
import React from 'react'
import ChartIndicator from './ChartIndicator'
import TabData from './TabData'

function Chart() {
  return (
    <div className="w-full h-fit mt-[15px] pt-[35px] pb-[50px] bg-white border px-[30px] rounded-xl relative">
          <div className="mb-[10px]">
            <p className='font-bold text-lg'>Pendapatan Hari Ini</p>
            <p className='opacity-50'>Pantau pendapatan anda lewat sini.</p>
          </div>
          <div className="w-full h-[286px] pt-[20px] flex justify-evenly items-end  relative">
            <ChartIndicator/>
            <TabData day={'Senin'} value={50}/>
            <TabData day={'Selasa'} value={70}/>
            <TabData day={'Rabu'} value={60}/>
            <TabData day={'Kamis'} value={43}/>
            <TabData day={"Jum'at"} value={71}/>
            <TabData day={'Sabtu'} value={30}/>
            <TabData day={'Minggu'} value={100}/>
          </div>

        </div>
  )
}

export default Chart
