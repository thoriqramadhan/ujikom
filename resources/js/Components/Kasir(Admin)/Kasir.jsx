import React, { useEffect, useState } from "react";
import BodyLayout from "@/Layouts/BodyLayout";
import LogoDate from "../Logo_date";
import SearchSvg from "../svgComp/SearchSvg";
import TextInput from "../TextInput";
import TableData from "../TableData";
import PencilSvg from "../svgComp/PencilSvg";
import TrashSvg from "../svgComp/TrashSvg";
import ViewHideSvg from "../svgComp/ViewHideSvg";
import { Inertia } from "@inertiajs/inertia"; // Tambahan Inertia untuk menghapus

function Kasir({ users, onlykasir, setModalData }) {
    console.log(onlykasir)
    const [openModal, setOpenModal] = useState(false);
    const [open, setOpen] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [modalId, setModalId] = useState("");

    // body data
    const [kasirData , setKasirData] = useState(onlykasir || [])

    // modal data
    const [modalFirstName, setModalFirstName] = useState("");
    const [modalLastName, setModalLastName] = useState("");
    const [modalEmail, setModalEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", role);

        Inertia.post("/admin", formData).then(() => {
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setRole("");
            Inertia.reload();
        });
    };

    // Fungsi untuk mengirim perubahan detail kasir ke backend
    const handleEdit = (id) => {
        const kasir = kasirData.find(k => k.id === id);
        const data = {
            first_name: modalFirstName,
            last_name: modalLastName,
        };
    
        // Menggunakan URLSearchParams untuk mengirim data dalam format URL-encoded
        const formData = new URLSearchParams();
        for (const key in data) {
            formData.append(key, data[key]);
        }
    
        Inertia.put(`/admin/${id}`, formData).then(() => {
            Inertia.reload();
        });
    };

    function detailHandler(id, first_name, last_name, email) {
        setOpenModal(!openModal);
        setModalId(id);
        setModalFirstName(first_name);
        setModalLastName(last_name);
        setModalEmail(email);
    }

    // input handler
    const inputHandler = (value , setter) => {
        setter(value)
    }

    const changeNameHandler = (dataLink , dataChange) => {
        const kasir = kasirData.find(items => items.id == modalId)
        const newData = {...kasir , [dataLink] : dataChange}
        const newKasir = kasirData.map(kasir => {
            if(kasir.id == modalId){
                return {...newData}
            }else{
                return kasir
            }
        })
        setKasirData(newKasir)
    }

    const handleDelete = (id) => {
        // Tampilkan pop-up konfirmasi sebelum menghapus
        if (window.confirm("Apakah Anda yakin ingin menghapus akun kasir ini?")) {
            // Kirim permintaan DELETE menggunakan Inertia.delete
            Inertia.delete(`/admin/${id}`).then(() => {
                // Setelah penghapusan berhasil, lakukan langkah-langkah berikut:
                // 1. Filter data kasir untuk menghapus data dengan ID yang sesuai
                const updatedKasirData = kasirData.filter(
                    (kasir) => kasir.id !== id
                );
                // 2. Perbarui state kasirData dengan data yang telah diperbarui
                setKasirData(updatedKasirData);
            }).catch(error => {
                // Tangani kesalahan jika ada
                console.error('Error deleting kasir:', error);
            });
        }
    };

    return (
        <BodyLayout>
            <div
                className={`flex justify-center relative transition-all duration-1000 ${
                    openModal ? "translate-x-0 z-10" : "-translate-x-[1500px] z-10"
                }`}
            >
            {/* Modal */}
                <div className=" h-fit w-[400px] absolute z-10 mt-[100px] rounded-2xl bg-white border-[3px] border-gray-400 pb-5">
                    <div className="font-bold pt-3 flex-row items-center">
                        <button
                            className="w-[105px] py-[7px] rounded-xl border-2 border-[#9ca3af] bg-white text-[#9ca3af] my-[5px] mx-3"
                            onClick={() => {
                                setOpenModal(!openModal);
                            }}
                        >
                            {"<"} Back
                        </button>
                    </div>

                    <div className="flex-row text-center">
                        <h3 className="text-2xl">Detail Kasir</h3>
                        <p>Lihat Detail 😀</p>
                    </div>
                    <form onSubmit={() => handleEdit(modalId)} encType="multipart/form-data">
                <div className="w-full flex-1 px-5 mb-2">
                    <div className="w-full relative">
                        <label htmlFor="" className="block mb-2">First Name</label>
                        <input type="text" name="" id="" value={modalFirstName} onChange={(e) => {inputHandler(e.target.value, setModalFirstName)}} className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" required/>
                        <button className="absolute right-5 bottom-2 transition-all duration-500 opacity-50 hover:opacity-100" type="submit">Ubah</button>
                    </div>
                </div>
                <div className="w-full flex-1 px-5 mb-2">
                    <div className="w-full relative">
                        <label htmlFor="" className="block mb-2">Last Name</label>
                        <input type="text" name="" id="" value={modalLastName} onChange={(e) => {inputHandler(e.target.value, setModalLastName)}} className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" required/>
                        <button className="absolute right-5 bottom-2 transition-all duration-500 opacity-50 hover:opacity-100" type="submit">Ubah</button>
                    </div>
                </div>
            </form>
                    <div className="w-full flex-1 px-5">
                        <div className="w-full relative">
                            <label htmlFor="" className="block mb-2">Email</label>
                            <input type="email" name="" id="" value={modalEmail}  className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" required/>
                        </div>
                    </div>
                    <div className="mt-10 grid grid-cols-1 px-5 gap-2 font-bold text-[#747474]">
                        <button
                            className="bg-[#e8e8e8] py-3  rounded-xl flex justify-center"
                            onClick={() => handleDelete(modalId)} // Panggilan handleDelete dengan modalId
                        >
                            <TrashSvg />
                            Hapus
                        </button>
                    </div>
                </div>
            </div>

            {/* header & body */}
            <div className="w-full  sm:px-[20px] lg:px-[35px] lg:flex-row lg:gap-x-[30px]">
                <div className="w-full h-fit pt-[50px] lg:grow lg:basis-1/2">
                    <LogoDate />
                    <div className="h-[50px] w-fit relative mt-[40px]">
                        <TextInput
                            placeholder={"Cari Kasir Anda!"}
                            className="w-[366px] h-[50px] pl-[40px]"
                        />
                        <SearchSvg />
                    </div>
                </div>
                <div className="w-full overflow-hidden rounded-xl"></div>
                <table className="w-full mt-[24px] overflow-hidden rounded-2xl">
                    <tr className="rounded-2xl bg-[#F3F3F3] h-[60px] border-[1px] border-gray-300">
                        <th className="flex-1 opacity-60">Nama Depan</th>
                        <th className="flex-1 opacity-60 hidden lg:table-cell ">
                            Nama Belakang
                        </th>
                        <th className="flex-2 opacity-60 hidden lg:table-cell">
                            Email
                        </th>
                        <th></th>
                    </tr>
                    {kasirData.map((kasirData) => {
                        return (
                            <tr className="h-fit border-bottom-1 border-x-[1px] border-gray-300 border-b-[1px]" key={kasirData.id}>
                                <TableData text={kasirData.first_name} />
                                <TableData
                                    className={"hidden lg:table-cell"}
                                    text={kasirData.last_name}
                                />
                                <TableData
                                    text={kasirData.email}
                                    className={"hidden lg:table-cell"}
                                />
                                <div className="h-[60px] w-[100%] flex items-center justify-center">
                                    <button
                                        className="w-[100px] py-[7px] bg-[#ECEDFE] text-[#747474] rounded-xl"
                                        onClick={() =>
                                            detailHandler(
                                                kasirData.id,
                                                kasirData.first_name,
                                                kasirData.last_name,
                                                kasirData.email
                                            )
                                        }
                                    >
                                        Detail
                                    </button>
                                </div>
                            </tr>
                        );
                    })}
                </table>
            </div>

            {/* adding User */}
            <div className="mt-10">
                    <h1 className="text-xl font-[1000]">Tambah Kasir</h1>
                    <p>Tambah Akun Kasir Atau Admin Anda 😀</p>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="my-5 space-y-4 sm:flex-col">
                            <div className="flex flex-col gap-4 md:flex-row">
                                <div className="w-full border-[1.4px] border-gray-400 rounded-xl xl:basis-1/4">
                                    <TextInput
                                        className="w-full rounded-xl text-black"
                                        type="text"
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        required
                                        placeholder="Nama Depan"
                                    />
                                </div>
                                <div className="w-full border-[1.4px] border-gray-400 rounded-xl xl:basis-1/4">
                                    <TextInput
                                        className="w-full rounded-xl text-black"
                                        type="text"
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        required
                                        placeholder="Nama Belakang"
                                    />
                                </div>
                                <div className="w-full border-[1.4px] border-gray-400 rounded-xl xl:basis-2/4">
                                    <TextInput
                                        className="w-full rounded-xl text-black"
                                        type="text"
                                        id="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                        placeholder="Email"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 md:flex-row">
                                {/* ROLE */}
                                <div class="relative basis-1/4">
                                    <select
                                        name=""
                                        id=""
                                        class="w-full border-[1.4px] border-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                        required
                                    >
                                        <option>Pilih Role</option>
                                        <option value="kasir">Kasir</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>

                                {/* PASSWORD */}
                                <div className="w-ful border-[1.4px] relative border-gray-400 rounded-xl xl:basis-2/4">
                                    <TextInput
                                        className="w-full rounded-xl text-black"
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                        placeholder="Password"
                                    />
                                    <ViewHideSvg />
                                </div>
                                <button
                                    className="w-full h-fit bg-[#7d5e42] text-white py-2 rounded-lg xl:basis-1/4"
                                    type="submit"
                                >
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
        </BodyLayout>
    );
}

export default Kasir;
