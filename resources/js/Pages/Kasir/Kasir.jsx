// Kasir.jsx
import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import SideNav from '@/Components/SideNav';
import Menu from '@/Components/Menu/Menu';
import Order from '@/Components/Order/Order';
import History from '@/Components/History/History';
import Settings from '@/Components/Settings/Settings';

export default function Kasir({menus , categories}) {
  const [clickedAt , setClickedAt] = useState('Menu')
  const [UI , setUI] = useState(<Menu menus={menus} categories={categories}/>)
  useEffect(()=> {
    if(clickedAt == 'Menu'){
      setUI(<Menu menus={menus} categories={categories}/>)
    }else if(clickedAt == 'Order'){
      setUI(<Order/>)
    }else if(clickedAt == 'History'){
      setUI(<History/>)
    }else{
      setUI(<Settings/>)
    }
  },[clickedAt])
  return (
    <>
      <Head title='Kasir' />
      <div className="w-full h-[100vh] flex ">
        <SideNav clickedAt={clickedAt} setClickedAt={setClickedAt}/>
          {UI}
      </div>
    </>
  )
}
