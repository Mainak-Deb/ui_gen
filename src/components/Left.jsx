import React, { useState } from 'react';
import CodeEditor from './CodeEditor'
import SubmitTab from './SubmitTab'
import callGemini from '../Logic/CallGemini';
import {fetchHTML, fetchJS, fetchCSS, htmlBodyExtractor}  from '../Logic/Parser';

const Left = ({ rawcode, setrawcode, isGenerated, setIsGenerated }) => {

  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState('make html, css , js from this image, separate them using markdown backtick, do not use any inline css , and use different classnames and ids for each html tags');
  const [description, setDescription] = useState('');
  


  async function firstTimeSend() {
    if(!isGenerated){
      if (!image) {
        alert('Please upload an image.');
        return;
      }
      const newcode=await callGemini({image,prompt})
      console.log(newcode)
      const parsedHTML =`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>UIgen</title>
          <link rel="stylesheet" href="style.css">
        </head>
        <body>
          ${htmlBodyExtractor(fetchHTML(newcode))}
        <script src="index.js"></script>
        </body>
</html>`
      const parsedCSS = fetchCSS(newcode)
      const parsedJS = fetchJS(newcode)

      console.log(parsedHTML,parsedCSS,parsedJS)
      let updatedCode = { ...rawcode }
      updatedCode["html"] = parsedHTML;
      updatedCode["css"] = parsedCSS;
      updatedCode["javascript"] = parsedJS;
      
      setrawcode(updatedCode)
      
      if (!isGenerated) {
        setIsGenerated(true)
      }
    }
  }


  return (
    <div className='w-full h-full flex flex-col' >
      <CodeEditor rawcode={rawcode} setrawcode={setrawcode} ></CodeEditor>
      {
        isGenerated ?
          <SubmitTab ></SubmitTab>
          :
          <div className='h-[10%] border border-white flex flex-row'>
            <input type="file" accept="image/*" onChange={(event)=>setImage(event.target.files[0])} className='w-1/2 h-full bg-slate-600' />
            <button className='w-1/2 bg-green-200 text-black' onClick={firstTimeSend}  >Send</button>
          </div>
      }

    </div>
  )
}

export default Left;
