
import React, { useState } from 'react';
import DashedLine from '../DashedLine';
import HistoryCard from './HistoryCard';
import TextInput from '../TextInput';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import { Head } from '@inertiajs/react';
import { formatRupiah } from '@/module/rupiah-formater';

function MenuHistory({openModal , setOpenModal, setModalData, openSide, setOpenSide, selectedFood, setSelectedFood, onSubmitOrder , handlePopUp , tax}) {
  console.log(tax)
  const [customerName, setCustomerName] = useState('');
  const subHarga = selectedFood.reduce((total, item) => {
    return total + item.totalHarga;
  }, 0);
  const taxs = subHarga * (parseFloat(tax?.tax || 0) / 100);
  


  const handleSubmit = (e) => {
    e.preventDefault();
    if(customerName == ''){
      handlePopUp('Nama harus di isi!')
      return
    }

    // Membuat objek FormData untuk mengirim data formulir
    const formData = new FormData();
    // formData.append('customer_name', customerName);
    formData.append('selectedFood', JSON.stringify(selectedFood)); // Mengirim gambar sebagai bagian dari FormData
    setOpenModal(!openModal)
    setModalData({
      name: customerName,
      subTotal : `${subHarga}`,
      tax: `${taxs}`,
      total: `${subHarga + taxs}`,
      menu: selectedFood.map(food => {
        return {
          name : food.name,
          total: food.totalHarga,
          items: food.items

        }

        // Membuat objek FormData untuk mengirim data formulir
        const formData = new FormData();
        // formData.append('customer_name', customerName);
        formData.append("selectedFood", JSON.stringify(selectedFood)); // Mengirim gambar sebagai bagian dari FormData
        setOpenModal(!openModal);
        setModalData({
            name: customerName,
            subTotal: `${subHarga}`,
            tax: `${tax.toFixed(2)}`,
            total: `${subHarga + tax}`,
            menu: selectedFood.map((food) => {
                return {
                    name: food.name,
                    total: food.totalHarga,
                    items: food.items,
                };
            }),
        });
    },
  )})}

    const handleSubmitOrder = (e) => {
        e.preventDefault();

        if (customerName == "") {
            handlePopUp("Nama harus di isi!");
            return;
        } else if (selectedFood.length == 0) {
            handlePopUp("Pesanan harus di isi!");
            return;
        }
        const tax = taxs?.tax || 0
        // Membuat objek FormData untuk mengirim data formulir
        const order = {
            customerName: customerName,
            tax: tax,
            totalHarga: subHarga + tax,
            data: [...selectedFood],
        };

        console.log(order);
        const formData = new FormData();
        // formData.append('customer_name', customerName);
        formData.append("order", JSON.stringify(order));
        // formData.append('selectedFood', JSON.stringify(selectedFood)); // Mengirim gambar sebagai bagian dari FormData

        // Mengirim permintaan POST menggunakan Inertia.postFormData
        localStorage.setItem("ORDER_HISTORY", JSON.stringify([]));
        setCustomerName("");
        setSelectedFood([]);
        Inertia.post("/kasirstore", formData).then(() => {
            // Mereset nilai formulir setelah submit
            // setCustomerName('');

            // Me-refresh halaman untuk mendapatkan daftar produk terbaru
            Inertia.reload();
        });
    };


  return (
    <div className={`h-[100vh] w-[400px] pl-[29px] pr-[40px] bg-white shadow-lg border transition-all duration-500 fixed right-0 ${openSide ? 'transform translate-x-0' : 'transform translate-x-[1000px]'} `}>
      <Head title='Menu'/>
      <div onClick={() => setOpenSide(false)} className="w-[70px] h-[70px] shadow-lg bg-[#7D5E42] text-white rounded-full absolute -left-10 top-1/2 cursor-pointer z-10 text-2xl flex justify-center items-center">{'<'}</div>
      <div className="mt-[20px]">
        <p className='font-bold text-[26px]'>Pesanan</p>
        <TextInput className="w-full mt-[5px]" placeholder="Nama pembeli" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
      </div>
        {selectedFood.length == 0 ? 
        <div className="w-full h-[300px] mt-[25px] overflow-y-scroll flex justify-center items-center">
          <p className='font-bold text-xl'>Tidak ada pesanan!</p>
        </div>
        :
         <div className="w-full h-[300px] mt-[25px] overflow-y-scroll flex flex-col flex-nowrap gap-2">
          {selectedFood.map(food => <HistoryCard key={food.id} name={food.name} harga={food.harga} selectedFood={selectedFood} setSelectedFood={setSelectedFood} />)}
        </div>}
      <div className="w-[350px] h-fit bg-[#FFFFFF] shadow-lg border mt-[20px] rounded-[20px]">
        <div className="px-[30px] mt-[25px]">
          <div className="w-full flex justify-between">
            <p className='opacity-30 font-bold'>Sub Total</p>
            <p className='font-bold'>{formatRupiah(subHarga)}</p>
          </div>
          <div className="w-full flex justify-between">
            <p className='opacity-30 font-bold'>{'Pajak'}</p>
            <p className='font-bold'>{formatRupiah(taxs)}</p>
          </div>
          <DashedLine />
          <div className="w-full flex justify-between mt-[20px]">
            <p className='opacity-30 font-bold'>Total</p>
            <p className='font-bold'>{formatRupiah(subHarga + taxs)}</p>
          </div>
        </div>
        <div className="mb-[20px] mx-[20px] h-[50px] mt-[20px] flex gap-3 justify-center">
          <button onClick={handleSubmitOrder} className='flex-1 border-2 rounded-[18px]  font-bold'>Nanti</button>
          <button onClick={handleSubmit} className='flex-1 rounded-[18px] font-bold text-white bg-[#7D5E42]'>Bayar</button>
        </div>
        </div>
        </div>
    );
  }

export default MenuHistory;
