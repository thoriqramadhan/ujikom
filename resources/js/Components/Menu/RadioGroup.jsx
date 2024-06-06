import React, { useState } from 'react'

function RadioGroup({setPaymentMethod}) {
    const [selected , setSelected] = useState('qris')
    const handleChange = (e) => {
        setSelected(e.target.id)
        setPaymentMethod([{
            paymentMethod : selected
        }])
    }
  return (
    <>
        <div className=" group hover:bg-slate-200 focus:bg-slate-200 w-full border-[#d9d9d9] border-2 h-fill mb-5 rounded-xl flex justify-between px-10 py-4 peer-checked/draft:bg-sky-500">
                            <div className="flex justify-between">
                                <img
                                    src="/img/brimo.png"
                                    alt="Qris"
                                    className="h-[50px] w-[50px] mr-5 rounded-full bg-white"
                                />

                                <p className="font-bold text-[30px] my-auto">
                                    BriMo
                                </p>
                            </div>
                            <input
                                id="qris"
                                type="radio"
                                name="status"
                                className="my-auto "
                                onChange={handleChange}
                                checked={selected == 'qris'}
                            />
        </div>

        <div className=" group hover:bg-[slate-200] focus:bg-slate-200 w-full border-[#d9d9d9] border-2 h-fill mb-5 rounded-xl flex justify-between px-10 py-4">
                            <div className="flex justify-between">
                                <img
                                    src="/img/qris.png"
                                    alt="Qris"
                                    className="h-[50px] w-[50px] mr-5 rounded-full bg-white border-2"
                                />
                                <p className="font-bold text-[30px] my-auto">
                                    Qris
                                </p>
                            </div>
                            <input
                                id="brimo"
                                type="radio"
                                name="status"
                                className="my-auto"
                                onChange={handleChange}
                                checked={selected == 'brimo'}
                            />
        </div>
    </>
  )
}

export default RadioGroup