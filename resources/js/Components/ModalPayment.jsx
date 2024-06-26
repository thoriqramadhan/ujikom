import React from 'react'

function ModalPayment({dataObject, openModal ,  }) {
  return (
    <div className={`h-fit w-[75%] flex flex-col px-[25px] pb-[20px] items-center transition-all duration-1000  bg-white rounded-xl border shadow-lg absolute left-1/2 right-1/2 -translate-x-1/2 ${openModal ? '-translate-y-[1000px]' : 'translate-y-10 fixed'}`}>
        <p className='font-bold  mt-[30px] text-2xl'>Bayar Pesanan</p>
        <p>Langsung bayar pesanan punya {modalData.name}</p>
        <p className='text-xl absolute top-10 right-10' onClick={()=>{}}>X</p>
        <div className="w-full h-fit mt-[10px] flex gap-x-[30px]">
          <div className="basis-2 flex-1 bg-white rounded-xl border ">
            <table className='w-full h-fit rounded-xl overflow-hidden bg-white'>
              <tr className='rounded-2xl bg-[#F3F3F3] h-[60px]'>
                <th className='flex-1 opacity-60'>Nama Makanan</th>
                <th className='flex-1 opacity-60'>Jumlah</th>
                <th className='flex-1 opacity-60'>Harga</th>
              </tr>
              {
                modalData.menu.length == 0 ? <p className=''>Tidak ada data</p> : modalData.menu.map((orders , index) => (
                  <tr key={index} className='h-fit border-bottom-1'>
                    <TableData text={orders.name}/>
                    <TableData text={orders.items}/>
                    <TableData text={orders.total} prop='K'/>
                  </tr>
                ))
              }
              </table>
          </div>

          <div className="w-[330px] h-fit border rounded-xl bg-white flex flex-col justify-center py-[20px] px-[25px]">
          <div className="w-full flex justify-between">
            <p className='opacity-30 font-bold'>Sub Total</p>
            <p className='font-bold'>{modalData.subTotal}K</p>
          </div>
          <div className="w-full flex justify-between">
            <p className='opacity-30 font-bold'>{'Pajak (10%)'}</p>
            <p className='font-bold'>{modalData.tax}K</p>
          </div>
          <DashedLine />
          <div className="w-full flex justify-between mt-[20px]">
            <p className='opacity-30 font-bold'>Total</p>
            <p className='font-bold'>{modalData.total}K</p>
          </div>
          <input type="number" name="" id="" className='mt-[20px]'  onChange={clientHandler} value={buyersMoney} placeholder='Uang Pembeli' />
          <div className="w-full flex justify-between mt-[20px] mb-[120px]">
            <p className='opacity-30 font-bold'>Kembalian</p>
            <p className='font-bold'>{total.toFixed(2) || 0}K</p>
          </div>
          <button className='w-full rounded-[18px] py-[15px] font-bold text-white bg-[#7D5E42]'>Bayar</button>
        </div>
        </div>
      </div>
  )
}

export default ModalPayment