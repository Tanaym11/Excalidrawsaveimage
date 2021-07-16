import React, { useEffect, useState } from "react";
import Excalidraw from "@excalidraw/excalidraw";
const axios = require('axios').default;

function App() {

  const MINUTE_MS = 10000;
  const [timer, setTimer] = useState(false); 
  
  useEffect(() => {
    console.log('running '+timer); 
    buttonclick();
    const interval = setInterval(() => { setTimer(!timer) }, MINUTE_MS);
    return () => { clearInterval(interval) }  
      }, [timer]); 
 
  function buttonclick(){
    const canvas = document.querySelector("canvas");
    if (canvas===null){}
    else{  
    let canvas1=canvas.toDataURL();
    
    let url=`http://localhost:8070/api1`;
    axios.post(
      url,
      {
        file: canvas1,
        filename: "pngfile.png",
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      }
    )
    axios.get(url).then((files)=>console.log(files.data))
    }
  }
  return (<div >
    <div className='a123'>
    <Excalidraw  
        /> 
     </div>
     <a href='http://localhost:8070/download?filename=pngfile.png'>download</a>
  </div>
    
  );
}

export default App;
