import BodyLayout from '@/Layouts/BodyLayout'
import React, { useEffect, useState } from 'react'
import LogoDate from '../Logo_date'
import SearchSvg from '../svgComp/SearchSvg'
import TextInput from '../TextInput'
import TableData from '../TableData'
import DashedLine from '../DashedLine'

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
        items: 2
      },
      {
        name : 'Sapi',
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
const posts = [
  {
    id:1,
    customer_name: 'Thoriq',
    order_time: '09:00',
    status: 'belum selesai'
  },
  {
    id:2,
    customer_name: 'Thor',
    order_time: '09:00',
    status: 'belum selesai'
  },
]

function Order({orders, orderitems}) {
  const [dataOrder , setDataOrder] = useState(orders || '')
  const [dataOrderItems , setDataOrderItems] = useState(orderitems || '')
  const [currentPage , setcurrentPage] = useState(1)
  const [postPerPage,  setPostPerPage] = useState(5)
  const [modalData, setModalData] = useState(itemPost)
  const [buyersMoney , setBuyersMoney] = useState(0)
  const [modalName,setModalName] = useState('')
  let total = parseFloat(modalData[0].total) - buyersMoney || 0
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(posts.length / postPerPage); i++) {
    pageNumbers.push(i);
  }

  const [openModal , setOpenModal] = useState(true)
  function paymentHandler(orderId) {
    const data = dataOrderItems.filter((item) => item.order_id === orderId);
    const order = orders.find(order => order.id === orderId);
  
// console.log(order);
    setModalData([...data,order]);
    console.log(modalData);
    setOpenModal(!openModal);
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
  function clientHandler(e){
    console.log('in')
    setBuyersMoney(parseFloat(e.target.value))
  }
  
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  useEffect(()=>{
    setModalName(modalData[0].name)
  },[modalData])
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
          <th className='w-[230px]'></th>
        </tr>
        {dataOrder.map(orders => {
        return (
          <tr className='h-fit border-bottom-1'>
          <TableData text={orders.customer_name}/>
          <TableData text={orders.order_time}/>
          <TableData text={orders.status}/>
          <div className="flex ">
            <div className="h-[60px] w-[100%] flex items-center justify-center">
              <button className='w-[100px] py-[7px] bg-[#E8E8E8] rounded-lg border-gray-400 border'> 
              <span className='mr-[2px]'>I</span>
              <span className="opacity-60">Edit</span>
              </button>
            </div>  
            <div className="h-[60px] w-[100%] flex items-center justify-center">
              <button className='w-[100px] py-[7px] bg-[#7D5E42] rounded-lg border-gray-400 border text-white'> 
              <span className='mr-[2px]'>I</span>
              <span className="" onClick={()=>{paymentHandler(orders.id)}}>Bayar</span>
              </button>
            </div>
          </div>
        </tr>
        )
      })}
        
      </table>

      {/* Modal */}
      <div className={`h-fit w-[75%] flex flex-col px-[25px] pb-[20px] items-center transition-all duration-1000  bg-white rounded-xl border shadow-lg absolute left-1/2 right-1/2 -translate-x-1/2 ${openModal ? '-translate-y-[1000px]' : 'translate-y-10 fixed'}`}>
        <p className='font-bold  mt-[30px] text-2xl'>Bayar Pesanan</p>
        {modalData.map((modalOrder, index) => (
  <p key={index[0]}>Langsung bayar pesanan punya {modalOrder ? modalOrder.customer_name : ''}</p>
))}
        <p className='text-xl absolute top-10 right-10 cursor-pointer' onClick={() => setOpenModal(!openModal)}>X</p>
        <div className="w-full h-fit mt-[10px] flex gap-x-[30px]">
          <div className="basis-2 flex-1 bg-white rounded-xl border ">
            <table className='w-full h-fit rounded-xl overflow-hidden bg-white'>
              <tr className='rounded-2xl bg-[#F3F3F3] h-[60px]'>
                <th className='flex-1 opacity-60'>Nama Makanan</th>
                <th className='flex-1 opacity-60'>Jumlah</th>
                <th className='flex-1 opacity-60'>Harga</th>
              </tr>
              {
                modalData.map((orderitems , index) => {
                  return (
                  <tr key={index} className='h-fit border-bottom-1'>
                    <TableData text={orderitems.name}/>
                    <TableData text={orderitems.items}/>
                    <TableData text={orderitems.totalHarga} prop='K'/>
                  </tr>
                  )
                }
                )
              
              }
              </table>
          </div>

          <div className="w-[330px] h-fit border rounded-xl bg-white flex flex-col justify-center py-[20px] px-[25px]">
            {modalData.length == 0 ? <p>TIdak ada data</p> : (
              <>
              <div className="w-full flex justify-between">
              <p className='opacity-30 font-bold'>Sub Total</p>
              <p className='font-bold'>{modalData[0].subTotal}K</p>
            </div>
            <div className="w-full flex justify-between">
              <p className='opacity-30 font-bold'>{'Pajak (10%)'}</p>
              <p className='font-bold'>{modalData[0].tax}K</p>
            </div>
            <DashedLine />
            <div className="w-full flex justify-between mt-[20px]">
              <p className='opacity-30 font-bold'>Total</p>
              <p className='font-bold'>{modalData[0].total}K</p>
            </div>
            <input type="number" name="" id="" className='mt-[20px]'  onChange={clientHandler} value={buyersMoney} placeholder='Uang Pembeli' />
            <div className="w-full flex justify-between mt-[20px] mb-[120px]">
              <p className='opacity-30 font-bold'>Kembalian</p>
              <p className='font-bold'>{total|| 0}K</p>
            </div>
              </>
            )
            }
            <button className='w-full rounded-[18px] py-[15px] font-bold text-white bg-[#7D5E42]'>Bayar</button>
          </div>
        </div>
      </div>
    </BodyLayout>
  )
}

export default Order