import React, { useState } from 'react'
import MenuItemTab from './MenuItemTab'

function MenuTab() {
    const [activeTab, setActiveTab] = useState('Semua')
    console.log(activeTab)
  return (
    <div className="flex w-full h-fit gap-x-4 px-[37px]">
        <MenuItemTab name={'Semua'} active={activeTab} setActiveTab={setActiveTab}/>
        <MenuItemTab name={'Latte'} active={activeTab} setActiveTab={setActiveTab}/>
        <MenuItemTab name={'Late'} active={activeTab} setActiveTab={setActiveTab}/>
        <MenuItemTab name={'Lattes'} active={activeTab} setActiveTab={setActiveTab}/>
    </div>
  )
}

export default MenuTab