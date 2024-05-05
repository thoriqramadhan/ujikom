import React from 'react'

function MenuItemTab({name , active , setActiveTab}) {
  return (
    <div  
      onClick={() => setActiveTab(name)}
      className={`
      w-[140px] h-[55px] border rounded-[20px] text-[18px] font-bold flex items-center justify-center cursor-pointer transition-all duration-150 shrink-0
      ${name === active ? 'bg-[#7D5E42]' : 'bg-[#FFFFFF]'} 
      ${name === active ? 'bg-[#74573d]' : 'hover:bg-[#fafafa]'}
      ${name === active ? 'text-white' : 'text-black'}
      `}>
        {name}
    </div>
  )
}

export default MenuItemTab