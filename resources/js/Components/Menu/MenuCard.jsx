// MenuCard.jsx
import React, { useEffect } from 'react';
import { formatRupiah } from '@/module/rupiah-formater'

function MenuCard({id, nama, harga , selectedFood, setSelectedFood }) {
  function selectedFoodHandler(){
    const isAlreadySelected = selectedFood.find(item => item.id === id || item.name === name)
    if(!isAlreadySelected){
      setSelectedFood([...selectedFood ,{id:id, name:nama , harga:harga , totalHarga : 0 }])
      return
    }
    console.log('Item sudah dipilih!')
  }
  return (
    <div className="w-[270px] h-[340px] rounded-[30px] bg-white border shadow-lg px-[20px] pt-[27px] pb-[18px] relative">
      <div className="h-[156px] w-[230px] bg-White border-[3px] rounded-[25px] flex justify-center">
        <img src="/img/logo.png" alt="LOGO" className='h-[100px] w-[100px] my-auto' />
      </div>
      <div className="h-fit w-full flex justify-between mt-2">
        <p className='font-bold text-[22px]'>{nama}</p>
        <p className='font-bold opacity-60 text-[20px]'>{formatRupiah(harga)}</p>
      </div>
      <button onClick={selectedFoodHandler} className='w-[227px] h-[55px] bg-[#7D5E42] rounded-[18px] text-white text-[18px] absolute bottom-3 left-5'>
        <p className='font-[500]'>Tambah</p>
      </button>
    </div>
  )
}

export default MenuCard;
