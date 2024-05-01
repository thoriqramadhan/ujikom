import React from 'react'
import { useState } from 'react';
import TrashSvg from '../svgComp/TrashSvg';

function ModalHistoryCard({name,item,initialPrice , setDatas , datas , menu , id}) {
  console.log(initialPrice)
    const [number , setNumber] = useState(item || 1)
    const [subTotal , setSubTotal] = useState(initialPrice)
    function incrementHandler(){
      const newDatas = [...datas]
      const menus = newDatas.find(item => item.id == id)
      const newNumber = number + 1;
      setNumber(newNumber);
      setSubTotal(initialPrice * newNumber);
      const newMenu = {...menu , total: subTotal}
      console.log(newMenu)
      console.log(newDatas, datas,  menus ,id)
    }
    function decreaseHandler(){
      if(number == 1){
        return
      }
      const newNumber = number - 1;
      setNumber(newNumber);
      setSubTotal(initialPrice * newNumber);
    }

    function deleteHandler(nama){
      const newSelectedFood = selectedFood.filter(item => item.name !== nama)
      const newSubTotal = newSelectedFood.reduce((total,item)=> total + item.harga , 0)
      setSubTotal(newSubTotal)
      setSelectedFood(newSelectedFood)
      localStorage.setItem('ORDER_HISTORY' ,  JSON.stringify(newSelectedFood))
  
    }

  return (
    <div className="w-full h-[100px] bg-[#F9F9F9] rounded-[20px] shrink-0 flex items-center relative border shadow-sm ">
      <div onClick={()=>{}} className="w-[25px] h-[25px] absolute right-2 top-2 cursor-pointer">
        <TrashSvg />
      </div>
                <div className="w-[80px] h-[75px] bg-[#D9D9D9] ml-[12px] rounded-[15px]">
                </div>
                <div className="flex flex-col ml-[10px]">
                    <p className='text-[20px] font-bold mb-[8px]'>{name}</p>
                    <p className='font-bold opacity-40'>{subTotal}K</p>
                </div>
                <div className="flex h-[100%] justify-end items-end pb-[10px] pr-[10px] flex-1">
                    <div onClick={decreaseHandler} className="w-[25px] h-[25px] bg-[#D9D9D9] rounded-full flex justify-center items-center text-white cursor-pointer">-</div>
                    <p className='mx-[6px]'>{number}</p>
                    <div onClick={incrementHandler} className="w-[25px] h-[25px] bg-[#D9D9D9] rounded-full flex justify-center items-center text-white cursor-pointer">+</div>
                </div>
    </div>
  )
}

export default ModalHistoryCard