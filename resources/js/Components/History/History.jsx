import BodyLayout from '@/Layouts/BodyLayout'
import React, { useEffect } from 'react'
import LogoDate from '../Logo_date'
import SearchSvg from '../svgComp/SearchSvg'
import TextInput from '../TextInput'
import TableData from '../TableData'
import { useState } from 'react';
import DashedLine from '../DashedLine'
import { Head } from '@inertiajs/react'
import { formatRupiah } from '@/module/rupiah-formater'

const itemPost = [
  {
    id: 1,
    name: 'Thoriq',
    subTotal : `100K`,
    tax: `10K`,
    total: `110K`,
    menu: [
      {
        name : 'Ayam',
        total: 100,
        items: 1
      },
      {
        name : 'Sapi',
        total: 200,
        items: 2
      },
      {
        name : 'Ayam',
        total: 300,
        items: 3
      }
    ]
  },
  {
    id: 2,
    name: 'Thor',
    subTotal : `100K`,
    tax: `10K`,
    total: `110K`,
    menu: [
      {
        name : 'Ayam',
        total: 100,
        items: 2
      },
      {
        name : 'Babi',
        total: 100,
        items: 2
      },
      {
        name : 'Ayam',
        total: 100,
        items: 2
      }
    ]
  },
];

function History({orderselesai , orderitems}) {
  const [dataOrderSelesai , setDataOrderSelesai] = useState(orderselesai || '')
  const [currentPage , setcurrentPage] = useState(1)
  const [postPerPage,  setPostPerPage] = useState(5)
  const [menu , setMenu] = useState([])
  const [bill , setBill] = useState({
    total:0,
    tax:0,
  })
  const [customerName,setCustomerName] = useState('jo')
  const [openModal , setOpenModal] = useState(true)
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(dataOrderSelesai.length / postPerPage); i++) {
    pageNumbers.push(i);
  }
  

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
  const currentPosts = dataOrderSelesai.slice(indexOfFirstPost, indexOfLastPost);

  function detailHandler(id){
    const orderNow = orderselesai.find(order => order.id === id)
    const parsedData = JSON.parse(orderNow.data)

    setOpenModal(!openModal)

    setMenu(parsedData)
    setCustomerName(orderNow.customer_name)

  }
  
  useEffect(()=>{
    const bill = menu.reduce((accumulator,order) => accumulator + order.totalHarga, 0)
    const tax = bill * 0.1
    setBill({
      total: bill,
      tax:tax
    })
  },[menu])

  return (
    <BodyLayout className={'pt-[40px] px-[40px]'}>
      <Head title='History'/>
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
      <table className=' mt-[24px] overflow-hidden rounded-xl'>
        <tr className='rounded-2xl bg-[#F3F3F3] h-[60px]'>
          <th className='flex-1 opacity-60'>Nama Pembeli</th>
          <th className='flex-1 opacity-60'>Waktu</th>
          <th className='flex-2 opacity-60'>Status</th>
          <th></th>
        </tr>
        {
        dataOrderSelesai.length == 0 ? <p>Tidak ada data</p>  :
         currentPosts.map(orderselesai => {
        return (
          <tr className='h-fit border-bottom-1'>
          <TableData text={orderselesai.customer_name}/>
          <TableData text={orderselesai.order_time}/>
          <TableData text={orderselesai.status}/>
          <td>
          <div className="h-[60px] w-[100%] flex items-center justify-center" onClick={()=>{detailHandler(orderselesai.id)}}>
            <button className='w-[100px] py-[7px] bg-[#E8E8E8] rounded-lg border-gray-400 border'> 
            <span className='mr-[2px]'>I</span>
            <span className="opacity-60">Detail</span>
            </button>
          </div>
          </td>
        </tr>
        )
      })
      }
        
      </table>

          {/* modal */}
          <div className={`w-[900px] h-[500px] px-[25px] py-[25px] flex flex-col items-center absolute left-1/2 right-1/2 -translate-x-1/2 transition-all duration-1000 rounded-xl bg-white border shadow-lg ${openModal ? '-translate-y-[1000px]' : '-translate-y-0' }`}>
              <p className='text-xl font-bold'>Detail Pesanan</p>
              <p>Detail Pesanan punya {customerName}😁</p>
              <div className="w-full h-full mt-[10px] flex gap-x-[30px]">
              <div className="basis-2 flex-1 bg-white rounded-xl border ">
                <table className='w-full h-fit rounded-xl overflow-hidden bg-white'>
                  <tr className='rounded-2xl bg-[#F3F3F3] h-[60px]'>
                    <th className='flex-1 opacity-60'>Nama Makanan</th>
                    <th className='flex-1 opacity-60'>Jumlah</th>
                    <th className='flex-1 opacity-60'>Harga</th>
                  </tr>
                  {
                    menu.map((orderitems , index) => {
                      return (
                      <tr key={index} className='h-fit border-bottom-1'>
                        <TableData text={orderitems.name}/>
                        <TableData text={orderitems.items}/>
                        <TableData text={formatRupiah(orderitems.totalHarga)}/>
                      </tr>
                      )
                    }
                    )
                  
                  }
                  </table>
              </div>

              <div className="w-[330px] h-full border rounded-xl bg-white flex flex-col  py-[20px] px-[25px]">
                {itemPost.length == 0 ? <p>TIdak ada data</p> : (
                  <div className='flex-1'>
                  <div className="w-full flex justify-between">
                  <p className='opacity-30 font-bold'>Sub Total</p>
                  <p className='font-bold'>{formatRupiah(bill.total)}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p className='opacity-30 font-bold'>{'Pajak (10%)'}</p>
                  <p className='font-bold'>{formatRupiah(bill.tax)}</p>
                </div>
                <DashedLine />
                <div className="w-full flex justify-between mt-[20px]">
                  <p className='opacity-30 font-bold'>Total</p>
                  <p className='font-bold'>{formatRupiah(bill.total + bill.tax)}</p>
                </div>
                  </div>
                )
                }
                <button className='w-full rounded-[18px] py-[15px] font-bold text-[#797979] bg-[#F3F3F3] border-2' onClick={() => setOpenModal(!openModal)}>Kembali ke History</button>
              </div>
            </div>
          </div>
    </BodyLayout>
    )
}

export default History