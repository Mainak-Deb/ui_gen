import React from 'react'
import CodeEditor from './CodeEditor'
import SubmitTab from './SubmitTab'

const Left = ({rawcode,setrawcode}) => {
  return (
    <div  className='w-full h-full flex flex-col' >
      <CodeEditor  rawcode={rawcode} setrawcode={setrawcode} ></CodeEditor>
      <SubmitTab></SubmitTab>
    </div>
  )
}

export default Left;
