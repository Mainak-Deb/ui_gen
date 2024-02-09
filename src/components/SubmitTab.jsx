import React from 'react'

const SubmitTab = () => {
  return (
    <div className='h-[10%] border border-white flex flex-row'>
      <div className='h-full w-[80%]'>
        <textarea type="text" className='h-full  w-full border border-black text-black' style={{ resize: 'none' }}  />
      </div>
      <div className='h-full w-[20%] flex flex-col'>
        <input type="file"  className='h-1/2 bg-slate-600'/>
        <button className='bg-green-200 text-white h-1/2'>Send</button>
      </div>
    </div>
  )
}

export default SubmitTab


