import React from 'react'

function Checklist({className}) {
  return (
    <svg width="30" height="30" className={className} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="11.25" stroke="white" stroke-width="2.5"/>
        <path d="M10 15L13.75 18.75L20 11.25" stroke="white" stroke-width="2.5"/>
    </svg>

  )
}

export default Checklist