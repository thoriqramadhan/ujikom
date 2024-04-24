import BodyLayout from '@/Layouts/BodyLayout'
import React, { useEffect, useState } from 'react'
import LogoDate from '../Logo_date'
import SearchSvg from '../svgComp/SearchSvg'
import TextInput from '../TextInput'
import TableData from '../TableData'
import PaynmentModal from '../PaynmentModal'

function Order({orders ,  modalData = { name: 'Yudi Santoso',
subTotal : 100,
tax: 10 ,
total: 110,
menu: [
  {
    name:'Ayam',
    item:1,
    total:100
  },
  {
    name:'Kambing',
    item:1,
    total:100
  }
]}, setModalData , openModal , setOpenModal}) {
  const [dataOrder , setDataOrder] = useState(orders || '')
  console.log(dataOrder)
  const [currentPage , setcurrentPage] = useState(1)
  const [postPerPage,  setPostPerPage] = useState(5)
  const [openModals , setOpenModals] = useState(openModal)
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(dataOrder.length / postPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(dataOrder.length / postPerPage)
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
  const currentPosts = dataOrder.slice(indexOfFirstPost, indexOfLastPost);
  function paynmentHandler(){
    console.log('In')
    setOpenModals(!openModals)
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
          <div className="h-[50px] w-[50px] bg-white border-2 rounded-xl flex justify-center items-center">{currentPage}</div>
          <div onClick={incrementHandler} className="h-[50px] w-[50px] bg-white border-2 rounded-xl flex justify-center items-center cursor-pointer">{'>'}</div>
        </div>
      </div>
      <table className='w-full mt-[24px] overflow-hidden rounded-xl'>
        <tr className='rounded-2xl bg-[#F3F3F3] h-[60px]'>
          <th className='flex-1 opacity-60'>Nama Pembeli</th>
          <th className='flex-1 opacity-60'>Waktu</th>
          <th className='flex-2 opacity-60'>Status</th>
          <th className='w-[200px]'></th>
        </tr>
        {dataOrder.map(orders => {
        return (
          <tr className='h-fit border-bottom-1'>
          <TableData text={orders.customer_name}/>
          <TableData text={orders.order_time}/>
          <TableData text={orders.status}/>
          <div className="flex flex-nowrap justify-center w-[250px]">

            <div className="h-[60px] w-[200px] flex items-center justify-center">
              <button className='w-[100px] py-[7px] bg-[#E8E8E8] rounded-lg border-gray-400 border'> 
              <span className='mr-[2px]'>I</span>
              <span className="opacity-60">Edit</span>
              </button>
            </div>
            <div className="h-[60px] w-[200px] flex items-center justify-center">
              <button className='w-[100px] py-[7px] bg-[#7D5E42] text-white rounded-lg border-gray-400 border'> 
              <span className='mr-[2px]'>I</span>
              <span className="" onClick={paynmentHandler}>Bayar</span>
              </button>
            </div>
          </div>
        </tr>
        )
      })}
        
      </table>
      <PaynmentModal modalData={modalData} openModal={openModals} paynmentHandler={paynmentHandler}/>
    </BodyLayout>
  )
}

export default Order