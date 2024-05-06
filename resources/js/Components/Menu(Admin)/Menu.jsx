import React, { useEffect, useState } from 'react'
import BodyLayout from '@/Layouts/BodyLayout'
import LogoDate from '../Logo_date'
import TextInput from '../TextInput'
import SearchSvg from '../svgComp/SearchSvg'
import MenuTab from './MenuTab'
import Checklist from '../svgComp/Checklist'
import { Inertia } from '@inertiajs/inertia';

function Menu({menus, categories}) {
  console.log(categories)
  const [openModal , setOpenModal] = useState(false)
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [categories_id, setCategoriesId] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(nama == '' || categories_id == '' || harga == ''){
      alert('Data belum komplit!')
      return
    }
    const formData = new FormData();
    formData.append('categories_id', categories_id);
    formData.append('nama', nama); 
    formData.append('harga', harga); 
  
    // Mengirim permintaan POST menggunakan Inertia.postFormData
    Inertia.post('/adminstore', formData).then(() => {
      setNama('');
      setHarga('');

      Inertia.reload();
    });
  };
  
  useEffect(()=>{
    console.log(categories_id)
  },[categories_id])

  return (
    <BodyLayout className={'md:ml-20 md:mr-5'}>
      {/* Headers */}
      <div className="mt-[40px] lg:w-full">
      <LogoDate/>
      {/* modal */}
      <form onSubmit={handleSubmit}>
      <div className={`w-full relative transition-all duration-1000 ${openModal ? 'translate-x-0 z-10' : '-translate-x-[2000px]'}`}>
        <div className="w-full h-[80vh] bg-white absolute">
          {/* modal header */}
          <div className="flex mt-[40px]">
            <div className="flex-1 ">
              <p className='text-xl font-bold'>Tambah Menu</p>
              <p>Tambah variasi menu yang anda punya 😀</p>
            </div>
            <button className='w-[105px] py-[10px] rounded-xl border bg-white' type='button' onClick={()=>{setOpenModal(!openModal)} }> {'<'} Kembali</button>
          </div>
          {/* modal body */}
          <div className="mt-[40px]  w-full flex flex-col items-center  md:flex-row md:gap-x-[20px]">
            <div className="w-[175px] h-[175px] bg-gray-400 rounded-xl"></div>
            {/* body */}
            <div className="flex-1 w-full mb-[100px] md:mb-0">
              <div className="flex flex-col w-full md:flex-row md:gap-x-[20px]">
                <TextInput className='w-full md:w-[383px] md:h-[50px] my-[15px] md:my-0' placeholder='Nama Menu' value={nama} onChange={(e) => setNama(e.target.value)} required/>
                <select name="" id="" className='w-full flex-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' onChange={(e)=> setCategoriesId(e.target.value)} required>
                  {categories.map(item => (
                    <option value={item.kategori}>{item.kategori}</option>
                  ))}
                </select>
              </div>
              <div className="flex-col flex w-full gap-x-[20px] md:mt-[40px] md:flex-row">
                <TextInput className='w-full my-[15px] md:w-[383px] md:h-[50px] md:my-0' type='number' placeholder='Harga' value={harga} onChange={(e) => setHarga(e.target.value)} required/>
                <div className='flex-1 flex md:justify-end'>
                  <div className="w-full flex relative items-center md:w-[249px]">
                    <Checklist className='absolute left-[36%] sm:left-[40%] md:left-[60px]'/>
                    <button className='w-full text-lg md:w-[249px] py-[10px] rounded-xl text-white bg-[#7D5E42]' type='submit'>Simpan</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </form>
      {/* end of modal */}

      <div className={`mt-[20px] w-full flex gap-x-[10px] lg:justify-between ${openModal ? 'hidden' : 'block'}`}>
        <div className="relative flex-1 lg:w-[365px] lg:flex-none">
          <TextInput className='pl-[40px] h-[50px] w-[100%]' placeholder='Cari Menu'/>
          <SearchSvg/>
        </div>
        <button className='h-[50px] w-[50px] bg-[#7D5E42] rounded-xl text-white flex justify-center items-center lg:px-[20px] lg:w-fit' onClick={()=>{setOpenModal(!openModal)}} >
          <span className='text-3xl relative lg:-top-[2px] lg:-left-[2px]'>+</span>
          <span className='hidden lg:block'>Tambah Menu</span>
          </button>
      </div>
      
      </div>
      {/* categories */}
      <div className={`w-full ${openModal ? 'hidden' : 'block'}`}>
        <MenuTab categories={categories} menus={menus}/>
      </div>
    </BodyLayout>
  )
}

export default Menu