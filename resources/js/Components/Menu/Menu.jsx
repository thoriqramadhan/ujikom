import React, { useState } from 'react'
import TextInput from '@/Components/TextInput';
import MenuTab from '@/Components/Menu/MenuTab';
import MenuHistory from '@/Components/Menu/MenuHistory';
import SearchSvg from '@/Components/svgComp/SearchSvg';
import { stringify } from 'postcss';
import BodyLayout from '@/Layouts/BodyLayout';
import LogoDate from '../Logo_date';

function Menu({menus , categories}) {
    const [openSide, setOpenSide] = useState(false);
    const strg = JSON.parse(localStorage.getItem('ORDER_HISTORY'))
    const [selectedFood , setSelectedFood] = useState(strg || []);

    console.log(selectedFood)

  return (
    <>
    <BodyLayout>
      <div className="pt-[40px] px-[40px] flex justify-between" id='header'>
            <LogoDate/>
            <div className="w-[60%] h-fit relative">
              <SearchSvg/>
              <TextInput className="pl-[40px] h-[50px] w-[100%]" placeholder='Cari menu' />
            </div>
          </div>

          <div className="bg-[#F9F9F9] h-fit pb-[10%] pt-[40px] mt-[46px]" id='body'>
            <MenuTab categories={categories} menus={menus} selectedFood={selectedFood} setSelectedFood={setSelectedFood}/>
          </div>
    </BodyLayout>
        <MenuHistory openSide={openSide} setOpenSide={setOpenSide} selectedFood={selectedFood} setSelectedFood={setSelectedFood}/>
      <div onClick={()=> setOpenSide(true)} className={`w-[50px] h-[50px] bg-[#7D5E42] rounded-full fixed flex justify-center items-center text-2xl text-white right-4 top-1/2 cursor-pointer ${openSide ? 'hidden' : 'block'}`}>{'<'}</div>
    </>
  )
}

export default Menu