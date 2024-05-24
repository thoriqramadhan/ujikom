import React, { useEffect, useState } from 'react'
import MenuItemTab from '../Menu/MenuItemTab'
import { formatRupiah } from '@/module/rupiah-formater'

function MenuTab({categories , menus}) {
    const [activeTab , setActiveTab] = useState('Semua')
    const [menu , setMenu] = useState(menus)
    console.log(menu)
    useEffect(()=>{
      if(activeTab != 'Semua'){
        const categorie = categories.find(item => item.kategori == activeTab)
        const newMenu = menus.filter(item => item.categories_id == categorie.id)
        setMenu(newMenu)
      }else{
        setMenu(menus)
      }
    },[activeTab])
  return (
    <>
    {/* categories */}
        <div className="w-full flex overflow-scroll h-fit gap-x-4 mt-[20px]">
            <MenuItemTab name={'Semua'} active={activeTab} setActiveTab={setActiveTab}/>
            {categories.map(item => (
            <MenuItemTab name={item.kategori} active={activeTab} setActiveTab={setActiveTab}/>
            ))}
        </div>
        <div className={`w-full h-fit mt-[40px] flex gap-y-4 flex-wrap ${menu.length == 1 ? 'justify-start' : 'justify-evenly'} md:justify-start md:gap-x-[40px]`}>

          {/* card */}
          {menu.length == 0 ? 
            <p className='text-xl font-bold text-center'>Tidak ada menu di kategori ini!</p>
            :
            menu.map(item => (
              <div className="w-[250px] rounded-[30px] bg-white border shadow-lg px-[20px] pt-[27px] pb-[18px] shrink-0 flex flex-col">
                <div className="h-[150px] w-full bg-[#F4F4F4] rounded-[25px]"></div>

                <div className="flex-1 h-fit w-full flex flex-col mt-2 mb-3">
                  <p className='font-bold text-[22px]'>{item.nama}</p>
                  <p className='font-bold opacity-60 text-[20px]'>{formatRupiah(item.harga)}</p>
                </div>
                <button className='w-full h-[41px] bg-[#7D5E42] rounded-xl text-white text-[18px] py-[5px]'>
                  <p className='font-[500]'>Edit</p>
                </button>
              </div>))
          }
          
        </div> 
          
    </>
  )
}

export default MenuTab