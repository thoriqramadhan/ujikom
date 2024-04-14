import React, { useEffect, useState } from 'react'
import MenuItemTab from './MenuItemTab'
import MenuCard from './MenuCard'

function MenuTab({categories , menus , selectedFood , setSelectedFood}) {
    const [activeTab, setActiveTab] = useState('Semua')

    let activeCategories;
    let menuOnCategories = menus
    if(activeTab !== 'Semua'){
      console.log('in')
      activeCategories = categories.find(categorie => activeTab === categorie.kategori)
      menuOnCategories = menus.filter(menu => {
        return menu.categories_id === activeCategories.id;
      });
    }
  return (
    <>
    <div className="flex w-full h-fit gap-x-4 px-[37px] mb-[30px]">
        <MenuItemTab name={'Semua'} active={activeTab} setActiveTab={setActiveTab}/>
        {
          categories.map(kategoris => <MenuItemTab name={kategoris.kategori} active={activeTab} setActiveTab={setActiveTab}/>)
        }
    </div>
    {menus.length == 0 || menuOnCategories.length == 0 ? 
    <div className="w-full h-[100vh] flex justify-center items-center">
      <p className='text-3xl font-bold text-center'>Tidak ada data menu</p>
    </div> :
    <div className="w-full h-fit flex gap-6 px-[35px] justify-start flex-wrap">
    {activeTab === 'Semua' ?
        menus.map(menu => (
          <MenuCard key={menu.id} id={menu.id} nama={menu.nama} harga={menu.harga} selectedFood={selectedFood} setSelectedFood={setSelectedFood}/>
        )) :
        menuOnCategories.map(menu => (
          <MenuCard key={menu.id} id={menu.id} nama={menu.nama} harga={menu.harga} selectedFood={selectedFood} setSelectedFood={setSelectedFood}/>
        ))
    }
  </div>
    }
    
    </>
  )
}


export default MenuTab