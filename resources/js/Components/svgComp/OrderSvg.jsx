import React from 'react'
import TextSvg from './TextSvg'

function OrderSvg({clickedAt , setClickedAt}) {
    const name = 'Order'
    function clickHandler(){
        setClickedAt(name)
      }
  return (
    <div className='flex flex-col justify-center items-center' onClick={clickHandler}>
        <svg className='cursor-pointer transtion-all duration-200' opacity={clickedAt === name ? '1' : '0.6'} width="38" height="38" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 26L30 26" stroke={clickedAt === name ? '#552F0E' : 'black'} stroke-width="4" stroke-linecap="round"/>
    <path d="M18 18L26 18" stroke={clickedAt === name ? '#552F0E' : 'black'} stroke-width="4" stroke-linecap="round"/>
    <path d="M18 34L26 34" stroke={clickedAt === name ? '#552F0E' : 'black'} stroke-width="4" stroke-linecap="round"/>
    <path d="M38 17V30C38 35.6569 38 38.4853 36.2426 40.2426C34.4853 42 31.6569 42 26 42H22C16.3431 42 13.5147 42 11.7574 40.2426C10 38.4853 10 35.6569 10 30V18C10 12.3431 10 9.51472 11.7574 7.75736C13.5147 6 16.3431 6 22 6H29" stroke={clickedAt === name ? '#552F0E' : 'black'} stroke-width="4"/>
    <circle cx="36.5" cy="8.5" r="4.5" fill={clickedAt === name ? '#552F0E' : 'black'}/>
    </svg>
    <TextSvg name={name} clickedAt={clickedAt}/>
    </div>
  )
}

export default OrderSvg