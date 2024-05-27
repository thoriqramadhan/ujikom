import React, { useEffect, useState } from "react";
import TextInput from "@/Components/TextInput";
import MenuTab from "@/Components/Menu/MenuTab";
import MenuHistory from "@/Components/Menu/MenuHistory";
import SearchSvg from "@/Components/svgComp/SearchSvg";
import BodyLayout from "@/Layouts/BodyLayout";
import LogoDate from "../Logo_date";
import DashedLine from "../DashedLine";
import TableData from "../TableData";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import PopUp from "../PopUp";
import { formatRupiah } from "@/module/rupiah-formater";
import Checkbox from "../Checkbox";

function Menu({ menus, categories, order }) {
    const [openSide, setOpenSide] = useState(false);
    const [openModal, setOpenModal] = useState(true);
    // const [openModalPayment, setOpenModalPayment] = useState(true);
    const strg = JSON.parse(localStorage.getItem("ORDER_HISTORY"));
    const [selectedFood, setSelectedFood] = useState(strg || []);
    const subHarga = selectedFood.reduce((total, item) => {
        return total + item.totalHarga;
    }, 0);
    const [modalData, setModalData] = useState({
        id: +new Date(),
        customerName: "Yudi Santoso",
        subTotal: 100,
        tax: 10,
        total: 110,
        menu: ["Ayam", "Sapi"],
    });
    const [OpenModalCashless, setOpenModalCashless] = useState(true);
     
    const [buyersMoney, setBuyersMoney] = useState(0);
    let total = buyersMoney - parseFloat(modalData.total) || 0;
    function clientHandler(e) {
        setBuyersMoney(parseFloat(e.target.value));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(buyersMoney, total);
        if (buyersMoney < modalData.total) {
            alert("Not enough money!");
            return;
        }
        const tax = Number(modalData.tax);
        const order = {
            customerName: modalData.name, // Menggunakan modalData.customerName
            tax: tax,
            totalHarga: subHarga + tax,
            data: [...selectedFood],
        };

        console.log("ini order:", order);

        const formData = new FormData();
        formData.append("order", JSON.stringify(order));
        setSelectedFood([]);
        localStorage.setItem("ORDER_HISTORY", JSON.stringify([]));

        Inertia.post("/kasirstorespontan", formData).then(() => {
            Inertia.reload();
        });
    };
    const [condition, setCondition] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchOutput, setSearchOutput] = useState([]);
    const [popUpMsg, setPopUpMsg] = useState("");
    const handlePopUp = (msg) => {
        setCondition(!condition);
        setPopUpMsg(msg);
    };
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
        console.log(searchResult);
        setSearchOutput(searchResult);
    };

    const modalCashlessHandler = () => {
      setOpenModalCashless(!OpenModalCashless);
      setOpenModal(!openModal);
    }

    return (
        <>
            <Head title="Menu" />
            <PopUp
                condition={condition}
                msg={popUpMsg}
                setCondition={setCondition}
            />
            <BodyLayout>
                <div
                    className="pt-[40px] px-[40px] flex justify-between"
                    id="header"
                >
                    <LogoDate />
                    <div className="w-[60%] h-fit relative">
                        <SearchSvg />
                        <TextInput
                            className="pl-[40px] h-[50px] w-[100%]"
                            placeholder="Cari menu"
                            value={searchInput}
                            onChange={(e) => searchHandler(e.target.value)}
                        />
                    </div>
                </div>

                <div
                    className="bg-[#F9F9F9] h-fit pb-[10%] pt-[40px] mt-[46px]"
                    id="body"
                >
                    <MenuTab
                        searchOutput={searchOutput}
                        categories={categories}
                        menus={menus}
                        selectedFood={selectedFood}
                        setSelectedFood={setSelectedFood}
                    />
                </div>
            </BodyLayout>
            <MenuHistory
                formatRupiah={formatRupiah}
                handlePopUp={handlePopUp}
                openModal={openModal}
                setOpenModal={setOpenModal}
                setModalData={setModalData}
                openSide={openSide}
                setOpenSide={setOpenSide}
                selectedFood={selectedFood}
                setSelectedFood={setSelectedFood}
            />
            <div
                onClick={() => setOpenSide(true)}
                className={`w-[50px] h-[50px] bg-[#7D5E42] rounded-full fixed flex justify-center items-center text-2xl text-white right-4 top-1/2 cursor-pointer ${
                    openSide ? "hidden" : "block"
                }`}
            >
                {"<"}
            </div>
            {/* Modal */}
            <div
                className={`h-fit w-[75%] flex flex-col px-[25px] pb-[20px] items-center transition-all duration-1000  bg-white rounded-xl border shadow-lg absolute left-1/2 right-1/2 -translate-x-1/2 ${
                    openModal ? "-translate-y-[1000px]" : "translate-y-10 fixed"
                }`}
            >
                <p className="font-bold  mt-[30px] text-2xl">Bayar Pesanan</p>
                <p>Langsung bayar pesanan punya {modalData.name}</p>
                <p
                    className="text-xl absolute top-10 right-10 cursor-pointer"
                    onClick={() => 
                      setOpenModal(!openModal)}
                >
                    X
                </p>
                <div className="w-full h-fit mt-[10px] flex gap-x-[30px]">
                    <div className="basis-2 flex-1 bg-white rounded-xl border ">
                        <table className="w-full h-fit rounded-xl overflow-hidden bg-white">
                            <tr className="rounded-2xl bg-[#F3F3F3] h-[60px]">
                                <th className="flex-1 opacity-60">
                                    Nama Makanan
                                </th>
                                <th className="flex-1 opacity-60">Jumlah</th>
                                <th className="flex-1 opacity-60">Harga</th>
                            </tr>
                            {modalData.menu.length == 0 ? (
                                <p className="">Tidak ada data</p>
                            ) : (
                                modalData.menu.map((orders, index) => (
                                    <tr
                                        key={index}
                                        className="h-fit border-bottom-1"
                                    >
                                        <TableData text={orders.name} />
                                        <TableData text={orders.items} />
                                        <TableData
                                            text={formatRupiah(orders.total)}
                                        />
                                    </tr>
                                ))
                            )}
                        </table>
                    </div>

                    <div className="w-[330px] h-fit border rounded-xl bg-white flex flex-col justify-center py-[20px] px-[25px]">
                        <div className="w-full flex justify-between">
                            <p className="opacity-30 font-bold">Sub Total</p>
                            <p className="font-bold">
                                {formatRupiah(modalData.subTotal)}
                            </p>
                        </div>
                        <div className="w-full flex justify-between">
                            <p className="opacity-30 font-bold">
                                {"Pajak (10%)"}
                            </p>
                            <p className="font-bold">
                                {formatRupiah(modalData.tax)}
                            </p>
                        </div>
                        <DashedLine />
                        <div className="w-full flex justify-between mt-[20px]">
                            <p className="opacity-30 font-bold">Total</p>
                            <p className="font-bold">
                                {formatRupiah(modalData.total)}
                            </p>
                        </div>
                        <input
                            type="number"
                            name=""
                            id=""
                            className="mt-[20px]"
                            onChange={clientHandler}
                            value={buyersMoney}
                            placeholder="Uang Pembeli"
                        />
                        <div className="w-full flex justify-between mt-[20px] mb-[120px]">
                            <p className="opacity-30 font-bold">Kembalian</p>
                            <p className="font-bold">
                                {formatRupiah(total) || 0}
                            </p>
                        </div>
                        <button className="w-full rounded-[18px] py-[15px] mb-[10px] font-bold text-[#7D5E42] border-[#7D5E42] border" onClick={modalCashlessHandler}>
                            Bayar Cashless
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="w-full rounded-[18px] py-[15px] font-bold text-white bg-[#7D5E42]"
                        >
                            Bayar Tunai
                        </button>
                    </div>
                </div>
            </div>
            // modal
            <div className={`absolute top-0 left-0 w-full h-full flex justify-center duration-1000  ${
  OpenModalCashless ? "-translate-y-[1000px]" : "translate-y-10 fixed"} transition-all`}>
                <div className="bg- bg-white border-[#d9d9d9] border-2 h-[450px] w-[1000px] my-[10%] rounded-xl px-[50px] py-[20px] text-center flex-row">
                    <p className="font-bold text-3xl">
                        Pilih Metoda Pembayaran
                    </p>
                    <p className="text-xl">
                        Apa yang bakal dia gunain buat bayar pesanan
                    </p>
                    <div className="mt-7">
                        <div className=" group hover:bg-slate-200 focus:bg-slate-200 w-full border-[#d9d9d9] border-2 h-fill mb-5 rounded-xl flex justify-between px-10 py-4 peer-checked/draft:bg-sky-500">
                          <div className="flex justify-between">
                            <img src="./resources/assets/img/qris.jpg" alt="Qris" className="h-[50px] w-[50px] mr-5 rounded-full bg-[#d9d9d9]"/>
                            
                          <p className="font-bold text-[30px] my-auto">Q-Ris</p>
                        
                          
                          </div>
                          <input id="draft" class="peer/draft" type="radio" name="status" className="my-auto " checked />
                          
                        </div>

                        <div className=" group hover:bg-slate-200 focus:bg-slate-200 w-full border-[#d9d9d9] border-2 h-fill mb-5 rounded-xl flex justify-between px-10 py-4">
                          <div className="flex justify-between">
                            <img src="" alt="Qris" className="h-[50px] w-[50px] mr-5 rounded-full bg-[#d9d9d9]"/>
                          <p className="font-bold text-[30px] my-auto">BriMo</p>
                          
                          
                          </div>
                          <input id="published" class="peer/published" type="radio" name="status" className="my-auto" />
                        </div>
                        
                        
                        <button className="bg-white border-[#d9d9d9] border-2 font-bold text-[#d9d9d9] text-md py-2 px-[100px] rounded-2xl mt-12 hover:bg-[#7d5e42] hover:text-white">
                          Lanjut
                        </button>
                        <button className="bg-white border-[#d9d9d9] border-2 font-bold text-[#d9d9d9] text-md py-2 px-3 rounded-2xl mt-12 hover:bg-[#7d5e42] hover:text-white ml-3" onClick={modalCashlessHandler}>
                          Kembali
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Menu;
