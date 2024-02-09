import React, { useEffect, useState } from 'react';
import Editor from "@monaco-editor/react";

const CodeEditor = ({ rawcode, setrawcode }) => {
  const [file, setfile] = useState("html");

  function handleChange(event) {
    let updatedCode = { ...rawcode }
    updatedCode[file] = event
    setrawcode(updatedCode)
  }

  return (
    <div className='h-[90%] border border-white flex flex-col'>
      <div className='h-[40px] bg-fuchsia-900 flex flex-row justify-start p-1 border border-fuchsia-200'>
        <button className='px-2 w-[100px] bg-fuchsia-600 hover:bg-fuchsia-800 rounded-md mx-1 border border-white' onClick={() => setfile("html")}>index.html</button>
        <button className='px-2 w-[100px] bg-yellow-400  hover:bg-yellow-800 rounded-md mx-1 border border-white' onClick={() => setfile("css")}>style.css</button>
        <button className='px-2 w-[100px] bg-green-400 hover:bg-green-800 rounded-md mx-1 border border-white' onClick={() => setfile("js")}>script.js</button>
      </div>
      <div className='h-full w-full'>
        {/* <textarea 
        className=" w-full h-full text-left bg-sky-950 text-white" 
        value={rawcode[file]}
        onChange={handleChange}></textarea> */}
        <Editor
          height="100%"
          width="100%"
          language={file}
          theme="vs-dark"
          value={rawcode[file]}
          onChange={handleChange}
          options={{
            inlineSuggest: true,
            fontSize: "16px",
            formatOnType: true,
            autoClosingBrackets: true,
            minimap: { scale: 10 }
          }}
        />
      </div>
    </div>
  )
}

export default CodeEditor
