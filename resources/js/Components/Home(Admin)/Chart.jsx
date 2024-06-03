
import React, { useEffect, useState } from 'react'
import ChartIndicator from './ChartIndicator'
import TabData from './TabData'

function Chart ({dailyIncome , incomeTarget}){
  const [dailyIncomes , setDailyIncomes] = useState(dailyIncome || [])
  const [incomeTargets , setIncomeTargets] = useState(0)
  const dailyPercentage = (value , target) => {
    return Math.round((value / target) * 100);
  }
  useEffect(() => {
    if (dailyIncome || incomeTarget) {
      setDailyIncomes(dailyIncome);
      let income = incomeTarget[0]
      setIncomeTargets(parseFloat(income.target))
    }
  }, [dailyIncome]);
  
  return (
    <div className="w-full h-fit mt-[15px] pt-[35px] pb-[50px] bg-white border px-[30px] rounded-xl relative">
          <div className="mb-[10px]">
            <p className='font-bold text-lg'>Pendapatan Hari Ini</p>
            <p className='opacity-50'>Pantau pendapatan anda lewat sini.</p>
          </div>
          <div className="w-full h-[286px] pt-[20px] flex justify-evenly items-end  relative">
            <ChartIndicator/>
            {dailyIncomes.map((item, index) => (
              <TabData key={index} day={item.day} percentage={dailyPercentage(item.value , incomeTargets)} value={item.value}/>
            ))}
          </div>

        </div>

  )
}

export default Chart
