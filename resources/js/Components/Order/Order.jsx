import BodyLayout from '@/Layouts/BodyLayout'
import React, { useEffect, useState } from 'react'
import LogoDate from '../Logo_date'
import SearchSvg from '../svgComp/SearchSvg'
import TextInput from '../TextInput'
import TableData from '../TableData'

const posts = [
  {customer_name : 'customer_name',
  order_time :'order_time',
  status: 'status'},
  // {customer_name : 'thoriq',
  // order_time :'08.00',
  // status: 'lunas'},
  // {customer_name : 'thoriq',
  // order_time :'08.00',
  // status: 'lunas'},
  // {customer_name : 'thoriq',
  // order_time :'08.00',
  // status: 'lunas'},
  // {customer_name : 'thoriq',
  // order_time :'08.00',
  // status: 'lunas'},
  // {customer_name : 'yones',
  // order_time :'08.00',
  // status: 'lunas'},
  // {customer_name : 'yones',
  // order_time :'08.00',
  // status: 'lunas'},
  // {customer_name : 'yones',
  // order_time :'08.00',
  // status: 'lunas'},
  // {customer_name : 'yones',
  // order_time :'08.00',
  // status: 'lunas'},
  // {customer_name : 'yones',
  // order_time :'08.00',
  // status: 'lunas'},
  // {customer_name : 'yones',
  // order_time :'08.00',
  // status: 'lunas'},
  // // ...data lainnya
];


function Order({orders}) {
  const [dataOrder , setDataOrder] = useState(orders || '')
  console.log(dataOrder)
  const [currentPage , setcurrentPage] = useState(1)
  const [postPerPage,  setPostPerPage] = useState(5)
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(posts.length / postPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(posts.length / postPerPage)
  console.log(pageNumbers)
  

  function incrementHandler(){
    if(currentPage == pageNumbers.length){
      return
    }
    setcurrentPage(prevState => prevState + 1)
  }
  function decrementHandler(){
    if(currentPage == 1){
      return
    }
    setcurrentPage(prevState => prevState - 1)
  }
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

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
          <div className="h-[50px] w-[50px] bg-white border-2 rounded-xl flex justify-center items-center">{currentPage}</div>
          <div onClick={incrementHandler} className="h-[50px] w-[50px] bg-white border-2 rounded-xl flex justify-center items-center cursor-pointer">{'>'}</div>
        </div>
      </div>
      <table className='w-full mt-[24px] overflow-hidden rounded-xl'>
        <tr className='rounded-2xl bg-[#F3F3F3] h-[60px]'>
          <th className='flex-1 opacity-60'>Nama Pembeli</th>
          <th className='flex-1 opacity-60'>Waktu</th>
          <th className='flex-2 opacity-60'>Status</th>
          <th></th>
        </tr>
        {dataOrder.map(orders => {
        return (
          <tr className='h-fit border-bottom-1'>
          <TableData text={orders.customer_name}/>
          <TableData text={orders.order_time}/>
          <TableData text={orders.status}/>
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