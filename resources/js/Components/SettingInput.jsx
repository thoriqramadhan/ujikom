import React, { useEffect, useState } from 'react'
import TextInput from './TextInput'


function SettingInput({header, initialValues , placeholder, className , user, setUser , selection}) {
    const [values , setValues] = useState(initialValues || '')

    function changeUserHandle(){
        if(values == ''){
            setValues(initialValues)
            return
        }
        setUser({
            ...user,
            [selection] : values
        })
    }
  return (
    <div className={`${className}`}>
        <p>{header}</p>
        <div className="w-full h-fit bg-sky-100  mt-[10px] relative">
            <TextInput values={values} setValues={setValues} placeholder={placeholder} className='w-full'/>
            <div className="w-[100px] h-[40px] absolute right-0 top-0 opacity-60 flex items-center justify-center font-bold cursor-pointer" onClick={changeUserHandle}>Ubah</div>
        </div>
    </div>
  )
}

export default SettingInput