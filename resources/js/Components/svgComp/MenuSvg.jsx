import React, { useState , useEffect } from 'react'
import TextSvg from './TextSvg'

function MenuSvg({screenWidth,clickedAt , setClickedAt}) {
  const name = 'Menu'

  function clickHandler(){
    setClickedAt(name)
  }
  
    return (
      <div className='flex flex-col' onClick={clickHandler}>
        <svg className='cursor-pointer transtion-all duration-200' opacity={clickedAt === name ? '1' : '0.6'} width="38" height="38" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M26.3431 6H18C14.2288 6 12.3431 6 11.1716 7.17157C10 8.34315 10 10.2288 10 14V34C10 37.7712 10 39.6569 11.1716 40.8284C12.3431 42 14.2288 42 18 42H30C33.7712 42 35.6569 42 36.8284 40.8284C38 39.6569 38 37.7712 38 34V17.6569C38 16.8394 38 16.4306 37.8478 16.0631C37.6955 15.6955 37.4065 15.4065 36.8284 14.8284L29.1716 7.17157C28.5935 6.59351 28.3045 6.30448 27.9369 6.15224C27.5694 6 27.1606 6 26.3431 6Z" stroke={clickedAt === name ? '#552F0E' : 'black'} stroke-width="4"/>
        <path d="M18 26L30 26" stroke={clickedAt === name ? '#552F0E' : 'black'} stroke-width="4" stroke-linecap="round"/>
        <path d="M18 34L26 34" stroke={clickedAt === name ? '#552F0E' : 'black'} stroke-width="4" stroke-linecap="round"/>
        <path d="M26 6V14C26 15.8856 26 16.8284 26.5858 17.4142C27.1716 18 28.1144 18 30 18H38" stroke={clickedAt === name ? '#552F0E' : 'black'} stroke-width="4"/>
        </svg>
        {screenWidth <= 750 ? '' : <TextSvg name={name}/>}
      </div>
  )
}

export default MenuSvg