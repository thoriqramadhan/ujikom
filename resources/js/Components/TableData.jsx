import React from 'react'

function TableData({text , className}) {
  return (
    <td className={`h-[60px] text-center align-middle ${className}`}>{text}</td>
  )
}

export default TableData