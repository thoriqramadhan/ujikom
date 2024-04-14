import BodyLayout from '@/Layouts/BodyLayout'
import React, { useEffect, useState } from 'react'
import LogoDate from '../Logo_date'
import SearchSvg from '../svgComp/SearchSvg'
import TextInput from '../TextInput'

function Order() {
  const [pagination , setPagination] = useState(1)
  function incrementHandler(){
    setPagination(prevState => prevState + 1)
  }
  function decrementHandler(){
    if(pagination == 1){
      return
    }
    setPagination(prevState => prevState - 1)
  }

  return (
    <BodyLayout className={'pt-[40px] px-[40px]'}>
      <LogoDate/>
      <div className="flex justify-between mt-[25px]">
        <div className="h-[50px] w-fit relative ">
          <TextInput placeholder={'Cari Pelanggan!'} className='w-[366px] h-[50px] pl-[40px]'/>
          <SearchSvg/>
        </div>
        <div className="h-[50px] w-fit flex gap-x-4">
          <div onClick={decrementHandler} className="h-[50px] w-[50px] bg-white border-2 rounded-xl flex justify-center items-center cursor-pointer">{'<'}</div>
          <div className="h-[50px] w-[50px] bg-white border-2 rounded-xl flex justify-center items-center">{pagination}</div>
          <div onClick={incrementHandler} className="h-[50px] w-[50px] bg-white border-2 rounded-xl flex justify-center items-center cursor-pointer">{'>'}</div>
        </div>
      </div>
      <table className='bg-red-100 mt-[24px] table-fixed'>
        <tr className=''>
          <th className='flex-1'>Nama Pembeli</th>
          <th className='flex-1'>Waktu</th>
          <th className='flex-2'>Detail</th>
          <th className='flex-2'>Status</th>
        </tr>
        <tr>
          <td>Jones</td>
          <td>10.00</td>
          <td>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos, optio.</td>
          <td>Incomplete</td>
        </tr>
      </table>
    </BodyLayout>
  )
}

export default Order