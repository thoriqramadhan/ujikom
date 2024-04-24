// Kasir.jsx
import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import SideNav from '@/Components/SideNav/SideNav';
import Menu from '@/Components/Menu/Menu';
import Order from '@/Components/Order/Order';
import History from '@/Components/History/History';
import Settings from '@/Components/Settings/Settings';
import MenuSvg from '@/Components/svgComp/MenuSvg';
import OrderSvg from '@/Components/svgComp/OrderSvg';
import HistorySvg from '@/Components/svgComp/HistorySvg';

export default function Kasir({menus , categories , orders}) {
  const [clickedAt , setClickedAt] = useState('Menu')
  const [UI , setUI] = useState(<Menu menus={menus} categories={categories}/>)
  const [modalData , setModalData] = useState(
    {
    name: 'Yudi Santoso',
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
    ]
  })
  const [openModal , setOpenModal] = useState(true)
  
  useEffect(()=>{
    localStorage.setItem('MODAL_DATA',JSON.stringify(modalData))
  },[modalData])

  useEffect(()=> {
    if(clickedAt == 'Menu'){
      setUI(<Menu menus={menus} categories={categories} modalData={modalData} setModalData={setModalData} openModal={openModal} setOpenModal={setOpenModal}/>)
    }else if(clickedAt == 'Order'){
      setUI(<Order orders={orders} modalData={modalData} setModalData={setModalData} openModal={openModal} setOpenModal={setOpenModal}/>)
    }else if(clickedAt == 'History'){
      setUI(<History />)
    }else{
      setUI(<Settings/>)
    }
  },[clickedAt])
  return (
    <>
      <Head title='Kasir' />
      <div className="w-full h-[100vh] flex ">
        <SideNav clickedAt={clickedAt} setClickedAt={setClickedAt}>
            <div className="w-[40px] h-[40px] bg-black rounded-full"></div>
            <MenuSvg clickedAt={clickedAt} setClickedAt={setClickedAt}/>
            <OrderSvg clickedAt={clickedAt} setClickedAt={setClickedAt}/>
            <HistorySvg clickedAt={clickedAt} setClickedAt={setClickedAt}/>
        </SideNav>
          {UI}
      </div>
    </>
  )
}
