import React, { useState } from 'react'
import MenuHeader from '@/Components/Menu/MenuHeader';
import TextInput from '@/Components/TextInput';
import MenuTab from '@/Components/Menu/MenuTab';
import MenuHistory from '@/Components/Menu/MenuHistory';
import SearchSvg from '@/Components/svgComp/SearchSvg';
import { stringify } from 'postcss';

function Menu({menus , categories}) {
    const [openSide, setOpenSide] = useState(false);
    const strg = JSON.parse(localStorage.getItem('ORDER_HISTORY'))
    const [selectedFood , setSelectedFood] = useState(strg || []);
  return (
    <>
    <div className="flex flex-col flex-1 h-[100vh] ml-16 overflow-scroll" id='menu'>
          <div className="pt-[55px] px-[30px] flex justify-between" id='header'>
            <MenuHeader />
            <div className="w-[60%] h-fit relative">
              <SearchSvg/>
              <TextInput className="pl-[40px] h-[50px] w-[100%]" placeholder='Cari menu' />
            </div>
          </div>

          <div className="bg-[#F9F9F9] h-fit pt-[40px] mt-[46px]" id='body'>
            <MenuTab categories={categories} menus={menus} selectedFood={selectedFood} setSelectedFood={setSelectedFood}/>
          </div>

    </div>
        <MenuHistory openSide={openSide} setOpenSide={setOpenSide} selectedFood={selectedFood} setSelectedFood={setSelectedFood}/>
        <div onClick={() => setOpenSide(true)} className={`w-[50px] h-[50px] bg-[#7D5E42] rounded-full fixed flex justify-center items-center text-2xl text-white right-4 top-1/2 cursor-pointer ${openSide ? 'hidden' : 'block'}`}>{'<'}</div>
    </>
  )
}

export default Menu