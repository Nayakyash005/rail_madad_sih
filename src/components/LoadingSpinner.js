import React from 'react'

export default function LoadingSpinner() {
  return (
    <div className='h-full w-full'>
        <div className='border-black mx-auto my-auto border-4 rounded-full size-10 border-b-transparent animate-spin'></div>
    </div>
  )
}
