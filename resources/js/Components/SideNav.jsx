import React from 'react'

function SideNav() {
  return (
    <div className="h-[100vh] w-16 bg-red-100 fixed top-0 left-0 z-10 flex flex-col" id='sidenav'>
        <div className="h-[70%] bg-red-100 flex flex-col items-center gap-y-8 mt-[15px]">
          <img src="./resources/assets/Vector.svg" alt="" />
          <div className="w-[35px] h-[35px] bg-black rounded-full"></div>
          <div className="w-[35px] h-[35px] bg-black rounded-full"></div>
          <div className="w-[35px] h-[35px] bg-black rounded-full"></div>
          <div className="w-[35px] h-[35px] bg-black rounded-full"></div>

        </div>
        <div className="h-[30%] bg-sky-100 flex justify-center items-end pb-[20px]">
          <div className="w-[50px] h-[50px] bg-black rounded-full cursor-pointer"></div>
        </div>
      </div>
  )
}

export default SideNav