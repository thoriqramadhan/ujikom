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
import { Inertia } from "@inertiajs/inertia";

const dataOrder = [
    {
        first_name: "customer_name",
        last_name: "order_time",
        email: "A@gmail.com",
        status: "status",
    },
    {
        first_name: "customer_name",
        last_name: "order_time",
        email: "A@gmail.com",
        status: "status",
    },
    {
        first_name: "customer_name",
        last_name: "order_time",
        email: "A@gmail.com",
        status: "status",
    },
    {
        first_name: "customer_name",
        last_name: "order_time",
        email: "A@gmail.com",
        status: "status",
    },
    {
        first_name: "customer_name",
        last_name: "order_time",
        email: "A@gmail.com",
        status: "status",
    },
];

function Kasir({ users, onlykasir }) {
    const [openModal, setOpenModal] = useState(false);
    const [DataUser, setDataUser] = useState(users || "");
    const [DataOnlyKasir, setOnlyKasir] = useState(onlykasir || "");
    console.log(DataOnlyKasir);
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    console.log("ini role:", role);
    const [mode, setMode] = useState("role");
    // modalData
    const [modalNama, setDataNama] = useState("");
    const [modalEmail, setDataEmail] = useState("");
    const roles = [
        { label: "kasir", value: 1 },
        { label: "admin", value: 2 },
    ];
    console.log("DataModalnya :");
    const handleSubmit = (e) => {
        e.preventDefault();

        // Membuat objek FormData untuk mengirim data formulir
        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", role); // Mengirim gambar sebagai bagian dari FormData

        // Mengirim permintaan POST menggunakan Inertia.postFormData
        Inertia.post("/admin", formData).then(() => {
            // Mereset nilai formulir setelah submit
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setRole("");
            // Mereset gambar menjadi null

            // Me-refresh halaman untuk mendapatkan daftar produk terbaru
            Inertia.reload();
        });
    };

    function detailHandler(id, first_name, email) {
        console.log('in')
        setOpenModal(!openModal);
        setDataNama(first_name)
        setDataEmail(email)
    }
    return (
        <BodyLayout>
            <div
                className={`flex justify-center relative transition-all duration-1000 ${
                    openModal ? "translate-x-0 z-10" : "-translate-x-[2000px]"
                }`}
            >
                <div className="  h-[400px] w-[500px] absolute z-10 mt-[200px] rounded-2xl bg-white border-[3px] border-gray-400">
                    <div className=" font-bold pt-3 flex-row text-center">
                        <button
                            className="w-[105px] py-[10px] rounded-xl border bg-white"
                            onClick={() => {
                                setOpenModal(!openModal);
                            }}
                        >
                            {" "}
                            {"<"} Kembali
                        </button>
                        <h3 className="text-2xl">Detail Kasir</h3>
                        <p>Lihat Detail 😀</p>
                    </div>

                    <div className="grid grid-cols-2 text-center mt-10">
                        <p className="font-bold text-gray-700">Nama:</p>
                        <p className="font-bold">{modalNama}</p>
                        <p className="font-bold text-gray-700">Email:</p>
                        <p className="font-bold">{modalEmail}</p>
                    </div>
                    <div className="mt-10 grid grid-cols-1 px-5 gap-2 font-bold text-[#747474]">
                        <button className="bg-[#e8e8e8] py-3  rounded-xl">
                            Edit
                        </button>
                        <button className="bg-[#e8e8e8] py-3  rounded-xl">
                            Hapus
                        </button>
                    </div>
                </div>
            </div>




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
                    {onlykasir.map((onlykasir) => {
                        return (
                            <tr className="h-fit border-bottom-1 border-x-[1px] border-gray-300 border-b-[1px]">
                                <TableData text={onlykasir.first_name} />
                                <TableData
                                    className={"hidden lg:table-cell"}
                                    text={onlykasir.last_name}
                                />
                                <TableData
                                    text={onlykasir.email}
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
                                    <button
                                        className="w-[100px] py-[7px] bg-[#E8E8E8] rounded-lg border-gray-400 border flex xl:hidden "
                                        onClick={() => {
                                            detailHandler(
                                                onlykasir.id,
                                                onlykasir.first_name,
                                                onlykasir.email
                                            );
                                        }}
                                    >
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
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="my-5 space-y-4 sm:flex-col">
                            <div className="flex flex-col gap-4 md:flex-row">
                                <div className="w-full border-[1.4px] border-gray-400 rounded-xl xl:basis-1/4">
                                    <TextInput
                                        className="w-full rounded-xl"
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
                                        className="w-full rounded-xl"
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
                                        className="w-full rounded-xl"
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
                                        <option>--Pilih Role--</option>
                                        <option value="kasir">kasir</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>

                                {/* PASSWORD */}
                                <div className="w-ful border-[1.4px] relative border-gray-400 rounded-xl xl:basis-2/4">
                                    <TextInput
                                        className="w-full rounded-xl"
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
            </div>
        </BodyLayout>
    );
}

export default Kasir;
