import React from 'react'
import WebMaker from '../Logic/WebMaker'

const Right = (htmlContent) => {
  return (
    <div className='w-full h-full bg-white'>
      <iframe
        title="HTML Content"
        width="100%"
        height="100%"
        srcDoc={WebMaker(htmlContent)}
      />
    </div>
  )
}

export default Right;


