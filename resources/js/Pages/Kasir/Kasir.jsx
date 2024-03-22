import React from 'react';
import { Head} from '@inertiajs/react';
import MenuHeader from '@/Components/MenuHeader';
import TextInput from '@/Components/TextInput';
import MenuTab from '@/Components/MenuTab';
import MenuItemTab from '@/Components/MenuItemTab';

export default function Kasir(){
  return (
    <>
    <Head title='Kasir'/>
    <div className="w-full h-[100vh]">

      <div className="" id='body'>
        <div className="pt-[55px] px-[30px] flex justify-between">
          <MenuHeader/>
          <TextInput className="h-[50px] w-[60%]" placeholder='Cari menu'/>
        </div>
        <div className="bg-[#F9F9F9] w-full h-[100vh] pt-[40px] mt-[46px]">
        <MenuTab/>
        </div>
        <div className="w-full h-fit ">
          
        </div>
      </div>
    </div>
    </>
  )
}
