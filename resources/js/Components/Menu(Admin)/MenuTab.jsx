import React, { useEffect, useState } from "react";
import MenuItemTab from "../Menu/MenuItemTab";
import { formatRupiah } from "@/module/rupiah-formater";
import Checkbox from "../Checkbox";
import Checklist from "../svgComp/Checklist";

function MenuTab({ searchOutput, categories, menus }) {
    const [activeTab, setActiveTab] = useState("Semua");
    const [menu, setMenu] = useState(menus);
    const [openModalEditMenu, setOpenModalEditMenu] = useState(true);
    // dataModal
    const [dataModalId, setDataModalId] = useState();
    const [dataModalMenu, setdataModalMenu] = useState();
    const [dataModalKategori, setdataModalKategori] = useState();
    const [dataModalHarga, setdataModalHarga] = useState();
    console.log(menu);
    useEffect(() => {
        if (activeTab != "Semua") {
            const categorie = categories.find(
                (item) => item.kategori == activeTab
            );
            const newMenu = menus.filter(
                (item) => item.categories_id == categorie.id
            );
            setMenu(newMenu);
        } else {
            setMenu(menus);
        }
    }, [activeTab]);

    const inputHandler = (value , setter) => {
        setter(value)
    }

    function detailHandler(id, nama, categories_id,harga) {
        setOpenModalEditMenu(!openModalEditMenu);
        setDataModalId(id);
        setdataModalMenu(nama);
        setdataModalKategori(categories_id);
        setdataModalHarga(harga);
        console.log("setDataModal:", harga)
    }
    
    return (
        <>
            {/* categories */}
            <div className="w-full flex overflow-scroll h-fit gap-x-4 mt-[20px]">
                <MenuItemTab
                    name={"Semua"}
                    active={activeTab}
                    setActiveTab={setActiveTab}
                />
                {categories.map((item) => (
                    <MenuItemTab
                        name={item.kategori}
                        active={activeTab}
                        setActiveTab={setActiveTab}
                    />
                ))}
            </div>
            <div
                className={`w-full h-fit mt-[40px] flex gap-y-4 flex-wrap ${
                    menu.length == 1 ? "justify-start" : "justify-evenly"
                } md:justify-start md:gap-x-[40px]`}
            >
                {/* card */}
                {searchOutput.length == 0 ? (
                    menu.length == 0 ? (
                        <p className="text-xl font-bold text-center">
                            Tidak ada menu di kategori ini!
                        </p>
                    ) : (
                        menu.map((item) => (
                            <div className="w-[250px] rounded-[30px] bg-white border shadow-lg px-[20px] pt-[27px] pb-[18px] shrink-0 flex flex-col">
                                <div className="h-[150px] w-full bg-[#F4F4F4] rounded-[25px]"></div>

                                <div className="flex-1 h-fit w-full flex flex-col mt-2 mb-3">
                                    <p className="font-bold text-[22px]">
                                        {item.nama}
                                    </p>
                                    <p className="font-bold opacity-60 text-[20px]">
                                        {formatRupiah(item.harga)}
                                    </p>
                                </div>
                                <button
                                    className="w-full h-[41px] bg-[#7D5E42] rounded-xl text-white text-[18px] py-[5px]"
                                    onClick={() => {
                                        detailHandler(
                                            item.id,
                                            item.nama,
                                            item.categories_id,
                                            item.harga,
                                        );
                                    }}
                                >
                                    <p className="font-[500]">Edit</p>
                                </button>
                            </div>
                        ))
                    )
                ) : (
                    searchOutput.map((item) => (
                        <div className="w-[250px] rounded-[30px] bg-white border shadow-lg px-[20px] pt-[27px] pb-[18px] shrink-0 flex flex-col">
                            <div className="h-[150px] w-full bg-[#F4F4F4] rounded-[25px]"></div>

                            <div className="flex-1 h-fit w-full flex flex-col mt-2 mb-3">
                                <p className="font-bold text-[22px]">
                                    {item.nama}
                                </p>
                                <p className="font-bold opacity-60 text-[20px]">
                                    {formatRupiah(item.harga)}
                                </p>
                            </div>
                            <button
                                className="w-full h-[41px] bg-[#7D5E42] rounded-xl text-white text-[18px] py-[5px]"
                                onClick={() => {
                                    detailHandler(
                                        item.id,
                                        item.nama,
                                        item.categorie,
                                        item.harga,
                                    );
                                }}
                            >
                                <p className="font-[500]">Edit</p>
                            </button>
                        </div>
                    ))
                )}
            </div>
            <div
                className={`absolute top-0 left-0 w-full h-full flex justify-center duration-1000  ${
                    openModalEditMenu
                        ? "-translate-y-[1000px]"
                        : "translate-y-10 fixed"
                } transition-all`}
            >
                <div className="flex-row bg-white w-[300px] h-[440px] mt-[50%] rounded-[20px] border-2 border-[#d9d9d9] md:mt-[5%] md:w-[500px] md:h-[500px] justify-center">
                    <div className="flex-col mx-auto p-5 text-center">
                        <p className="font-bold text-2xl">Edit Menu</p>
                        <p>Edit Menu anda disini! 👳🏻</p>
                    </div>
                    <div className="bg-[#d9d9d9] w-[120px] h-[120px] mx-auto rounded-xl"></div>
                    <div className="flex-col text-center mt-3 md:px-[10px] md:mt-10 md:mx-[75px] mx-[40px]">
                        <input
                            type="text"
                            className=" rounded-xl  w-full "
                            placeholder="Menu"
                            onChange={(e) => {inputHandler(e.target.value, setdataModalMenu)}}
                            value={dataModalMenu}
                            required
                        />
                        <input
                            type="text"
                            className="mt-1 rounded-xl  md:mt-3 w-full"
                            placeholder="Kategori"
                            onChange={(e) => {inputHandler(e.target.value, setdataModalKategori)}}
                            value={dataModalKategori}
                            required
                        />
                        <div className="flex w-full h-full">
                        <p className="text-xl my-auto pl-2 pr-2">Rp.</p>
                        <input
                            type="number"
                            className="mt-1 rounded-xl  md:mt-3 w-full p"
                            placeholder="Harga"
                            onChange={(e) => {inputHandler(e.target.value, setdataModalHarga)}}
                            value={dataModalHarga}
                            required
                        />
                        </div>
                    </div>
                    <div className="flex justify-evenly mt-[15px] w-full ">
                        <button className="w-[90px] bg-[#7d5e42] text-white rounded-[8px]  px-1 py-2 md:w-[120px] md:text-xl">
                            {" "}
                            Simpan{" "}
                        </button>
                        <button className="w-[90px] bg-[#7d5e42] text-white rounded-[8px]  py-1 md:w-[120px] md:text-xl">
                            Hapus
                        </button>
                    </div>
                </div>
                <div className="absolute top-[190px] right-[53px] w-fit h-fit md:top-[87px] md:right-[560px]">
                    <button
                        className="text-2xl text-red-600 font-black md:text-3xl"
                        onClick={() => {
                            setOpenModalEditMenu(!openModalEditMenu);
                        }}
                    >
                        x
                    </button>
                </div>
            </div>
        </>
    );
}

export default MenuTab;
