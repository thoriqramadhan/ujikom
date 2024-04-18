import React from 'react'

function MobileNav({children}) {
  return (
    <div className="w-full h-fit flex justify-evenly py-[20px] gap-x-[55px] border fixed bottom-0">
        {children}
    </div>
  )
}

export default MobileNav