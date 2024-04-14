import React from 'react'

function LogoDate() {
    const currentDate = new Date();
    const month = ['Januari', 'Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','Desember']
    const day = ['Minggu','Senin' ,'Selasa','Rabu','Kamis',"Jum'at",'Sabtu']
  return (
    <div className="">
      <h1 className='text-[24px] font-bold'>Menata Cafe</h1>
      <p className='opacity-50 font-[500] text-[16px]'>{day[currentDate.getDay()]}, {currentDate.getDate()} {month[currentDate.getMonth()]} {currentDate.getFullYear()}</p>
    </div>
  )
}

export default LogoDate