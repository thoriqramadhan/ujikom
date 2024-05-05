import React from 'react'
import BodyLayout from '@/Layouts/BodyLayout'
import LogoDate from '../Logo_date'
import TextInput from '../TextInput'
import SearchSvg from '../svgComp/SearchSvg'
import MenuTab from './MenuTab'

function Menu({menus, categories}) {
  
  return (
    <BodyLayout className={'md:ml-20 md:mr-5'}>
      {/* Headers */}
      <div className="mt-[40px] lg:w-full">
      <LogoDate/>
      <div className="mt-[20px] w-full flex gap-x-[10px] lg:justify-between">
        <div className="relative flex-1 lg:w-[365px] lg:flex-none">
          <TextInput className='pl-[40px] h-[50px] w-[100%]' placeholder='Cari Menu'/>
          <SearchSvg/>
        </div>
        <button className='h-[50px] w-[50px] bg-[#7D5E42] rounded-xl text-white flex justify-center items-center lg:px-[20px] lg:w-fit'>
          <span className='text-3xl relative lg:-top-[2px] -left-[2px]'>+</span>
          <span className='hidden lg:block'>Tambah Menu</span>
          </button>
      </div>
      </div>
      {/* categories */}
      <div className="w-full">
        <MenuTab categories={categories} menus={menus}/>
      </div>
    </BodyLayout>
  )
}

export default Menu