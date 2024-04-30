import React, { useState } from "react";
import BodyLayout from "@/Layouts/BodyLayout";
import LogoDate from "../Logo_date";
import SearchSvg from "../svgComp/SearchSvg";
import TextInput from "../TextInput";
import TableData from "../TableData";
import PencilSvg from "../svgComp/PencilSvg";
import TrashSvg from "../svgComp/TrashSvg";
import ViewHideSvg from "../svgComp/ViewHideSvg";
import Dropdown from "../Dropdown";
import DropdownSvg from "../svgComp/DropdownSvg";

const dataOrder = [
    {
        customer_name: "customer_name",
        order_time: "order_time",
        status: "status",
    },
    {
        customer_name: "customer_name",
        order_time: "order_time",
        status: "status",
    },
    {
        customer_name: "customer_name",
        order_time: "order_time",
        status: "status",
    },
    {
        customer_name: "customer_name",
        order_time: "order_time",
        status: "status",
    },
];

function Kasir({ orders }) {
    const [open, setOpen] = useState(false);
    return (
        <BodyLayout>
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
                        <th className="flex-1 opacity-60">Nama Kasir</th>
                        <th className="flex-1 opacity-60 hidden lg:table-cell ">
                            Waktu
                        </th>
                        <th className="flex-2 opacity-60 hidden lg:table-cell">
                            Status
                        </th>
                        <th></th>
                    </tr>
                    {dataOrder.map((orders) => {
                        return (
                            <tr className="h-fit border-bottom-1 border-x-[1px] border-gray-300 border-b-[1px]">
                                <TableData text={orders.customer_name} />
                                <TableData
                                    className={"hidden lg:table-cell"}
                                    text={orders.order_time}
                                />
                                <TableData
                                    text={orders.status}
                                    className={"hidden lg:table-cell"}
                                />
                                <div className="h-[60px] w-[100%] flex items-center justify-center">
                                    <button
                                        className="w-[100px] py-[7px] bg-[#E8E8E8] rounded-lg border-gray-400 border mr-2 flex pr-2 max-xl:hidden justify-center"
                                        onClick={() => setOpen(true)}
                                    >
                                        <PencilSvg />

                                        <span className="opacity-60">
                                            | Edit
                                        </span>
                                    </button>

                                    <button className="w-[100px] py-[7px] bg-[#E8E8E8] rounded-lg border-gray-400 border mr-2 flex max-xl:hidden justify-center">
                                        <TrashSvg />
                                        <span className="opacity-60">
                                            | Hapus
                                        </span>
                                    </button>
                                    <button className="w-[100px] py-[7px] bg-[#E8E8E8] rounded-lg border-gray-400 border flex xl:hidden ">
                                        <span className="opacity-60 mx-auto">
                                            Detail
                                        </span>
                                    </button>
                                </div>
                            </tr>
                        );
                    })}
                </table>

                {/* add kasir */}
                <div className="mt-10">
                    <h1 className="text-xl font-[1000]">Tambah Kasir</h1>
                    <p>Tambah Kasir Anda 😀</p>

                    <div className="my-5 space-y-4 sm:flex-col">
                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="w-full border-[1.4px] border-gray-400 rounded-xl xl:basis-1/4">
                                <TextInput
                                    className="w-full rounded-xl"
                                    type="text"
                                    placeholder="Nama Depan"
                                />
                            </div>
                            <div className="w-full border-[1.4px] border-gray-400 rounded-xl xl:basis-1/4">
                                <TextInput
                                    className="w-full rounded-xl"
                                    type="text"
                                    placeholder="Nama Belakang"
                                />
                            </div>
                            <div className="w-full border-[1.4px] border-gray-400 rounded-xl xl:basis-2/4">
                                <TextInput
                                    className="w-full rounded-xl"
                                    type="text"
                                    placeholder="Email"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 md:flex-row">
                            {/* ROLE */}
                            <div class="relative basis-1/4">
                                <input
                                    type="text"
                                    class="w-full border-[1.4px] border-gray-400 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500"
                                    placeholder="Role"
                                />
                                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg
                                        class="h-5 w-5 text-gray-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div class="absolute mt-2 w-full bg-white rounded-xl shadow-lg z-10 hidden">
                                    <ul class="py-1">
                                        <li>
                                            <a
                                                href="#"
                                                class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                            >
                                                Option 1
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                            >
                                                Option 2
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                                            >
                                                Option 3
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* PASSWORD */}
                            <div className="w-ful border-[1.4px] relative border-gray-400 rounded-xl xl:basis-2/4">
                                <TextInput
                                    className="w-full rounded-xl"
                                    type="password"
                                    placeholder="Password"
                                />
                                <ViewHideSvg />
                            </div>
                            <button className="w-full h-fit bg-[#7d5e42] text-white py-2 rounded-lg xl:basis-1/4">
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
                <div className="hidden">
                    <div className="w-[350px] h-40px] border-[3px] mx-auto z-10 rounded-xl flex ">
                        <div className="flex-row mx-auto mt-[30px]">
                            <h1 className="text-2xl font-bold text-center mt-3">
                                Detail Kasir
                            </h1>
                            <p className="font-bold text-center text-md">
                                Lihat Kasir😀
                            </p>
                            <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                                <p className="text-gray-600 font-bold">Nama:</p>
                                <p className="">Justin</p>
                                <p className="text-gray-600 font-bold">Jam:</p>
                                <p className="">08.35</p>
                                <p className="text-gray-600 font-bold">
                                    Status:
                                </p>
                                <p className="">Aktif</p>
                            </div>
                            <div className="flex mb-[30px] mt-[20px]">
                                <button className="hover:bg-[#7d5e42] hover:text-white hover:border-none font-bold py-2 px-4 rounded w-[100px] border border-slate-800 transition-colors">
                                    Edit
                                </button>
                                <button className="hover:bg-[#7d5e42] hover:text-white hover:border-none font-bold py-2 px-4 rounded ml-2 w-[100px] border border-slate-800 transition-colors">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BodyLayout>
    );
}

export default Kasir;
