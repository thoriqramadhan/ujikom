
import React, { useEffect, useState } from 'react'
import ChartIndicator from './ChartIndicator'
import TabData from './TabData'

function Chart({dailyIncome}){
  const dailyTarget = 1000000;
  const dailyPercentage = (value , target) => {
    return Math.round((value / target) * 100);
  }
  const [dailyIncomes , setDailyIncomes] = useState({
    monday: dailyIncome?.Monday || 0,
    tuesday: dailyIncome?.Tuesday || 0,
    wednesday: dailyIncome?.Wednesday || 0,
    thursday : dailyIncome?.Thursday || 0,
    friday : dailyIncome?.Friday || 0,
    saturday : dailyIncome?.Saturday || 0,
    sunday : dailyIncome?.Sunday || 0
  })
  useEffect(()=>{
    setDailyIncomes(dailyIncomes)
  })
  console.log(dailyIncomes , dailyIncome)
  return (
    <div className="w-full h-fit mt-[15px] pt-[35px] pb-[50px] bg-white border px-[30px] rounded-xl relative">
          <div className="mb-[10px]">
            <p className='font-bold text-lg'>Pendapatan Hari Ini</p>
            <p className='opacity-50'>Pantau pendapatan anda lewat sini.</p>
          </div>
          <div className="w-full h-[286px] pt-[20px] flex justify-evenly items-end  relative">
            <ChartIndicator/>
            <TabData day={'Senin'} value={dailyPercentage(dailyIncomes.monday , dailyTarget)}/>
            <TabData day={'Selasa'} value={dailyPercentage(dailyIncomes.tuesday , dailyTarget)}/>
            <TabData day={'Rabu'} value={dailyPercentage(dailyIncomes.wednesday , dailyTarget)}/>
            <TabData day={'Kamis'} value={dailyPercentage(dailyIncomes.thursday , dailyTarget)}/>
            <TabData day={"Jum'at"} value={dailyPercentage(dailyIncomes.friday , dailyTarget)}/>
            <TabData day={'Sabtu'} value={dailyPercentage(dailyIncomes.saturday , dailyTarget)}/>
            <TabData day={'Minggu'} value={dailyPercentage(dailyIncomes.sunday , dailyTarget)}/>
          </div>

        </div>

  )
}

export default Chart
