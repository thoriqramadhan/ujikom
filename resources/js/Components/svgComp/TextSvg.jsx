import React, { useState , useEffect } from 'react'

function TextSvg({name , clickedAt}) {
  return (
    <p className={`mt-[2px] text-[15px] text-[${name === clickedAt ? '#552F0E' : 'black'}]`} opacity-60>{name}</p>
  )
}

export default TextSvg