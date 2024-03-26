import React, { useState , useEffect} from 'react'
import TrashSvg from '../svgComp/TrashSvg';

function HistoryCard({name , harga , selectedFood, setSelectedFood}) {
  const [number , setNumber] = useState(1)
  const [subTotal , setSubTotal] = useState(harga)

  function incrementHandler(){
    const newNumber = number + 1;
    setNumber(newNumber);
    setSubTotal(harga * newNumber);
  }
  function decreaseHandler(){
    if(number == 1){
      return
    }
    const newNumber = number - 1;
    setNumber(newNumber);
    setSubTotal(harga * newNumber);
  }
  function updateHarga(selectedFood, name, newHarga) {
    return selectedFood.map(item => {
      if (item.name === name) {
        // Jika ID cocok, ubah harga item
        return { ...item, totalHarga: newHarga };
      } else {
        // Jika ID tidak cocok, kembalikan item tanpa perubahan
        return item;
      }
    });
  }
  function deleteHandler(nama){
    const updatedSelectedFood = selectedFood.filter(item => item.name !== nama)
    const newSubTotal = updatedSelectedFood.reduce((total,item)=> total + item.harga , 0)
    setSubTotal(newSubTotal)
    setSelectedFood(updatedSelectedFood)
    console.log(newSubTotal)

  }
  useEffect(() => {
    const newSelectedFood =  updateHarga(selectedFood , name , subTotal)
    setSelectedFood(newSelectedFood)
  },[subTotal])
  return (
    <div className="w-full h-[100px] bg-[#F9F9F9] rounded-[20px] shrink-0 flex items-center relative border shadow-sm ">
      <div onClick={() => deleteHandler(name)} className="w-[25px] h-[25px] absolute right-2 top-2 cursor-pointer">
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

export default HistoryCard