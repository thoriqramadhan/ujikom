import BodyLayout from '@/Layouts/BodyLayout'
import React, { useEffect, useState } from 'react'
import LogoDate from '../Logo_date'
import SearchSvg from '../svgComp/SearchSvg'
import TextInput from '../TextInput'
import TableData from '../TableData'
import DashedLine from '../DashedLine'
import ModalHistoryCard from './ModalHistoryCard'
import { Head } from '@inertiajs/react'
import {Inertia} from '@inertiajs/inertia'
import { formatRupiah } from '@/module/rupiah-formater'

function Order({orders, orderitems, orderbelumdibayar}) {
  const [currentPage , setcurrentPage] = useState(1)
  const [postPerPage,  setPostPerPage] = useState(5)
  const [openModalPayment , setOpenModalPayment] = useState(true)
  // paymnet history data
  const [buyersMoney , setBuyersMoney] = useState(0)
  const [bill , setBill] = useState({
    subTotal : 0,
    tax: 0,
    total: 0
  })
  let change = buyersMoney  -  bill.total|| 0
  // 
  const pageNumbers = []
  
  for (let i = 1; i <= Math.ceil(orderbelumdibayar.length / postPerPage); i++) {
    pageNumbers.push(i);
  }
console.log(orders.id)
  function editHandler(id){
    const orderNow = orders.find(order => order.id === id)
    const parsedData = JSON.parse(orderNow.data)

    setModalName(orderNow.customer_name)
    setEditModalData(parsedData)
    setOpenModalEdit(!openModalEdit)
  }
  const [tes, setTes] = useState('');
  function paymentHandler(id) {
    setTes(id);
    const orderNow = orders.find(order => order.id === id);
    if (!orderNow) {
      console.error(`Order with id ${id} not found`);
      return;
    }
    // tes = orderNow
    const parsedData = JSON.parse(orderNow.data);
    console.log(orderNow, parsedData);
    const subTotal = parsedData.reduce((init, current) => init + current.totalHarga, 0);
    setBill({
      subTotal: subTotal,
      tax: subTotal * 0.1,
      total: subTotal + (subTotal * 0.1)
    });
  
    setModalName(orderNow.customer_name);
    setModalData(parsedData);
    setOpenModalPayment(!openModalPayment);
  }
  console.log(orders);
  
  // modal datas
  const [openModalEdit , setOpenModalEdit] = useState(true)
  const [modalData, setModalData] = useState(orderbelumdibayar)
  const [modalName,setModalName] = useState('')
  const [editModalData , setEditModalData] = useState([])
  const [idNow,setIdNow] = useState('');
  
  function incrementHandler(){
    console.log('in' , currentPage , pageNumbers)
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
    setBuyersMoney(parseFloat(e.target.value))
  }
  
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = orderbelumdibayar.slice(indexOfFirstPost, indexOfLastPost);
  useEffect(()=>{
    console.log(orders)
    console.log(buyersMoney  -  bill.total)
    console.log(change)
  },[editModalData,modalData])

  const [orderStatus, setOrderStatus] = useState({});

  useEffect(() => {
    // Inisialisasi status pesanan saat komponen dimuat
    const initialOrderStatus = {};
    orders.forEach(order => {
      initialOrderStatus[order.id] = order.status;
    });
    setOrderStatus(initialOrderStatus);
  }, [orders]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrderStatus(prevStatus => ({
      ...prevStatus,
      [orderId]: newStatus,
    }));
  };

  const handlePayment = () => {
    Inertia.post(`/kasir/${tes}`).then(() => {
      console.log('Order marked as paid successfully.');
      // Tambahkan tindakan lain jika diperlukan setelah pesanan berhasil diperbarui
  
      // Reset atau lakukan tindakan lainnya setelah pembayaran berhasil
  
      // Refresh halaman untuk mendapatkan daftar pesanan terbaru
      Inertia.reload();
    }).catch((error) => {
      console.error('Failed to mark order as paid:', error);
      // Tangani kesalahan jika gagal memperbarui pesanan
    });
  };
  
  return (
    <BodyLayout className={'pt-[40px] px-[40px]'}>
      <Head title='Order'/>
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
      <table className='w-full mt-[24px] mb-[24px] overflow-hidden rounded-xl'>
        <tr className='rounded-2xl bg-[#F3F3F3] h-[60px]'>
          <th className='flex-1 opacity-60'>Nama Pembeli</th>
          <th className='flex-1 opacity-60'>Waktu</th>
          <th className='flex-2 opacity-60'>Status</th>
          <th className='w-[230px]'></th>
        </tr>
        {currentPosts.length == 0 ?
        <tr className=''>
          <td className=''>
            tidak ada data
          </td>
        </tr>
        :
        currentPosts.map(orders => {
          return (
            <tr className='h-fit border-bottom border'>
            <TableData text={orders.customer_name}/>
            <TableData text={orders.order_time}/>
            <TableData text={orders.status}/>
            <div className="flex ">
              <div className="h-[60px] w-[100%] flex items-center justify-center" onClick={()=>{editHandler(orders.id)}}>
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
        })
        }
        
      </table>

      {/* Modal payment */}
      <div className={`h-fit w-[75%] flex flex-col px-[25px] pb-[20px] items-center transition-all duration-1000  bg-white rounded-xl border shadow-lg absolute left-1/2 right-1/2 -translate-x-1/2 ${openModalPayment ? '-translate-y-[1000px]' : 'translate-y-10 fixed'}`}>
        <p className='font-bold  mt-[30px] text-2xl'>Bayar Pesanan</p>
        <p>Langsung bayar pesanan punya {modalName}</p>

        <p className='text-xl absolute top-10 right-10 cursor-pointer' onClick={() => setOpenModalPayment(!openModalPayment)}>X</p>
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
                    <TableData text={formatRupiah(orderitems.totalHarga)}/>
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
              <p className='font-bold'>{formatRupiah(bill.subTotal)}</p>
            </div>
            <div className="w-full flex justify-between">
              <p className='opacity-30 font-bold'>{'Pajak (10%)'}</p>
              <p className='font-bold'>{formatRupiah(bill.tax)}</p>
            </div>
            <DashedLine />
            <div className="w-full flex justify-between mt-[20px]">
              <p className='opacity-30 font-bold'>Total</p>
              <p className='font-bold'>{formatRupiah(bill.total)}</p>
            </div>
            <input type="number" name="" id="" className='mt-[20px]'  onChange={clientHandler} value={buyersMoney} placeholder='Uang Pembeli' />
            <div className="w-full flex justify-between mt-[20px] mb-[120px]">
              <p className='opacity-30 font-bold'>Kembalian</p>
              <p className='font-bold'>{formatRupiah(change) || 0}</p>
            </div>
              </>
            )
            }
            
         
  <button className='w-full rounded-[18px] py-[15px] font-bold text-white bg-[#7D5E42]' onClick={() => handlePayment()}>Bayar</button>

          </div>
        </div>  
      </div>

      {/* Modal edit */}
      
      <div className={`h-fit w-[75%] flex flex-col px-[25px] pb-[20px] items-center transition-all duration-1000 overflow-y-hidden  bg-white rounded-xl border shadow-lg absolute left-1/2 right-1/2 -translate-x-1/2 ${openModalEdit ? '-translate-y-[1000px]' : 'translate-y-10 fixed'}`}>
        <p className='font-bold  mt-[30px] text-2xl'>Edit Pesanan</p>
        <p>Edit pesanan punya {modalName}</p>
        <p className='text-xl absolute top-10 right-10 cursor-pointer' onClick={() => setOpenModalEdit(!openModalEdit)}>X</p>

        <div className="flex w-full h-fit gap-x-[30px] mt-[25px]">
          <div className="flex-1">
            <div className= " w-full h-[50px] relative">
              <input type="text" className='w-full h-[50px] pl-[40px] rounded-xl' placeholder='Cari Menu'/>
              <SearchSvg/>
            </div>
            {/* modal edit content */}
            <div className="w-full h-[400px] justify-evenly flex gap-x-[10px] gap-y-[10px] flex-wrap overflow-scroll pt-[10px]">
              {
                editModalData.map(menu => (
                  <div className="bg-white w-[230px] border shadow-lg  h-fit rounded-lg px-[15px] py-[15px]">
                      <div className="w-full h-[150px] rounded-lg bg-gray-400"></div>
                      <div className="h-fit w-full flex flex-col justify-between mt-2">
                        <p className='font-bold text-[22px]'>{menu.name}</p>
                        <p className='font-bold opacity-60 text-[20px]'>{formatRupiah(menu.totalHarga)}</p>
                      </div>
                      <button className='mt-[20px] w-full rounded-[18px] py-[15px] font-bold border-2 bg-[#F3F3F3]'>Hapus</button>
                  </div>
                ))
              }
              
            </div>
          </div>
          {/* modal history */}
          <div className="w-[330px] border px-[15px] py-[15px] flex flex-col ">
            <div className="w-full h-[350px] overflow-scroll flex flex-col gap-y-[10px]">
              {
                editModalData.map(menu => (
                  <ModalHistoryCard name={menu.name} item={menu.items} initialPrice={menu.totalHarga} menu={menu} id={idNow}/>
                ))
              }
            </div>
            <button className='mt-[20px] w-full rounded-[18px] py-[15px] font-bold text-white bg-[#7D5E42]'>Simpan</button>
          </div>
        </div>
      </div>
      
    </BodyLayout>
  )
}

export default Order