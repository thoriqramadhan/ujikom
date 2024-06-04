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
import RadioGroup from "./RadioGroup";

function Menu({ menus, categories, order , tax}) {
    console.log(tax)
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
         printReceipt(); //
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
    const [openModalPay, setOpenModalPay] = useState(true)

    // paymentData
    const [paymentMethod , setPaymentMethod] = useState([{
        paymentMethod: 'qris'
    }])
    useEffect(()=>{
        console.log(paymentMethod)
    },[paymentMethod])
    
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
    };

    const modalPayHandler = () => {
        setOpenModalPay(!openModalPay);
        setOpenModalCashless(!OpenModalCashless)
    };

    const printReceipt = () => {
    const receiptWindow = window.open("", "PRINT", "height=450,width=150");
        receiptWindow.document.write(`<html><head><title>Receipt</title>`);
        receiptWindow.document.write(`
            <style>
            @page {
                size: auto;
                margin: 0;
            }
                body {
                    font-family: 'Courier New', Courier, monospace;
                    width: 58mm;
                    margin: 0 auto;
                    padding: 10px;
                    font-size: 12px;
                    line-height: 1.5;
                }
                .header, .footer {
                    text-align: center;
                    margin-bottom: 10px;
                }
                .content {
                    margin-bottom: 10px;
                }
                .line {
                    display: flex;
                    justify-content: space-between;
                }
                .line p {
                    margin: 0;
                }
                .total {
                    font-weight: bold;
                }
                .dashed-line {
                    border-top: 1px dashed #000;
                    margin: 10px 0;
                }
                h1 {
                    margin: 0;
                    font-size: 16px;
                }
            </style>
        `);
        receiptWindow.document.write("</head><body>");
        receiptWindow.document.write(`
            <div class="header">
                <h1>Menata Cafe</h1>
                <p>Lampung, Indonesia</p>
              
            </div>
            <div class="dashed-line"></div>
            <div class="content">
                <p>${new Date().toLocaleDateString()}</p>
                <p>${modalData.name}</p>
                <p>${new Date().toLocaleTimeString()}</p>
                <p>No.0-1</p>
            </div>
            <div class="dashed-line"></div>
        `);
    
        modalData.menu.forEach(order => {
            receiptWindow.document.write(`
                <div class="content">
                    <p>${order.name}</p>
                    <div class="line">
                        <p>${order.items} x ${formatRupiah(order.total / order.items)}</p>
                        <p>${formatRupiah(order.total)}</p>
                    </div>
                </div>
            `);
        });
    
        receiptWindow.document.write(`
            <div class="dashed-line"></div>
            <div class="content">
                <div class="line">
                    <p>Total</p>
                    <p>${formatRupiah(modalData.total)}</p>
                </div>
                <div class="line">
                    <p>Bayar</p>
                    <p>${formatRupiah(buyersMoney)}</p>
                </div>
                <div class="line">
                    <p>Kembali</p>
                    <p>${formatRupiah(total)}</p>
                </div>
            </div>
            <div class="dashed-line"></div>
            <div class="footer">
                <p>Link Kritik dan Saran:</p>
                <p>kpntnr.com/f/</p>
            </div>
            <div class="footer">
                
            <img src="https://tse4.mm.bing.net/th?id=OIP.Gu1NStDpNVmWisgSKKBzewHaEK&pid=Api&P=0&h=180" alt="Kasir Pintar" style="width: 50px;">
            <img src="https://tse4.mm.bing.net/th?id=OIP.Gu1NStDpNVmWisgSKKBzewHaEK&pid=Api&P=0&h=180" alt="Google Play" style="width: 50px;">

            </div>
        `);
    
        receiptWindow.document.write("</body></html>");
        receiptWindow.document.close();
        receiptWindow.print();
    };
    
    

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
                    onClick={() => setOpenModal(!openModal)}
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
                        <button
                            className="w-full rounded-[18px] py-[15px] mb-[10px] font-bold text-[#7D5E42] border-[#7D5E42] border"
                            onClick={modalCashlessHandler}
                        >
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

            {/* modalChoosePayment */}
            <div
                className={`absolute top-0 left-0 w-full h-full flex justify-center duration-1000  ${
                    OpenModalCashless
                        ? "-translate-y-[1000px]"
                        : "translate-y-10 fixed"
                } transition-all`}
            >
                <div className="bg- bg-white border-[#d9d9d9] border-2 h-[450px] w-[1000px] my-[10%] rounded-xl px-[50px] py-[20px] text-center flex-row">
                    <p className="font-bold text-3xl">
                        Pilih Metoda Pembayaran
                    </p>
                    <p className="text-xl">
                        Pilih metode pembayaran yang di gunakan pelanggan!
                    </p>
                    <div className="mt-7">
                        <RadioGroup paymenthMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/>

                        <button className="bg-white border-[#d9d9d9] border-2 font-bold text-[#d9d9d9] text-md py-2 px-[100px] rounded-2xl mt-12 hover:bg-[#7d5e42] hover:text-white" onClick={modalPayHandler}>
                            Lanjut
                        </button>
                        <button
                            className="bg-white border-[#d9d9d9] border-2 font-bold text-[#d9d9d9] text-md py-2 px-3 rounded-2xl mt-12 hover:bg-[#7d5e42] hover:text-white ml-3"
                            onClick={modalCashlessHandler}
                        >
                            Kembali
                        </button>
                    </div>
                </div>
            </div>
            {/* modalDetailPayment */}
            <div
                className={`absolute w-full h-full flex ${
                    openModalPay
                        ? "-translate-y-[1000px]"
                        : "translate-y-10 fixed"
                } transition-all duration-1000`}
            >
                <div className="bg-white border-[3px] border-[#d9d9d9] w-[1000px] h-fill mx-auto my-auto rounded-xl flex-row py-10 relative">
                    <div className="flex-row justify-center pb-5 ">
                        <p className="text-3xl font-black text-center">
                            Tunggu Bukti Pembayaran
                        </p>
                        <p className="text-xl font-black text-center">
                            Minta tanda bukti pembayaran ke pelanggan 😀
                        </p>
                    </div>
                    <div className=" w-[300px] h-[300px] bg-white border-[3px] border-[#d9d9d9] mx-auto my-auto rounded-xl flex-row content-center mb-5">
                        <div className="mx-auto my-auto h-[100px] w-[100px] mb-5 bg-[#d9d9d9] rounded-full"></div>
                        <p className="text-center font-black text-3xl">BRI</p>
                    </div>
                    <div className="w-full justify-center flex">
                        <button className="bg-[#7d5e42] rounded-md py-3 px-[100px] text-white font-bold">
                            Print & Bayar
                        </button>
                    </div>
                <button className="absolute top-0 right-3 font-black text-red-500 text-3xl" onClick={() => {
                    setOpenModalPay(!openModalPay)
                }}>X</button>
                </div>
            </div>
        </>
    );
}
export default Menu;
