import React from 'react'

function Loading() {
  return (
    <div className='position-absolute h-100 w-100 d-flex justify-content-center align-items-center' style={{height:'100%',zIndex:'22'}}>
    <h1 className='text-white'>Loading...</h1>
    </div>
  )
}

export default Loading