import React, { useEffect, useState } from 'react'
import TextInput from '@/Components/TextInput';
import MenuTab from '@/Components/Menu/MenuTab';
import MenuHistory from '@/Components/Menu/MenuHistory';
import SearchSvg from '@/Components/svgComp/SearchSvg';
import { stringify } from 'postcss';
import BodyLayout from '@/Layouts/BodyLayout';
import LogoDate from '../Logo_date';

import PaynmentModal from '../PaynmentModal';

function Menu({menus , categories, modalData = JSON.parse(localStorage.getItem('MODAL_DATA')) || { name: 'Yudi Santoso',
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
]} , setModalData , openModal , setOpenModal}) {

    const [openSide, setOpenSide] = useState(false);
    const strg = JSON.parse(localStorage.getItem('ORDER_HISTORY'))
    const [selectedFood , setSelectedFood] = useState(strg || []);
    const [openModals , setOpenModals] = useState(openModal)
    function paynmentHandler(){
      setOpenModals(!openModals)
    }
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
        <MenuHistory openModal={openModal} setOpenModal={setOpenModals} setModalData={setModalData} openSide={openSide} setOpenSide={setOpenSide} selectedFood={selectedFood} setSelectedFood={setSelectedFood}/>
      <div onClick={()=> setOpenSide(true)} className={`w-[50px] h-[50px] bg-[#7D5E42] rounded-full fixed flex justify-center items-center text-2xl text-white right-4 top-1/2 cursor-pointer ${openSide ? 'hidden' : 'block'}`}>{'<'}</div>
    
      {modalData && (
      <>
        <PaynmentModal modalData={modalData} openModal={openModals} paynmentHandler={paynmentHandler}/>
        {/* Other elements that use modalData */}
      </>
    )}
    </>
  )
}

export default Menu