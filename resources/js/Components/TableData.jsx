import React from 'react'

function TableData({text , className,prop}) {
  return (
    <td className={`h-[60px] text-center align-middle ${className}`}>{text}{text ? prop : ''}</td>
  )
}

export default TableData