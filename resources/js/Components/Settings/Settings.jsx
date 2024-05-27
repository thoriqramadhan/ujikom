import BodyLayout from '@/Layouts/BodyLayout'
import React, { useState } from 'react'
import LogoDate from '../Logo_date'
import SettingInput from '../SettingInput'
import Bluetooth from '../svgComp/Bluetooth'
import TextInput from '../TextInput'
import { Inertia } from '@inertiajs/inertia'
import { Head } from '@inertiajs/react'

function Settings({ loginuser }) {
    console.log(loginuser)
    const [dataUser, setDataUser] = useState({
        id: loginuser.id,
        firstName: loginuser.first_name,
        lastName: loginuser.last_name,
        email: loginuser.email,
        password: loginuser.password
    });
    const [firstName , setFirstName] = useState(dataUser.firstName)
    const [lastName , setLastName] = useState(dataUser.lastName)
    const [email , setEmail] = useState(dataUser.email)
    
    console.log(dataUser);

    // Fungsi untuk logout
    const handleLogout = () => {
        // Lakukan logout menggunakan Inertia
        Inertia.post('/logout');
    };
    // inputChange
    const inputChange = (value , setter) => {
        setter(value)
    }

    const nameChange = (dataLink , dataChange) => {
        setDataUser({
            ...dataUser,
            [dataLink] : dataChange
        })
    }


    return (
        <BodyLayout className={'pt-[40px] px-[40px]'}>
            <Head title='Settings'/>
            <LogoDate />
            <div className="flex flex-col w-full mt-[45px]">
                <div className="flex items-center">
                    <div className="h-[100px] w-[100px] bg-gray-200 rounded-full"></div>
                    <p className='text-[30px] font-bold ml-[25px]'>{dataUser.firstName} {dataUser.lastName}</p>
                </div>
                <p className='mt-[15px]'>Disini adalah tempat anda mengatur akun anda dan lainnya ✒️</p>
            </div>
            <div className="flex flex-col gap-x-[30px] mt-[0px] md:flex-row md:mt-[50px]">
                {/* firstname */}
                <div className='w-full'>
                    <p>First Name</p>
                    <div className="w-full h-fit bg-sky-100  mt-[10px] relative">
                        <input type="text" className='w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' value={firstName} onChange={(e) => inputChange(e.target.value , setFirstName)}/>
                        <div className="w-[100px] h-[40px] absolute right-0 top-0 opacity-60 flex items-center justify-center font-bold cursor-pointer" onClick={(e) => nameChange('firstName' , firstName)}>Ubah</div>
                    </div>
                </div>
                {/* lastname */}
                <div className='w-full mt-[30px] md:mt-0'>
                    <p>Last Name</p>
                    <div className="w-full h-fit bg-sky-100  mt-[10px] relative">
                        <input type="text" className='w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' value={lastName} onChange={(e) => inputChange(e.target.value , setLastName)}/>
                        <div className="w-[100px] h-[40px] absolute right-0 top-0 opacity-60 flex items-center justify-center font-bold cursor-pointer" onClick={(e) => nameChange('lastName' , lastName)}>Ubah</div>
                    </div>
                </div>
            </div>
            {/* email */}
            <div className="mt-[30px]">
                <p>Email</p>
                <div className="w-full h-fit bg-sky-100  mt-2 relative">
                    <input type="email" className='w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' value={email} />
                </div>
            </div>
            {/* password */}
            <div className="mt-[30px]">
                <p>Password</p>
                <input type="password" className='w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' value={dataUser.password} />
            </div>


            {/* printer */}
            <div className="bg-[#FFF4F4] w-full h-[130px] my-[20px] px-[40px] py-[35px] flex justify-between rounded-xl overflow-scroll">
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
            <button onClick={handleLogout} className="bg-red-500 font-bold text-xl text-white px-4 py-2 mb-8 rounded-xl mt-4">
                Logout
            </button>
        </BodyLayout>
    )
}

export default Settings
