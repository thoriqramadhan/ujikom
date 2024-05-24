import React, { useEffect } from 'react'
import { useState } from 'react';
import TrashSvg from '../svgComp/TrashSvg';
import { formatRupiah } from '@/module/rupiah-formater';

function ModalHistoryCard({ordersData, setEditModalData, editModalData, name,item,initialPrice , menu , id}) {
    const [number , setNumber] = useState(item || 1)
    const [subTotal , setSubTotal] = useState(initialPrice * item)

    function incrementHandler(){
      console.log(editModalData)
      const newNumber = number + 1;
      setNumber(newNumber);
      setSubTotal(initialPrice * newNumber);
      
    }
    function decreaseHandler(){
      if(number == 1){
        return
      }
      const newNumber = number - 1;
      setNumber(newNumber);
      setSubTotal(initialPrice * newNumber);
    }

    useEffect(()=>{
      const newMainData = updateHarga(editModalData,id,subTotal,number)
      console.log(editModalData)
      setEditModalData(newMainData)
    },[number,subTotal])

    function deleteHandler(){
      const newEditModalData = editModalData.filter(item => item.id !== id)
      setEditModalData(newEditModalData)
    }
    function updateHarga(mainData, id, newHarga , items) {
      return mainData.map(item => {
        if (item.id === id) {
          return { ...item, totalHarga: newHarga , items:items};
        } else {
          // Jika ID tidak cocok, kembalikan item tanpa perubahan
          return item;
        }
      });
    }

  return (
    <div className="w-full h-[100px] bg-[#F9F9F9] rounded-[20px] shrink-0 flex items-center relative border shadow-sm ">
      <div onClick={deleteHandler} className="w-[25px] h-[25px] absolute right-2 top-2 cursor-pointer">
        <TrashSvg />
      </div>
                <div className="w-[80px] h-[75px] bg-[#D9D9D9] ml-[12px] rounded-[15px]">
                </div>
                <div className="flex flex-col ml-[10px]">
                    <p className='text-[20px] font-bold mb-[8px]'>{name}</p>
                    <p className='font-bold opacity-40'>{formatRupiah(subTotal)}</p>
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