import React, { useEffect, useState } from 'react';
import BodyLayout from '@/Layouts/BodyLayout';
import LogoDate from '../Logo_date';
import TextInput from '../TextInput';
import SearchSvg from '../svgComp/SearchSvg';
import MenuTab from './MenuTab';
import Checklist from '../svgComp/Checklist';
import { Inertia } from '@inertiajs/inertia';
import TableData from '../TableData';
import TrashSvg from '../svgComp/TrashSvg';

function Menu({ menus, categories }) {
  const [openModal, setOpenModal] = useState(false);
  const [modalCategories, setModalCategories] = useState(false)
  const [categoriesData , setCategoriesData] = useState(categories || [])
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [categories_id, setCategoriesId] = useState('');
  const [kategori, setKategori] = useState('');
  const [mode, setMode] = useState('Kategori');
  const [idCategorie , setIdCategorie] = useState(1)
  
  const [editKategori, setEditKategori] = useState('')

  // search data
  const [searchInput , setSearchInput] = useState('')
  const [searchOutput , setSearchOutput] = useState([])

  const searchHandler = (value)=>{
    setSearchInput(value)
    if(value.trim() === ''){
      console.log('in kosong')
      setSearchOutput([])
      return
    }
    const trimmedValue = value.replace(/\s+/g, '').toLowerCase();
    const searchResult = menus.filter((menu)=>{
      const trimmedMenuName = menu.nama.replace(/\s+/g, '').toLowerCase(); // Menghapus semua spasi dari nama menu dan ubah ke huruf kecil
      return trimmedMenuName.includes(trimmedValue);
    })
    setSearchOutput(searchResult)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isDuplicate = menus.find(menu => menu.nama == nama)
    if (nama === '' || categories_id === '' || harga === '') {
      alert('Data belum komplit!');
      return;
    }else if(isDuplicate){
      alert(`${isDuplicate.nama} sudah ada!`)
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

  const handleSubmitKategori = (e) => {
    e.preventDefault();
    const isDuplicate = categories.find(categorie => categorie.kategori == kategori)
    console.log(isDuplicate)

    if (kategori === '') {
      alert('Data belum komplit!');
      return;
    }else if(isDuplicate){
      alert(isDuplicate.kategori + ' sudah ada!')
      return
    }

    const formData = new FormData();
    formData.append('kategori', kategori);

    // Mengirim permintaan POST menggunakan Inertia.postFormData
    Inertia.post('/adminkategori', formData).then(() => {
      setKategori('');
      Inertia.reload();
    });
  };

  const editCategoriesHandler = (id) => {
    setModalCategories(!modalCategories)
    const categorieObj = categoriesData.find(item => item.id == id)
    setEditKategori(categorieObj.kategori)
    setIdCategorie(id)
  }
  const saveCatgorieHandler = () => {
    const categorieObj = categoriesData.find(item => item.id == idCategorie)
    const newCategoriesData = categoriesData.map(items => {
      if(items.id == idCategorie){
        return {
          ...categorieObj,
          kategori: editKategori
        }
      }else {
        return items
      }
    })
    setCategoriesData(newCategoriesData)
    setModalCategories(!modalCategories)
  }
  const deleteCategorieHandler = (id) => {
    const newCategoriesData = categoriesData.filter(items => items.id != id)
    setCategoriesData(newCategoriesData)
  }

  useEffect(() => {
    console.log(categories_id);
  }, [categories_id]);

  return (
    <BodyLayout className={'md:mr-5'}>
      {/* Headers */}
      <div className="mt-[40px] lg:w-full">
        <LogoDate />
        {/* modal */}
        <div className={`w-full relative transition-all duration-1000 ${openModal ? 'translate-x-0 z-10' : '-translate-x-[2000px]'}`}>
          <div className="w-full h-[80vh] bg-white absolute">
            {/* modal header */}
            <div className="flex items-center mt-[40px] mb-[20px]">
              <p className='flex-1 text-2xl font-bold'>Daftar Item</p>
              <select name="" id="" value={mode} onChange={(e) => { setMode(e.target.value) }} className='hidden h-fit py-[12px] border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm mr-5 md:block'>
                <option value="Menu">Tambah Menu</option>
                <option value="Kategori">Tambah Kategori</option>
              </select>
              <button className='w-[105px] h-fit py-[12px] rounded-xl border bg-white' type='button' onClick={() => { setOpenModal(!openModal) }}> {'<'} Kembali</button>
            </div>
            {/* modal body */}

            
            <div className="w-full flex flex-col items-center  md:flex-row md:gap-x-[20px]">
              <select name="" id="" value={mode} onChange={(e) => { setMode(e.target.value) }} className='w-full mb-5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm md:hidden'>
                <option value="Menu">Menu</option>
                <option value="Kategori">Kategori</option>
              </select>
              {/* body */}
              {mode === 'Menu' ? (
                <>
                  <div className="w-[175px] h-[175px] bg-gray-400 rounded-xl"></div>
                  <div className="flex-1 w-full mb-[100px] md:mb-0">
                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-col w-full md:flex-row md:gap-x-[20px]">
                        <TextInput className='w-full md:w-[383px] md:h-[50px] my-[15px] md:my-0' placeholder='Nama Menu' value={nama} onChange={(e) => setNama(e.target.value)} required />
                        <select name="" id="" className='w-full flex-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' onChange={(e) => setCategoriesId(e.target.value)} required>
                          <option value="">Pilih Kategori</option>
                          {categoriesData.map(item => (
                            <option key={item.id} value={item.id}>{item.kategori}</option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-col flex w-full gap-x-[20px] md:mt-[40px] md:flex-row">
                        <TextInput className='w-full my-[15px] md:w-[383px] md:h-[50px] md:my-0' type='number' placeholder='Harga' value={harga} onChange={(e) => setHarga(e.target.value)} required />
                        <div className='flex-1 flex md:justify-end'>
                          <div className="w-full flex relative items-center md:w-[249px]">
                            <Checklist className='absolute left-[36%] sm:left-[40%] md:left-[60px]' />
                            <button className='w-full text-lg md:w-[249px] py-[10px] rounded-xl text-white bg-[#7D5E42]' type='submit'>Simpan</button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <div className='flex flex-col w-full mb-[100px] relative'>
                  
                  <table className='w-full mt-[24px] mb-[24px] overflow-hidden rounded-xl'>
                    <tr className='rounded-2xl bg-[#F3F3F3] h-[60px] px-[42px]'>
                      <th className='text-[#797979] font-bold text-lg w-[40%]'>Nama Kategori</th>
                      <th className='w-[60%]'></th>
                    </tr>
                    {
                      categoriesData.length == 0 ?
                      <p>Tidak dada data wir</p> :
                      categoriesData.map(categorie => (
                        <tr className='h-fit w-full border-bottom border'>
                          <TableData text={categorie.kategori}/>
                          <td className="h-[60px] px-[20px] w-full flex justify-end items-center">
                            <button className='bg-[#E8E8E8] px-[20px] py-[4px] rounded-xl border' onClick={()=>{editCategoriesHandler(categorie.id)}}>Edit</button>
                            <button className='ml-[10px]' onClick={() => deleteCategorieHandler(categorie.id)}><TrashSvg/></button>
                          </td>
                        </tr>
                      ))
                    }

                  </table>
                  <div className="mt-[40px] mb-[10px]">
                    <p className='font-bold text-xl'>Tambah Kategori</p>
                    <p className=''>Tambah variasi kategori yang anda punya 😀</p>
                  </div>
                  <form onSubmit={handleSubmitKategori} className='w-full h-fit flex flex-col items-end'>
                    <TextInput className='w-full' placeholder='Nama Kategori' value={kategori} onChange={(e) => setKategori(e.target.value)} required />
                    <div className="w-full flex relative items-center mt-5 md:w-[249px]">
                      <Checklist className='absolute left-[36%] sm:left-[40%] md:left-[60px]' />
                      <button className='w-full text-lg md:w-[249px] py-[10px] rounded-xl text-white bg-[#7D5E42]' type='submit'>Simpan</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* end of modal */}

        <div className={`mt-[20px] w-full flex gap-x-[10px] lg:justify-between ${openModal ? 'hidden' : 'block'}`}>
          <div className="relative flex-1 lg:w-[365px] lg:flex-none">
            <TextInput className='pl-[40px] h-[50px] w-[100%]' placeholder='Cari Menu' value={searchInput} onChange={(e)=>{searchHandler(e.target.value)}}/>
            <SearchSvg />
          </div>
          <button className='h-[50px] w-[50px] bg-[#7D5E42] rounded-xl text-white flex justify-center items-center lg:px-[20px] lg:w-fit' onClick={() => { setOpenModal(!openModal) }} >
            <span className='text-3xl relative lg:-top-[2px] lg:-left-[2px]'>+</span>
            <span className='hidden lg:block'>Tambah Menu</span>
          </button>
        </div>
      </div>
      {/* modal edit categoires */}
      <div className={`w-[100%] h-[50vh] border transition-all duration-1000 left-0 ${modalCategories ? 'bottom-[75px]' : '-bottom-[1000px]'} bottom-[75px] z-10 px-[20px] bg-white shadow-lg border rounded-t-[30px] fixed flex flex-col md:w-[80%] md:left-[10%] md:rounded-none md:${modalCategories ? 'bottom-1/2' : '-bottom-[1000px]'}`}>
        <div className="w-full flex justify-center mt-[20px]">
          <p className='text-2xl font-bold'>Edit kategori</p>
        </div>
        <div className="w-full mt-[40px]">
          <label htmlFor="editKate" className='text-xl font-bold block mb-[10px] opacity-50'>Nama Kategori</label>
          <input type="text" name="editKate" id="" value={editKategori} onChange={(e)=>{setEditKategori(e.target.value)}} className='w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm '/>
        </div>
        <div className="w-full flex justify-center items-end gap-x-[10px] py-[20px] flex-1">
          <btn className="px-[30px] h-[60px] bg-white border-2  rounded-lg  flex items-center cursor-pointer" onClick={()=>{setModalCategories(!modalCategories)}}>
            <p className='text-lg font-bold'>Kembali</p>
          </btn>
          <btn className="px-[30px] h-[60px] bg-white border-2  rounded-lg  flex items-center cursor-pointer">
            <p className='text-lg font-bold' onClick={saveCatgorieHandler}>Simpan</p>
          </btn>
        </div>
      </div>
      {/* end of modal categories */}
      {/* categories */}
      <div className={`w-full ${openModal ? 'hidden' : 'block'}`}>
        <MenuTab searchOutput={searchOutput} categories={categories} menus={menus} />
      </div>
    </BodyLayout>
  );
}

export default Menu;
