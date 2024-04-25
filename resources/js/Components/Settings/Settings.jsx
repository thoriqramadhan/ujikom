import BodyLayout from '@/Layouts/BodyLayout'
import React, { useState } from 'react'
import LogoDate from '../Logo_date'
import SettingInput from '../SettingInput'
import Bluetooth from '../svgComp/Bluetooth'
import TextInput from '../TextInput'
import { Inertia } from '@inertiajs/inertia'

function Settings({ users }) {
    const [user, setUser] = useState(users);

    // Fungsi untuk logout
    const handleLogout = () => {
        // Lakukan logout menggunakan Inertia
        Inertia.post('/logout');
    };

    console.log(users)

    return (
        <BodyLayout className={'pt-[40px] px-[40px]'}>
            <LogoDate />
            <div className="flex flex-col w-full mt-[45px]">
                <div className="flex items-center">
                    <div className="h-[100px] w-[100px] bg-gray-200 rounded-full"></div>
                    <p className='text-[30px] font-bold ml-[25px]'>{users.first_name} {users.last_name}</p>
                </div>
                <p className='mt-[15px]'>Disini adalah tempat anda mengatur akun anda dan lainnya ✒️</p>
            </div>
            <div className="flex flex-col gap-x-[30px] mt-[0px] md:flex-row md:mt-[50px]">
          <SettingInput header={'First Name'} initialValues={user.firstName} placeholder='First Name' user={user} setUser={setUser} selection={'firstName'} className='mt-[30px] md:flex-1'/>
          <SettingInput header={'Last Name'} initialValues={user.lastName} placeholder='Last Name' user={user} setUser={setUser} selection={'lastName'} className='mt-[30px] md:flex-1'/>
        </div>
            <div className="mt-[30px]">
                <p>Email</p>
                <TextInput value={'Email'} placeholder='Email' type='email' className='w-full mt-[10px]' />
            </div>
            <div className="mt-[30px]">
                <p>Password</p>
                <TextInput value={'password'} placeholder='password' type='password' className='w-full mt-[10px]' />
            </div>
            <div className="bg-[#FFF4F4] w-full h-[130px] my-[20px] px-[40px] py-[35px] flex justify-between rounded-xl">
                <div className="">
                    <p className='font-bold text-xl'>Sandingkan dengan printer</p>
                    <p className='opacity-50'>Sandingkan dengan printer agar bisa memprint struk pembelian</p>
                </div>
                <div className="flex items-center relative">
                    <button className='bg-[#0000FF] text-white px-[19px] py-[12px] rounded-xl pl-[50px]'>Sambungkan</button>
                    <Bluetooth className={'absolute left-[19px]'}/>
                </div>
            </div>
            {/* Tombol logout */}
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4">
                Logout
            </button>
        </BodyLayout>
    )
}

export default Settings
