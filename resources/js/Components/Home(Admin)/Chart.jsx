import React from 'react'
import ChartIndicator from './ChartIndicator'
import TabData from './TabData'

function Chart() {
    const chart = {
        target: 100,
        data:[
            {
                day: 'Senin',
                value: countTarget(20 , 100)
            }
        ]
    }
    console.log(chart.data.map(item => console.log(item.value)))
    function countTarget(value , target){
        return (value / target) * 100
    }
  return (
    <div className="w-full h-fit mt-[15px] pt-[35px] pb-[50px] bg-white border px-[30px] rounded-xl relative">
          <div className="mb-[10px]">
            <p className='font-bold text-lg'>Pendapatan Hari Ini</p>
            <p className='opacity-50'>Pantau pendapatan anda lewat sini.</p>
          </div>
          <div className="w-full h-[250px] pt-[20px] flex justify-evenly items-end  relative">
            <ChartIndicator/>
            <TabData day={'Senin'} value={50}/>
            <TabData day={'Selasa'} value={70}/>
            <TabData day={'Rabu'} value={50}/>
            <TabData day={'Kamis'} value={23}/>
            <TabData day={"Jum'at"} value={19}/>
            <TabData day={'Sabtu'} value={30}/>
            <TabData day={'Minggu'} value={100}/>
          </div>

        </div>
  )
}

export default Chart