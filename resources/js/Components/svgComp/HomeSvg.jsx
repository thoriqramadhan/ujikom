import React from 'react'
import TextSvg from './TextSvg'

function HomeSvg({screenWidth, clickedAt,setClickedAt}) {
    const name = 'Home'
    function clickHandler(){
        setClickedAt(name)
    }
  return (
    <div className="flex flex-col">

    <svg className='cursor-pointer transtion-all duration-200' onClick={clickHandler} opacity={clickedAt === name ? '1' : '0.6'} width="38" height="38" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8.50024" y="8.49997" width="12.75" height="14.875" rx="2.125" stroke={clickedAt === name ? '#552F0E' : 'black'} stroke-width="4.25" stroke-linejoin="round"/>
        <rect x="8.50024" y="31.8749" width="12.75" height="10.625" rx="2.125" stroke={clickedAt === name ? '#552F0E' : 'black'} stroke-width="4.25" stroke-linejoin="round"/>
        <rect x="29.7498" y="8.49997" width="12.75" height="10.625" rx="2.125" stroke={clickedAt === name ? '#552F0E' : 'black'} stroke-width="4.25" stroke-linejoin="round"/>
        <rect x="29.7498" y="27.625" width="12.75" height="14.875" rx="2.125" stroke={clickedAt === name ? '#552F0E' : 'black'} stroke-width="4.25" stroke-linejoin="round"/>
    </svg>
    {screenWidth <= 750 ? '' : <TextSvg name={name}/>}
    </div>

  )
}

export default HomeSvg