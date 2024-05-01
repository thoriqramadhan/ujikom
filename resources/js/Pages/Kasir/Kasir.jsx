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

export default function Kasir({menus , categories , orders, users, orderselesai, managements, orderitems, loginuser, orderbelumdibayar}) {
  const [clickedAt , setClickedAt] = useState('Menu')
  const [UI , setUI] = useState(<Menu menus={menus} categories={categories}/>)
  console.log(orderselesai)
  useEffect(()=> {
    if(clickedAt == 'Menu'){
      setUI(<Menu menus={menus} categories={categories}/>)
    }else if(clickedAt == 'Order'){
      setUI(<Order orders={orders} managements={managements} orderitems={orderitems} orderbelumdibayar={orderbelumdibayar}/>)
    }else if(clickedAt == 'History'){
      setUI(<History orderselesai={orderselesai} orderitems={orderitems}/>)
    }else{
      setUI(<Settings users={users} loginuser={loginuser}/>)
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
