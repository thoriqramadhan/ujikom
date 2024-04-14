import BodyLayout from '@/Layouts/BodyLayout'
import React, { useEffect, useState } from 'react'
import LogoDate from '../Logo_date'
import SearchSvg from '../svgComp/SearchSvg'
import TextInput from '../TextInput'
import TableData from '../TableData'

const data = ['','']

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
      <table className=' mt-[24px] overflow-hidden rounded-xl'>
        <tr className='rounded-2xl bg-[#F3F3F3] h-[60px]'>
          <th className='flex-1 opacity-60'>Nama Pembeli</th>
          <th className='flex-1 opacity-60'>Waktu</th>
          <th className='flex-2 opacity-60'>Status</th>
          <th></th>
        </tr>
        {data.map(data => {
        return (
          <tr className='h-fit border-bottom-1'>
          <TableData text={'Jones el nino'}/>
          <TableData text={'08.35'}/>
          <TableData text={'Dalam Pembuatan'}/>
          <div className="h-[60px] w-[100%] flex items-center justify-center">
            <button className='w-[100px] py-[7px] bg-[#E8E8E8] rounded-lg border-gray-400 border'> 
            <span className='mr-[2px]'>I</span>
            <span className="opacity-60">Edit</span>
            </button>
          </div>
        </tr>
        )
      })}
        
      </table>
    </BodyLayout>
  )
}

export default Order