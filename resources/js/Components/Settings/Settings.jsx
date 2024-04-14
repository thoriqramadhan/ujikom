import BodyLayout from '@/Layouts/BodyLayout'
import React from 'react'
import LogoDate from '../Logo_date'
import TextInput from '../TextInput'

function Settings() {
  return (
    <BodyLayout className={'pt-[40px] px-[40px]'}>
        <LogoDate/>
        <div className="flex flex-col w-full mt-[45px]">
          <div className="flex items-center">
          <div className="h-[100px] w-[100px] bg-gray-200 rounded-full"></div>
          <p className='text-[30px] font-bold ml-[25px]'>Fachry Fauzan</p>
          </div>
          <p className='mt-[15px]'>Disini adalah tempat anda mengatur akun anda dan lainnya ✒️</p>
        </div>
        <div className="flex gap-x-[30px] mt-[50px]">
          <div className="flex-1">
            <p>Nama Depan</p>
            <TextInput placeholder='Fachry' className='w-full mt-[10px]'/>
          </div>
          <div className="flex-1">
            <p>Nama Belakang</p>
            <TextInput placeholder='Fauzan' className='w-full mt-[10px]'/>
          </div>
        </div>
        <div className="mt-[30px]">
          <p>Email</p>
          <TextInput placeholder='Email' type='email' className='w-full mt-[10px]'/>
        </div>
        <div className="mt-[30px]">
          <p>Password</p>
          <TextInput placeholder='password' type='password' className='w-full mt-[10px]'/>
        </div>
        <div className="bg-[#FFF4F4] w-full h-[130px] my-[20px] px-[40px] py-[35px] flex justify-between rounded-xl">
          <div className="">
            <p className='font-bold text-xl'>Sandingkan dengan printer</p>
            <p className='opacity-50'>Sandingkan dengan printer agar bisa memprint struk pembelian</p>
          </div>
          <div className="flex items-center">
          <button className='bg-[#0000FF] text-white px-[19px] py-[12px] rounded-xl'>Sambungkan</button>
          </div>
        </div>
    </BodyLayout>
  )
}

export default Settings