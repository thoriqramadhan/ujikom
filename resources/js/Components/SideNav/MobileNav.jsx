import React from 'react'

function MobileNav({children}) {
  return (
    <div className="w-full h-fit flex justify-evenly py-[20px]  gap-x-[55px] bg-white border fixed bottom-0 z-10">
        {children}
    </div>
  )
}

export default MobileNav