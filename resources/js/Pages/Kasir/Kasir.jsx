// Kasir.jsx
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import MenuHeader from '@/Components/MenuHeader';
import TextInput from '@/Components/TextInput';
import MenuTab from '@/Components/MenuTab';
import MenuCard from '@/Components/MenuCard';
import SideNav from '@/Components/SideNav';
import MenuHistory from '@/Components/MenuHistory';

export default function Kasir({menus , categories}) {
  const [openSide, setOpenSide] = useState(false);
  const [selectedFood , setSelectedFood] = useState([]);
  console.log(menus)
  console.log(categories)
  return (
    <>
      <Head title='Kasir' />
      <div className="w-full h-[100vh] flex ">
        <SideNav />
        <div className="flex flex-col flex-1 h-[100vh] ml-16 overflow-scroll" id='body'>
          <div className="pt-[55px] px-[30px] flex justify-between">
            <MenuHeader />
            <div className="w-[60%] h-fit relative">
              <div className="w-[25px] h-[25px] bg-black absolute left-2 bottom-3 rounded-full"></div>
              <TextInput className="pl-[40px] h-[50px] w-[100%]" placeholder='Cari menu' />
            </div>
          </div>

          <div className="bg-[#F9F9F9] h-fit pt-[40px] mt-[46px]">
            <MenuTab categories={categories} menus={menus} selectedFood={selectedFood} setSelectedFood={setSelectedFood}/>
          </div>

        </div>
        <MenuHistory openSide={openSide} setOpenSide={setOpenSide} selectedFood={selectedFood} setSelectedFood={setSelectedFood}/>
        <div onClick={() => setOpenSide(true)} className={`w-[50px] h-[50px] bg-[#7D5E42] rounded-full fixed flex justify-center items-center text-2xl text-white right-4 top-1/2 cursor-pointer ${openSide ? 'hidden' : 'block'}`}>{'<'}</div>
      </div>
    </>
  )
}
