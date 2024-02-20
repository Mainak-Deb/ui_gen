import { useEffect, useRef, useState } from "react";
import {
  getPanelElement,
  getPanelGroupElement,
  getResizeHandleElement,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";
import Left from "./components/Left";
import Right from "./components/Right";



export function Home() {
  const refs = useRef();
  const [isGenerated, setIsGenerated]=useState(false);

  const [rawcode , setrawcode] = useState({
    "html": `<!DOCTYPE html>
              <html lang="en">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <meta http-equiv="X-UA-Compatible" content="ie=edge">
                  <title>UIgen</title>
                  <link rel="stylesheet" href="style.css">
                </head>
                <body>
                
                <script src="index.js"></script>
                </body>
  </html>`,

    "css": `body { font-family: Helvetica, Arial, sans-serif; text-align: center;}
            img { margin: 10px; }
            `,
    "javascript": `//js code here
console.log("working fine");`

  })

  useEffect(() => {
    const groupElement = getPanelGroupElement("group");
    const leftPanelElement = getPanelElement("left-panel");
    const rightPanelElement = getPanelElement("right-panel");
    const resizeHandleElement = getResizeHandleElement("resize-handle");

    // If you want to, you can store them in a ref to pass around
    refs.current = {
      groupElement,
      leftPanelElement,
      rightPanelElement,
      resizeHandleElement,
    };
  }, []);

  return (
    <div className="className='w-[100vw] h-[100vh]">
      <PanelGroup direction="horizontal" id="group" className='w-full h-full bg-black text-white p'>
        <Panel id="left-panel" minSize={15} className="h-full border-2 border-double border-blue-200 m-1 rounded-md" >
          <Left rawcode={rawcode} setrawcode={setrawcode} isGenerated={isGenerated} setIsGenerated={setIsGenerated} ></Left>
        </Panel>
        <PanelResizeHandle id="resize-handle" className="border border-dashed border-blue-200" />
        <Panel id="right-panel" minSize={15} className="h-full border-2 border-double border-blue-200 m-1 rounded-md" >
          <Right rawcode={rawcode}></Right>
        </Panel>
      </PanelGroup>
    </div>
  );
}