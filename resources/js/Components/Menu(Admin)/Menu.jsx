import React, { useEffect, useState } from "react";
import BodyLayout from "@/Layouts/BodyLayout";
import LogoDate from "../Logo_date";
import TextInput from "../TextInput";
import SearchSvg from "../svgComp/SearchSvg";
import MenuTab from "./MenuTab";
import Checklist from "../svgComp/Checklist";
import { Inertia } from "@inertiajs/inertia";
import TableData from "../TableData";
import TrashSvg from "../svgComp/TrashSvg";


function Menu({ menus, categories }) {
    const [openModal, setOpenModal] = useState(false);
    const [modalCategories, setModalCategories] = useState(true);
    const [categoriesData, setCategoriesData] = useState(categories || []);
    const [nama, setNama] = useState("");
    const [harga, setHarga] = useState("");
    const [categories_id, setCategoriesId] = useState("");
    const [kategori, setKategori] = useState("");
    const [mode, setMode] = useState("Kategori");
    const [idCategorie, setIdCategorie] = useState(1);

    const [editKategori, setEditKategori] = useState("");

    // search data
    const [searchInput, setSearchInput] = useState("");
    const [searchOutput, setSearchOutput] = useState([]);

    const searchHandler = (value) => {
        setSearchInput(value);
        if (value.trim() === "") {
            console.log("in kosong");
            setSearchOutput([]);
            return;
        }
        const trimmedValue = value.replace(/\s+/g, "").toLowerCase();
        const searchResult = menus.filter((menu) => {
            const trimmedMenuName = menu.nama.replace(/\s+/g, "").toLowerCase(); // Menghapus semua spasi dari nama menu dan ubah ke huruf kecil
            return trimmedMenuName.includes(trimmedValue);
        });
        setSearchOutput(searchResult);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isDuplicate = menus.find((menu) => menu.nama == nama);
        if (nama === "" || categories_id === "" || harga === "") {
            alert("Data belum komplit!");
            return;
        } else if (isDuplicate) {
            alert(`${isDuplicate.nama} sudah ada!`);
        }

        const formData = new FormData();
        formData.append("categories_id", categories_id);
        formData.append("nama", nama);
        formData.append("harga", harga);

        // Mengirim permintaan POST menggunakan Inertia.postFormData
        Inertia.post("/adminstore", formData).then(() => {
            setNama("");
            setHarga("");
            Inertia.reload();
        });
    };

    const handleSubmitKategori = (e) => {
        e.preventDefault();
        const isDuplicate = categories.find(
            (categorie) => categorie.kategori == kategori
        );
        console.log(isDuplicate);

        if (kategori === "") {
            alert("Data belum komplit!");
            return;
        } else if (isDuplicate) {
            alert(isDuplicate.kategori + " sudah ada!");
            return;
        }

        const formData = new FormData();
        formData.append("kategori", kategori);

        // Mengirim permintaan POST menggunakan Inertia.postFormData
        Inertia.post("/adminkategori", formData).then(() => {
            setKategori("");
            Inertia.reload();
        });
    };

    const editCategoriesHandler = (id) => {
        setModalCategories(!modalCategories);
        const categorieObj = categoriesData.find((item) => item.id == id);
        setEditKategori(categorieObj.kategori);
        setIdCategorie(id);
    };
    function saveCategorieHandler(){
      if(editKategori == ''){
        return
      }
      setModalCategories(!modalCategories);
        const categorieObj = categoriesData.find(
            (item) => item.id == idCategorie
        );
        const newCategoriesData = categoriesData.map((items) => {
            if (items.id == idCategorie) {
                return {
                    ...categorieObj,
                    kategori: editKategori,
                };
            } else {
                return items;
            }
        });
        setCategoriesData(newCategoriesData);
    };
    const deleteCategorieHandler = (id) => {
        // Tampilkan pop up konfirmasi
        const isConfirmed = window.confirm("Anda yakin akan menghapus kategori ini?");
        if (!isConfirmed) {
            return; // Jika pengguna membatalkan, hentikan penghapusan
        }
    
        // Kirim permintaan DELETE menggunakan Inertia.delete atau fungsi serupa
        Inertia.delete(`/admindeletekategori/${id}`)
            .then(() => {
                // Jika penghapusan berhasil, update data kategori yang ditampilkan
                const newCategoriesData = categoriesData.filter(
                    (item) => item.id !== id
                );
                setCategoriesData(newCategoriesData);
            })
            .catch((error) => {
                // Tangani kesalahan jika ada
                console.error('Error deleting kategori:', error);
            });
    };

    const handleEditKategori = () => {
        // Pastikan editKategori tidak kosong
        if (editKategori === '') {
            return;
        }
    
        // Kirim permintaan PUT menggunakan Inertia.put
        Inertia.put(`/admineditkategori/${idCategorie}`, { kategori: editKategori })
            .then(() => {
                // Setelah berhasil mengedit, lakukan langkah-langkah berikut:
                // 1. Tutup modal
                setModalCategories(!modalCategories);
                // 2. Lakukan reload data atau langkah lain yang diperlukan
                //    Di sini Anda dapat melakukan hal seperti memperbarui state kategori setelah pengeditan
            })
            .catch((error) => {
                // Tangani kesalahan jika ada
                console.error('Error editing kategori:', error);
            });
    };
    useEffect(() => {
        console.log(categories_id);
    }, [categories_id]);

    return (
        <BodyLayout className={"md:mr-5"}>
            {/* Headers */}
            <div className="mt-[40px] lg:w-full">
                <LogoDate />
                {/* modal */}
                <div
                    className={`w-full relative transition-all duration-1000 ${
                        openModal
                            ? "translate-x-0 z-5"
                            : "-translate-x-[2000px]"
                    }`}
                >
                    <div className="w-full h-[80vh] bg-white absolute">
                        {/* modal header */}
                        <div className="flex items-center mt-[40px] mb-[20px]">
                            <p className="flex-1 text-2xl font-bold">
                                Daftar Item
                            </p>
                            <select
                                name=""
                                id=""
                                value={mode}
                                onChange={(e) => {
                                    setMode(e.target.value);
                                }}
                                className="hidden h-fit py-[12px] border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm mr-5 md:block"
                            >
                                <option value="Menu">Tambah Menu</option>
                                <option value="Kategori">
                                    Tambah Kategori
                                </option>
                            </select>
                            <button
                                className="w-[105px] h-fit py-[12px] rounded-xl border bg-white"
                                type="button"
                                onClick={() => {
                                    setOpenModal(!openModal);
                                }}
                            >
                                {" "}
                                {"<"} Kembali
                            </button>
                        </div>
                        {/* modal body */}

                        <div className="w-full flex flex-col items-center  md:flex-row md:gap-x-[20px]">
                            <select
                                name=""
                                id=""
                                value={mode}
                                onChange={(e) => {
                                    setMode(e.target.value);
                                }}
                                className="w-full mb-5 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm md:hidden"
                            >
                                <option value="Menu">Menu</option>
                                <option value="Kategori">Kategori</option>
                            </select>
                            {/* body */}
                            {mode === "Menu" ? (
                                <>
                                    <div className="w-[175px] h-[175px] bg-gray-400 rounded-xl"></div>
                                    <div className="flex-1 w-full mb-[100px] md:mb-0">
                                        <form onSubmit={handleSubmit}>
                                            <div className="flex flex-col w-full md:flex-row md:gap-x-[20px]">
                                                <TextInput
                                                    className="w-full md:w-[383px] md:h-[50px] my-[15px] md:my-0"
                                                    placeholder="Nama Menu"
                                                    value={nama}
                                                    onChange={(e) =>
                                                        setNama(e.target.value)
                                                    }
                                                    required
                                                />
                                                <select
                                                    name=""
                                                    id=""
                                                    className="w-full flex-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm "
                                                    onChange={(e) =>
                                                        setCategoriesId(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                >
                                                    <option value="">
                                                        Pilih Kategori
                                                    </option>
                                                    {categoriesData.map(
                                                        (item) => (
                                                            <option
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {item.kategori}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                            <div className="flex-col flex w-full gap-x-[20px] md:mt-[40px] md:flex-row">
                                                <TextInput
                                                    className="w-full my-[15px] md:w-[383px] md:h-[50px] md:my-0"
                                                    type="number"
                                                    placeholder="Harga"
                                                    value={harga}
                                                    onChange={(e) =>
                                                        setHarga(e.target.value)
                                                    }
                                                    required
                                                />
                                                <div className="flex-1 flex md:justify-end">
                                                    <div className="w-full flex relative items-center md:w-[249px]">
                                                        <Checklist className="absolute left-[36%] sm:left-[40%] md:left-[60px]" />
                                                        <button
                                                            className="w-full text-lg md:w-[249px] py-[10px] rounded-xl text-white bg-[#7D5E42]"
                                                            type="submit"
                                                        >
                                                            Simpan
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col w-full mb-[100px] relative">
                                    <table className="w-full mt-[24px] mb-[24px] overflow-hidden rounded-xl">
                                        <tr className="rounded-2xl bg-[#F3F3F3] h-[60px] px-[42px]">
                                            <th className="text-[#797979] font-bold text-lg w-[40%]">
                                                Nama Kategori
                                            </th>
                                            <th className="w-[60%]"></th>
                                        </tr>
                                        {categoriesData.length == 0 ? (
                                            <p>Tidak ada data Kategori</p>
                                        ) : (
                                            categoriesData.map((categorie) => (
                                                <tr className="h-fit w-full border-bottom border">
                                                    <TableData
                                                        text={
                                                            categorie.kategori
                                                        }
                                                    />
                                                    <td className="h-[60px] px-[20px] w-full flex justify-end items-center">
                                                        <button
                                                            className="bg-[#E8E8E8] px-[20px] py-[4px] rounded-xl border"
                                                            onClick={() => {
                                                              editCategoriesHandler(
                                                                    categorie.id
                                                                );
                                                            }}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="ml-[10px]"
                                                            onClick={() =>
                                                                deleteCategorieHandler(
                                                                    categorie.id
                                                                )
                                                            }
                                                        >
                                                            <TrashSvg />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </table>
                                    <div className="mt-[40px] mb-[10px]">
                                        <p className="font-bold text-xl">
                                            Tambah Kategori
                                        </p>
                                        <p className="">
                                            Tambah variasi kategori yang anda
                                            punya 😀
                                        </p>
                                    </div>
                                    <form
                                        onSubmit={handleSubmitKategori}
                                        className="w-full h-fit flex flex-col items-end"
                                    >
                                        <TextInput
                                            className="w-full"
                                            placeholder="Nama Kategori"
                                            value={kategori}
                                            onChange={(e) =>
                                                setKategori(e.target.value)
                                            }
                                            required
                                        />
                                        <div className="w-full flex relative items-center mt-5 md:w-[249px]">
                                            <Checklist className="absolute left-[36%] sm:left-[40%] md:left-[60px]" />
                                            <button
                                                className="w-full text-lg md:w-[249px] py-[10px] rounded-xl text-white bg-[#7D5E42]"
                                                type="submit"
                                            >
                                                Simpan
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* end of modal */}

                <div
                    className={`mt-[20px] w-full flex gap-x-[10px] lg:justify-between  ${
                        openModal ? "hidden" : "block"
                    }`}
                >
                    <div className="relative flex-1 lg:w-[365px] lg:flex-none">
                        <TextInput
                            className="pl-[40px] h-[50px] w-[100%]"
                            placeholder="Cari Menu"
                            value={searchInput}
                            onChange={(e) => {
                                searchHandler(e.target.value);
                            }}
                        />
                        <SearchSvg />
                    </div>
                    <button
                        className="h-[50px] w-[50px] bg-[#7D5E42] rounded-xl text-white flex justify-center items-center lg:px-[20px] lg:w-fit"
                        onClick={() => {
                            setOpenModal(!openModal);
                        }}
                    >
                        <span className="text-3xl relative lg:-top-[2px] lg:-left-[2px]">
                            +
                        </span>
                        <span className="hidden lg:block">Tambah Menu</span>
                    </button>
                </div>
            </div>
            {/* modal edit categoires */}
            <div
                className={`w-full h-[50vh] -left-[0px] bottom-[115px] absolute bg-white shadow-lg transition-all duration-1000 justify-center flex-row  mx-auto z-50 rounded-t-xl md:w-[80vw] md:left-28 md:h-fill md:pb-[20px] md:h-fit md:bottom-[200px] ${
                  modalCategories ? "-translate-y-[1000px]" : "translate-y-10 "
                } transition-all `}
            >
                <div className="w-full flex-row text-center mt-[20px] md:mt-[40px]">
                    <p className="text-2xl font-bold md:text-[35px] md:font-black">Edit kategori</p>
                    <p className="md:text-xl md:mt-2">Tambah varian menu dan <br/> kategori anda  😀</p>
                </div>
                <div className="w-fill mt-[40px] mx-[26px]">
                    {/* <label
                        htmlFor="editKate"
                        className="text-xl font-bold block mb-[10px] opacity-50"
                    >
                        Nama Kategori
                    </label> */}
                    <input
                        type="text"
                        name="editKate"
                        id=""
                        value={editKategori}
                        placeholder="Nama Kategori"
                        onChange={(e) => {
                            setEditKategori(e.target.value);
                        }}
                        className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm "
                    />
                </div>
                <div className="w-full flex flex-col justify-center items-end gap-x-[10px] py-[20px] flex-1 px-[20px] md:mt-5 md:flex-row">
                    <button
                        className="px-[30px] h-[40px] w-full bg-[#7d5e42] border-2  rounded-lg  flex items-center cursor-pointer "
                        onClick={() => {
                            setModalCategories(!modalCategories);
                        }}
                    >
                        <p className="text-lg font-bold text-white ]">Kembali</p>
                    </button>
                    <button className="px-[30px] h-[40px] w-full bg-[#7d5e42] border-2  rounded-lg  flex items-center cursor-pointer" onClick={() => {
        handleEditKategori();
    }}>
                        <p
                            className="text-lg font-semibold text-white ]"
                        >
                            Simpan
                        </p>
                    </button>
                </div>
            </div>
            {/* end of modal categories */}
            {/* categories */}
            <div className={`w-full ${openModal ? "hidden" : "block"}`}>
                <MenuTab
                    searchOutput={searchOutput}
                    categories={categories}
                    menus={menus} 
                />
            </div>
        </BodyLayout>
    );
}

export default Menu;
