import React from 'react';
import BodyLayout from '@/Layouts/BodyLayout';
import LogoDate from '../Logo_date';
import Chart from './Chart';
import { formatRupiah } from '@/module/rupiah-formater';

const dailySell = [
  { name: 'Fachry', value: 11 },
  { name: 'Fachry', value: 11 },
  { name: 'Fachry', value: 11 },
  { name: 'Fachry', value: 11 },
];

const barData = [
  { label: 'Senin', value: 50 },
  { label: 'Selasa', value: 50 },
  { label: 'Rabu', value: 50 },
  { label: 'Kamis', value: 50 },
  { label: 'Jumat', value: 50 },
  { label: 'Sabtu', value: 50 },
  { label: 'Minggu', value: 50 },
];

function Home({ onlykasir, uangHarian, uangBulanan, uangTahunan, menuSales = {}, dailyIncome }) {
  // Convert menuSales object to an array
  const menuSalesArray = Object.entries(menuSales).map(([menuName, quantity]) => ({
    menuName,
    quantity,
  })).sort((a, b) => b.quantity - a.quantity);
  console.log("menuSales:",menuSalesArray)

  return (
    <BodyLayout>
      <div className="w-full h-[100vh] sm:px-[20px] lg:px-[35px] lg:flex lg:gap-x-[30px]">
        <div className="w-full h-fit pt-[50px] lg:grow lg:basis-1/2">
          <LogoDate />
          {/* header */}
          <div className="w-full h-fit mt-[35px] flex flex-col gap-y-[15px] lg:flex-row lg:gap-x-[20px]">
            <div className="h-[85px] w-full bg-[#F1F1F1] border-2 rounded-3xl cursor-pointer flex items-center px-[17px] lg:px-[10px] lg:justify-center">
              <div className="h-[58px] w-[58px] bg-gray-200 rounded-full font-bold flex items-center justify-center text-2xl">
                <p>Rp.</p>
              </div>
              <div className="ml-2">
                <p className="font-bold text-[18px]">{formatRupiah(uangHarian)}</p>
                <p className="opacity-50">Pendapatan Hari Ini!</p>
              </div>
            </div>
            <div className="h-[85px] w-full bg-[#F1F1F1] border-2 rounded-3xl cursor-pointer flex items-center px-[17px] lg:px-[10px] lg:justify-center">
              <div className="h-[58px] w-[58px] bg-gray-200 rounded-full font-bold flex items-center justify-center text-2xl">
                <p>Rp.</p>
              </div>
              <div className="ml-2">
                <p className="font-bold text-[18px]">{formatRupiah(uangBulanan)}</p>
                <p className="opacity-50">Pendapatan Bulan Ini!</p>
              </div>
            </div>
            <div className="h-[85px] w-full bg-[#F1F1F1] border-2 rounded-3xl cursor-pointer flex items-center px-[17px] lg:px-[10px] lg:justify-center">
              <div className="h-[58px] w-[58px] bg-gray-200 rounded-full font-bold flex items-center justify-center text-2xl">
                <p>Rp.</p>
              </div>
              <div className="ml-2">
                <p className="font-bold text-[18px]">{formatRupiah(uangTahunan)}</p>
                <p className="opacity-50">Pendapatan Tahun Ini!</p>
              </div>
            </div>
          </div>
          {/* Pendapatan harian */}
          <Chart dailyIncome={dailyIncome}/>
        </div>

        <div className="w-full h-fit flex flex-col gap-y-[15px] mt-[15px] pb-[80px] lg:basis-1/3 lg:mt-[145px]">
          <div className="w-full h-[260px] rounded-[25px] bg-white border px-[18px] pt-[28px]">
            <p className="text-xl font-bold">Pantau Kasir Kamu 📹</p>
            <p className="opacity-50">Apa karyawanmu aktif?</p>
            <div className="mt-[15px] h-[135px] overflow-scroll">
              {onlykasir && onlykasir.length > 0 ? (
                onlykasir
                  // Urutkan daftar kasir berdasarkan status online
                  .sort((a, b) => (a['user-is-online'] === b['user-is-online'] ? 0 : a['user-is-online'] ? -1 : 1))
                  .map((kasir, index) => (
                    <div
                      key={index}
                      className={`${
                        index % 2 === 0 ? 'bg-gray-200' : 'bg-white'
                      } flex gap-x-[8px] justify-between items-center font-bold h-[45px] bg-gray-200 w-full px-[20px] rounded-[5px]`}
                    >
                      <p>
                        {kasir.first_name} {kasir.last_name}
                      </p>
                      <ul className="list-disc sm:list-none md:list-none lg:list-disc">
                        <li className={kasir['user-is-online'] ? 'text-green-500' : 'text-red-500'}>
                          {kasir['user-is-online'] ? 'Online' : 'Tidak Aktif'}
                        </li>
                      </ul>
                    </div>
                  ))
              ) : (
                <div>
                  <p>Tidak ada data kasir.</p>
                  {/* Sisipkan logika lain di sini sesuai kebutuhan */}
                </div>
              )}
            </div>
          </div>

          <div className="w-full h-[260px] rounded-[25px] bg-white border px-[18px] pt-[28px]">
            <p className="text-xl font-bold">Penjualan Hari ini</p>
            <p className="opacity-50">Lihat apa saja yang terjual</p>
            <div className="mt-[15px] h-[135px] overflow-scroll">
              {menuSalesArray.map((menu, index) => (
                <div
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-200' : 'bg-white'
                  } flex gap-x-[8px] justify-between items-center font-bold h-[45px] w-full px-[20px] rounded-[5px]`}
                >
                  <p>{menu.menuName}</p>
                  <p>{menu.quantity} pcs</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-[1px] border-[#e5e7eb] px-[40px] mx-[36px] py-[30px] rounded-xl mb-5">
                <div className="flex w-full justify-between">
                    <div>
                        <p className="font-bold text-2xl">Pendapatan Bulanan</p>
                        <p>Lihat pendapatan bulanan kamu disini</p>
                    </div>
                    <div>
                        <select
                            name=""
                            id=""
                            className="hidden h-fit py-[12px] border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm mr-5 md:block"
                        >
                            <option value="Menu">2024</option>
                            <option value="Kategori">2025</option>
                        </select>
                    </div>
                </div>
                <div className="w-full bg-white h-fill mt-5 flex ">
                    <div className="w-full basis-1/2 mr-2">
                        <div className="w-full flex justify-between bg-[#e5e7eb] px-3 py-1 rounded-md">
                            <p>Januari</p>
                            <p>Rp.10.000.000</p>
                        </div>
                        <div className="w-full flex justify-between px-3 py-1 rounded-md">
                            <p>Februari</p>
                            <p>Rp.10.000.000</p>
                        </div>
                        <div className="w-full flex justify-between bg-[#e5e7eb] px-3 py-1 rounded-md">
                            <p>Maret</p>
                            <p>Rp.10.000.000</p>
                        </div>
                        <div className="w-full flex justify-between px-3 py-1 rounded-md">
                            <p>April</p>
                            <p>Rp.10.000.000</p>
                        </div>
                        <div className="w-full flex justify-between bg-[#e5e7eb] px-3 py-1 rounded-md">
                            <p>Mei</p>
                            <p>Rp.10.000.000</p>
                        </div>
                        <div className="w-full flex justify-between px-3 py-1 rounded-md">
                            <p>Juni</p>
                            <p>Rp.10.000.000</p>
                        </div>
                    </div>
                    <div className="w-full basis-1/2 ml-2">
                        <div className="w-full flex justify-between bg-[#e5e7eb] px-3 py-1 rounded-md">
                            <p>Juli</p>
                            <p>Rp.10.000.000</p>
                        </div>
                        <div className="w-full flex justify-between px-3 py-1 rounded-md">
                            <p>Agustus</p>
                            <p>Rp.10.000.000</p>
                        </div>
                        <div className="w-full flex justify-between bg-[#e5e7eb] px-3 py-1 rounded-md">
                            <p>September</p>
                            <p>Rp.10.000.000</p>
                        </div>
                        <div className="w-full flex justify-between px-3 py-1 rounded-md">
                            <p>Oktober</p>
                            <p>Rp.10.000.000</p>
                        </div>
                        <div className="w-full flex justify-between bg-[#e5e7eb] px-3 py-1 rounded-md">
                            <p>November</p>
                            <p>Rp.10.000.000</p>
                        </div>
                        <div className="w-full flex justify-between px-3 py-1 rounded-md">
                            <p>Desember</p>
                            <p>Rp.10.000.000</p>
                        </div>
                    </div>
                </div>
            </div>
    </BodyLayout>
  );
}

export default Home;
