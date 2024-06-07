import BodyLayout from "@/Layouts/BodyLayout";
import React, { useEffect, useState } from "react";
import LogoDate from "../Logo_date";
import SearchSvg from "../svgComp/SearchSvg";
import TextInput from "../TextInput";
import TableData from "../TableData";
import DashedLine from "../DashedLine";
import ModalHistoryCard from "./ModalHistoryCard";
import { Head } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { formatRupiah } from "@/module/rupiah-formater";
import RadioGroup from "../Menu/RadioGroup";

function Order({ menus, orders, orderitems, orderbelumdibayar, tax }) {
    const [taxs, setTaxs] = useState(tax || []);
    const [currentPage, setcurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(5);
    const [openModalPayment, setOpenModalPayment] = useState(true);
    const [ordersData, setOrdersData] = useState(orderbelumdibayar);
    const [idNow, setIdNow] = useState(0);
    const [buyersMoney, setBuyersMoney] = useState(0);
    const [bill, setBill] = useState({
        subTotal: 0,
        tax: 0,
        total: 0,
    });
    let change = buyersMoney - bill.total || 0;

    const pageNumbers = [];
    const [paymentMethod, setPaymentMethod] = useState([
        { paymentMethod: "brimo" },
    ]);
    useEffect(() => {
        console.log(paymentMethod);
    }, [paymentMethod]);

    for (
        let i = 1;
        i <= Math.ceil(orderbelumdibayar.length / postPerPage);
        i++
    ) {
        pageNumbers.push(i);
    }

    function editHandler(id) {
        const orderNow = orders.find((order) => order.id === id);
        let newOrdersData = ordersData.find((order) => order.id === id);
        const typeOfOrder = newOrdersData.data;
        setIdNow(id);

        setModalName(orderNow.customer_name);
        if (typeof typeOfOrder == "string") {
            setEditModalData(JSON.parse(typeOfOrder));
        } else {
            setEditModalData(typeOfOrder);
        }

        setOpenModalEdit(!openModalEdit);
    }

    const [tes, setTes] = useState("");
    function paymentHandler(id) {
        setTes(id);
        const orderNow = orders.find((order) => order.id === id);
        let newOrdersData = ordersData.find((order) => order.id === id);
        const typeOfOrder = newOrdersData.data;
        if (!orderNow) {
            console.error(`Order with id ${id} not found`);
            return;
        }
        const parsedData = JSON.parse(orderNow.data);
        console.log(orderNow, parsedData);

        setModalName(orderNow.customer_name);
        if (typeof typeOfOrder == "string") {
            setModalData(JSON.parse(typeOfOrder));
        } else {
            setModalData(typeOfOrder);
        }

        setOpenModalPayment(!openModalPayment);
    }

    const [openModalEdit, setOpenModalEdit] = useState(true);
    const [modalData, setModalData] = useState(ordersData);
    const [modalName, setModalName] = useState("");
    const [editModalData, setEditModalData] = useState([]);

    const [searchInput, setSearchInput] = useState("");
    const [searchOutput, setSearchOutput] = useState([]);

    const [searchModal, setSearchModal] = useState("");
    const [searchOutputModal, setSearchOutputModal] = useState([]);

    function incrementHandler() {
        console.log("in", currentPage, pageNumbers);
        if (currentPage == pageNumbers.length) {
            return;
        }
        setcurrentPage((prevState) => prevState + 1);
    }
    function decrementHandler() {
        if (currentPage == 1) {
            return;
        }
        setcurrentPage((prevState) => prevState - 1);
    }
    function clientHandler(e) {
        setBuyersMoney(parseFloat(e.target.value));
    }
    const printReceipt = () => {
        const receiptWindow = window.open("", "PRINT", "height=450,width=300");
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
                    .isi{
                    display: flex;
                    justify-content: space-between;
                    }
                    .name{
                    text-align: center;
                    }
                    .item{
                    text-align: center;}
            </style>
        `);
        receiptWindow.document.write("</head><body>");
        receiptWindow.document.write(`
            <div class="header">
                <img src="/img/logoKasir.png" class="img"/>
                    <h1>Menata Cafe</h1>
                    <p>Kh. Masmansyur no 103,<br> rawalaut Bandar Lampung</p>
                  
                </div>
                <div class="dashed-line"></div>
                <div class="isi">
                    <p>${new Date().toLocaleDateString()}</p>

                    <p>${new Date().toLocaleTimeString()}</p>
                </div>
                <p class="name"> Belanjaan ${modalName}</p>
                <div class="dashed-line"></div>
                <p class="item">Nih yang dibeli</p>
        `);

        modalData.forEach((order) => {
            receiptWindow.document.write(`
                <div class="content">
                    <p>${order.name}</p>
                    <div class="line">
                        <p>${order.items} x ${formatRupiah(
                order.totalHarga / order.items
            )}</p>
                        <p>${formatRupiah(order.totalHarga)}</p>
                    </div>
                </div>
            `);
        });

        ordersData.forEach((order) => {
            receiptWindow.document.write(`
            <div class="dashed-line"></div>
            <div class="content">
                <div class="line">
                    <p>SubTotal</p>
                    <p>${formatRupiah(order.totalHarga)}</p>
                </div>
                <div class="line">
                    <p>Pajak</p>
                    <p>${formatRupiah(order.tax)}</p>
                </div>
                <div class="line">
                    <p>Total</p>
                    <p>${formatRupiah(order.totalHarga + order.tax)}</p>
                </div>
            </div>
            <div class="dashed-line"></div>
            <div class="footer">
                <p>Terima Kasih Telah Berbelanja</p>
            </div>
        `);
        });

        receiptWindow.document.write("</body></html>");
        receiptWindow.document.close();
        receiptWindow.print();
    };

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = ordersData.slice(indexOfFirstPost, indexOfLastPost);
    const [openModalPaymentCashless, setOpenModalCashless] = useState(true);
    const [openModalDetailPayment, setOpenModalDetailPayment] = useState(true);
    useEffect(() => {
        const subTotal = modalData.reduce(
            (init, current) => init + current.totalHarga,
            0
        );
        setBill({
            subTotal: subTotal,
            tax: subTotal * (parseFloat(taxs?.tax || 0) / 100),
            total: subTotal + subTotal * (parseFloat(taxs?.tax || 0) / 100),
        });
    }, [modalData]);

    useEffect(() => {
        if (tax) {
            setTaxs(...tax);
            console.log(taxs);
        }
    });

    const [orderStatus, setOrderStatus] = useState({});

    useEffect(() => {
        // Inisialisasi status pesanan saat komponen dimuat
        const initialOrderStatus = {};
        orders.forEach((order) => {
            initialOrderStatus[order.id] = order.status;
        });
        setOrderStatus(initialOrderStatus);
    }, [orders]);

    const updateOrderStatus = (orderId, newStatus) => {
        setOrderStatus((prevStatus) => ({
            ...prevStatus,
            [orderId]: newStatus,
        }));
    };

    const searchHandler = (value) => {
        setSearchInput(value);
        console.log(searchInput);
        console.log(orders);
        if (value.trim() === "") {
            console.log("in kosong");
            setSearchOutput([]);
            return;
        }
        const trimmedValue = value.replace(/\s+/g, "").toLowerCase();
        const searchResult = orderbelumdibayar.filter((orders) => {
            const trimmedordersName = orders.customer_name
                .replace(/\s+/g, "")
                .toLowerCase(); // Menghapus semua spasi dari nama orders dan ubah ke huruf kecil
            return trimmedordersName.includes(trimmedValue);
        });
        setSearchOutput(searchResult);
    };

    const modalSearchHandler = (value) => {
        setSearchModal(value);

        if (value.trim() === "") {
            console.log("in kosong");
            setSearchOutputModal([]);
            return;
        }
        const trimmedValue = value.replace(/\s+/g, "").toLowerCase();
        const searchResult = menus.filter((menu) => {
            const trimmedordersName = menu.nama
                .replace(/\s+/g, "")
                .toLowerCase(); // Menghapus semua spasi dari nama orders dan ubah ke huruf kecil
            return trimmedordersName.includes(trimmedValue);
        });
        setSearchOutputModal(searchResult);
    };

    useEffect(() => {
        console.log(searchOutputModal);
    }, [searchOutputModal]);
    // modal function
    const handlePayment = () => {
        // Temukan order yang akan dibayar
        const orderToPay = ordersData.find((order) => order.id === tes);
        printReceipt();
        // Kirim data terbaru ke backend
        Inertia.post(`/kasir/${tes}`, {
            data: orderToPay.data,
        })
            .then(() => {
                console.log("Order marked as paid successfully.");
                Inertia.reload();
            })
            .catch((error) => {
                console.error("Failed to mark order as paid:", error);
            });
    };

    const handlePaymentCashlessExecution = () => {
        // Temukan order yang akan dibayar
        const orderToPay = ordersData.find((order) => order.id === tes);
        printReceipt();
        // Kirim data terbaru ke backend
        Inertia.patch(`/kasirordercashless/${tes}`, {
            data: orderToPay.data,
            payment: paymentMethod[0].paymentMethod,
        })
            .then(() => {
                console.log("Order marked as paid successfully.");
                Inertia.reload();
            })
            .catch((error) => {
                console.error("Failed to mark order as paid:", error);
            });
    };

    const addMenuHandler = (idMenu) => {
        const selectedMenu = menus.find((menu) => menu.id == idMenu);
        const isAlreadySelected = editModalData.find(
            (item) => item.id === idMenu
        );
        if (isAlreadySelected) {
            console.log("udah da berok");
            return;
        }
        const reformatSelectedMenu = {
            id: selectedMenu.id,
            name: selectedMenu.nama,
            harga: selectedMenu.harga,
            totalHarga: selectedMenu.harga,
            items: 1,
        };
        setEditModalData([...editModalData, reformatSelectedMenu]);
        console.log(editModalData);
        console.log(selectedMenu);
    };

    const saveNewMenuHandler = () => {
        const newOrders = ordersData.map((order) => {
            if (order.id == idNow) {
                return { ...order, data: editModalData, tax: taxs };
            } else {
                return order;
            }
        });
        setOrdersData(newOrders);
        setOpenModalEdit(!openModalEdit);
        setModalData(newOrders);
        setEditModalData([]);
    };

    const closeHandler = () => {
        setOpenModalEdit(!openModalEdit);
        setEditModalData([]);
    };

    const handlePaymentCashless = () => {
        setOpenModalPayment(!openModalPayment);
        setOpenModalCashless(!openModalPaymentCashless);
    };

    const modalDetailPaymentHandler = () => {
        setOpenModalCashless(!openModalPaymentCashless);
        setOpenModalDetailPayment(!openModalDetailPayment);
    };

    return (
        <BodyLayout className={"pt-[40px] px-[40px]"}>
            <Head title="Order" />
            <LogoDate />
            <div className="flex justify-between mt-[25px]">
                <div className="h-[50px] w-fit relative ">
                    <TextInput
                        placeholder={"Cari Pelanggan!"}
                        className="w-[366px] h-[50px] pl-[40px]"
                        value={searchInput}
                        onChange={(e) => {
                            searchHandler(e.target.value);
                        }}
                    />
                    <SearchSvg />
                </div>
                <div className="h-[50px] w-fit flex gap-x-4">
                    <div
                        onClick={decrementHandler}
                        className="h-[50px] w-[50px] bg-white border-2 rounded-xl flex justify-center items-center cursor-pointer"
                    >
                        {"<"}
                    </div>
                    <div className="h-[50px] w-[50px] bg-white border-2 rounded-xl flex justify-center items-center">
                        {currentPage}
                    </div>
                    <div
                        onClick={incrementHandler}
                        className="h-[50px] w-[50px] bg-white border-2 rounded-xl flex justify-center items-center cursor-pointer"
                    >
                        {">"}
                    </div>
                </div>
            </div>
            <table className="w-full mt-[24px] mb-[24px] overflow-hidden rounded-xl">
                <tr className="rounded-2xl bg-[#F3F3F3] h-[60px]">
                    <th className="flex-1 opacity-60">Nama Pembeli</th>
                    <th className="flex-1 opacity-60">Waktu</th>
                    <th className="flex-2 opacity-60">Status</th>
                    <th className="w-[230px]"></th>
                </tr>
                {searchOutput.length == 0 ? (
                    currentPosts.length == 0 ? (
                        <tr className="">
                            <td className="">tidak ada data</td>
                        </tr>
                    ) : (
                        currentPosts.map((orders) => {
                            return (
                                <tr className="h-fit border-bottom border">
                                    <TableData text={orders.customer_name} />
                                    <TableData text={orders.order_time} />
                                    <TableData text={orders.status} />
                                    <div className="flex ">
                                        <div
                                            className="h-[60px] w-[100%] flex items-center justify-center"
                                            onClick={() => {
                                                editHandler(orders.id);
                                            }}
                                        >
                                            <button className="w-[100px] py-[7px] bg-[#E8E8E8] rounded-lg border-gray-400 border">
                                                <span className="mr-[2px]">
                                                    I
                                                </span>
                                                <span className="opacity-60">
                                                    Edit
                                                </span>
                                            </button>
                                        </div>
                                        <div className="h-[60px] w-[100%] flex items-center justify-center">
                                            <button className="w-[100px] py-[7px] bg-[#7D5E42] rounded-lg border-gray-400 border text-white" onClick={() => {
                                                        paymentHandler(
                                                            orders.id
                                                        );
                                                    }}>
                                                <span className="mr-[2px]">
                                                    I
                                                </span>
                                                <span
                                                    className=""
                                                    
                                                >
                                                    Bayar
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </tr>
                            );
                        })
                    )
                ) : (
                    searchOutput.map((orders) => {
                        return (
                            <tr className="h-fit border-bottom border">
                                <TableData text={orders.customer_name} />
                                <TableData text={orders.order_time} />
                                <TableData text={orders.status} />
                                <div className="flex ">
                                    <div
                                        className="h-[60px] w-[100%] flex items-center justify-center"
                                        onClick={() => {
                                            editHandler(orders.id);
                                        }}
                                    >
                                        <button className="w-[100px] py-[7px] bg-[#E8E8E8] rounded-lg border-gray-400 border">
                                            <span className="mr-[2px]">I</span>
                                            <span className="opacity-60">
                                                Edit
                                            </span>
                                        </button>
                                    </div>
                                    <div className="h-[60px] w-[100%] flex items-center justify-center">
                                        <button className="w-[100px] py-[7px] bg-[#7D5E42] rounded-lg border-gray-400 border text-white">
                                            <span className="mr-[2px]">I</span>
                                            <span
                                                className=""
                                                onClick={() => {
                                                    paymentHandler(orders.id);
                                                }}
                                            >
                                                Bayar
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </tr>
                        );
                    })
                )}
            </table>

            {/* Modal payment */}
            <div
                className={`h-fit w-[75%] flex flex-col px-[25px] pb-[20px] items-center transition-all duration-1000  bg-white rounded-xl border shadow-lg absolute left-1/2 right-1/2 -translate-x-1/2 ${
                    openModalPayment
                        ? "-translate-y-[1000px]"
                        : "translate-y-10 fixed"
                }`}
            >
                <p className="font-bold  mt-[30px] text-2xl">Bayar Pesanan</p>
                <p>Langsung bayar pesanan punya {modalName}</p>

                <p
                    className="text-xl absolute top-10 right-10 cursor-pointer"
                    onClick={() => setOpenModalPayment(!openModalPayment)}
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
                            {modalData.map((orderitems, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="h-fit border-bottom-1"
                                    >
                                        <TableData text={orderitems.name} />
                                        <TableData text={orderitems.items} />
                                        <TableData
                                            text={formatRupiah(
                                                orderitems.totalHarga
                                            )}
                                        />
                                    </tr>
                                );
                            })}
                        </table>
                    </div>

                    <div className="w-[330px] h-fit border rounded-xl bg-white flex flex-col justify-center py-[20px] px-[25px]">
                        {modalData.length == 0 ? (
                            <p>TIdak ada data</p>
                        ) : (
                            <>
                                <div className="w-full flex justify-between">
                                    <p className="opacity-30 font-bold">
                                        Sub Total
                                    </p>
                                    <p className="font-bold">
                                        {formatRupiah(bill.subTotal)}
                                    </p>
                                </div>
                                <div className="w-full flex justify-between">
                                    <p className="opacity-30 font-bold">{`Pajak (${
                                        taxs?.tax || 0
                                    }%)`}</p>
                                    <p className="font-bold">
                                        {formatRupiah(bill.tax)}
                                    </p>
                                </div>
                                <DashedLine />
                                <div className="w-full flex justify-between mt-[20px]">
                                    <p className="opacity-30 font-bold">
                                        Total
                                    </p>
                                    <p className="font-bold">
                                        {formatRupiah(bill.total)}
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
                                    <p className="opacity-30 font-bold">
                                        Kembalian
                                    </p>
                                    <p className="font-bold">
                                        {formatRupiah(change) || 0}
                                    </p>
                                </div>
                            </>
                        )}

                        <button
                            className="w-full rounded-[18px] py-[15px] font-bold bg-white text-[#7D5E42] border-2 border-[#7D5E42]"
                            onClick={() => handlePaymentCashless()}
                        >
                            Bayar Cashless
                        </button>
                        <button
                            className="w-full rounded-[18px] py-[15px] font-bold text-white bg-[#7D5E42] mt-3"
                            onClick={() => handlePayment()}
                        >
                            Bayar Cash
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal edit */}

            <div
                className={`h-fit w-[75%] flex flex-col px-[25px] pb-[20px] items-center transition-all duration-1000 overflow-y-hidden  bg-white rounded-xl border shadow-lg absolute left-1/2 right-1/2 -translate-x-1/2 ${
                    openModalEdit
                        ? "-translate-y-[1000px]"
                        : "translate-y-10 fixed"
                }`}
            >
                <p className="font-bold  mt-[30px] text-2xl">Edit Pesanan</p>
                <p>Edit pesanan punya {modalName}</p>
                <p
                    className="text-xl absolute top-10 right-10 cursor-pointer"
                    onClick={closeHandler}
                >
                    X
                </p>

                <div className="flex w-full h-fit gap-x-[30px] mt-[25px]">
                    <div className="flex-1">
                        <div className=" w-full h-[50px] relative">
                            <input
                                type="text"
                                className="w-full h-[50px] pl-[40px] rounded-xl"
                                placeholder="Cari Menu"
                                value={searchModal}
                                onChange={(e) => {
                                    modalSearchHandler(e.target.value);
                                }}
                            />
                            <SearchSvg />
                        </div>
                        {/* modal edit content */}
                        <div className="w-full h-[400px] justify-evenly flex gap-x-[10px] gap-y-[10px] flex-wrap overflow-scroll pt-[10px]">
                            {searchOutputModal.length == 0
                                ? menus.map((menu) => (
                                      <div className="bg-white w-[230px] border shadow-lg  h-fit rounded-lg px-[15px] py-[15px]">
                                          <div className="w-full h-[150px] rounded-lg bg-gray-400"></div>
                                          <div className="h-fit w-full flex flex-col justify-between mt-2">
                                              <p className="font-bold text-[22px]">
                                                  {menu.nama}
                                              </p>
                                              <p className="font-bold opacity-60 text-[20px]">
                                                  {formatRupiah(menu.harga)}
                                              </p>
                                          </div>
                                          <button
                                              className="mt-[20px] w-full rounded-[18px] py-[15px] font-bold border-2 bg-[#F3F3F3]"
                                              onClick={() => {
                                                  addMenuHandler(menu.id);
                                              }}
                                          >
                                              Tambah
                                          </button>
                                      </div>
                                  ))
                                : searchOutputModal.map((menu) => (
                                      <div className="bg-white w-[230px] border shadow-lg  h-fit rounded-lg px-[15px] py-[15px]">
                                          <div className="w-full h-[150px] rounded-lg bg-gray-400"></div>
                                          <div className="h-fit w-full flex flex-col justify-between mt-2">
                                              <p className="font-bold text-[22px]">
                                                  {menu.nama}
                                              </p>
                                              <p className="font-bold opacity-60 text-[20px]">
                                                  {formatRupiah(menu.harga)}
                                              </p>
                                          </div>
                                          <button
                                              className="mt-[20px] w-full rounded-[18px] py-[15px] font-bold border-2 bg-[#F3F3F3]"
                                              onClick={() => {
                                                  addMenuHandler(menu.id);
                                              }}
                                          >
                                              Tambah
                                          </button>
                                      </div>
                                  ))}
                        </div>
                    </div>
                    {/* modal history */}
                    <div className="w-[330px] border px-[15px] py-[15px] flex flex-col ">
                        <div className="w-full h-[350px] overflow-scroll flex flex-col gap-y-[10px]">
                            {editModalData.map((menu) => (
                                <ModalHistoryCard
                                    key={menu.id}
                                    ordersData={ordersData}
                                    setEditModalData={setEditModalData}
                                    editModalData={editModalData}
                                    name={menu.name}
                                    item={menu.items}
                                    initialPrice={menu.harga}
                                    menu={menu}
                                    id={menu.id}
                                />
                            ))}
                        </div>
                        <button
                            className="mt-[20px] w-full rounded-[18px] py-[15px] font-bold text-white bg-[#7D5E42]"
                            onClick={saveNewMenuHandler}
                        >
                            Simpan
                        </button>
                    </div>
                </div>
            </div>
            {/* modalCashless */}
            <div
                className={`absolute w-full h-full flex transition-all duration-1000 ${
                    openModalPaymentCashless
                        ? "-translate-y-[1000px]"
                        : "translate-y-10 fixed"
                }`}
            >
                <div className="bg-white h-fill w-fill mx-auto my-auto flex rounded-xl border-2 border-slate-200 px-5 py-5">
                    <div className="w-full h-full">
                        <div className="text-center flex-row mx-[250px]">
                            <p className="font-black text-2xl">
                                Pilih metode pembayaran
                            </p>
                            <p className="text-xl">
                                Apa yang bakal dia gunain buat bayar pesanan
                            </p>
                        </div>
                        <div className="mt-10">
                            <div>
                                <RadioGroup
                                    paymenthMethod={paymentMethod}
                                    setPaymentMethod={setPaymentMethod}
                                />
                            </div>
                        </div>
                        <div className="w-full h-fill flex justify-center">
                            <button
                                className="bg-[#7d5e42] py-3 rounded-xl px-10 text-white font-bold hover:bg-[#493727]"
                                onClick={modalDetailPaymentHandler}
                            >
                                Lanjut
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={`absolute w-full h-full flex ${
                    openModalDetailPayment
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
                        <p className="text-center font-black text-3xl">
                            {paymentMethod[0].paymentMethod}
                        </p>
                    </div>
                    <div className="w-full justify-center flex">
                        <button
                            className="bg-[#7d5e42] rounded-md py-3 px-[100px] text-white font-bold"
                            onClick={handlePaymentCashlessExecution}
                        >
                            Print & Bayar
                        </button>
                    </div>
                    <button
                        className="absolute top-0 right-3 font-black text-red-500 text-3xl"
                        onClick={() => {
                            setOpenModalDetailPayment(!openModalDetailPayment);
                        }}
                    >
                        X
                    </button>
                </div>
            </div>
        </BodyLayout>
    );
}

export default Order;
