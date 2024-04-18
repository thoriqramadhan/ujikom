import TextSvg from './TextSvg'

function KasirSvg({screenWidth,clickedAt,setClickedAt}) {
    const name = 'Kasir'
    function clickHandler(){
        setClickedAt(name)
    }
  return (
    <div className='flex flex-col'>
    <svg className='cursor-pointer transtion-all duration-200' onClick={clickHandler} opacity={clickedAt === name ? '1' : '0.6'}  width="38" height="38" viewBox="0 0 51 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.5 17.5C8.5 15.4364 8.50451 14.1026 8.63665 13.1197C8.76057 12.198 8.96063 11.9091 9.1224 11.7474C9.28416 11.5856 9.57305 11.3856 10.4947 11.2616C11.4776 11.1295 12.8115 11.125 14.875 11.125H36.125C38.1885 11.125 39.5224 11.1295 40.5053 11.2616C41.4269 11.3856 41.7158 11.5856 41.8776 11.7474C42.0394 11.9091 42.2394 12.198 42.3633 13.1197C42.4955 14.1026 42.5 15.4364 42.5 17.5V34.5H8.5V17.5Z" stroke={clickedAt === name ? '#552F0E' : 'black'} stroke-width="4.25"/>
        <path d="M7.79167 34.5C5.83566 34.5 4.25 36.0857 4.25 38.0417C4.25 40.7801 6.46992 43 9.20833 43H41.7917C44.5301 43 46.75 40.7801 46.75 38.0417C46.75 36.0857 45.1643 34.5 43.2083 34.5H7.79167Z" stroke={clickedAt === name ? '#552F0E' : 'black'} stroke-width="4.25"/>
    </svg>
    {screenWidth <= 750 ? '' : <TextSvg name={name}/>}
    </div>

  )
}

export default KasirSvg