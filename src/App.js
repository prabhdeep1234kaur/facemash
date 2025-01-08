/**
 * install dependencies:  done
 * import dependencies: done
 * setup webcam : done
 * define references : done
 * load facemesh: done
 * 
 * 
 */

import React, {useRef} from 'react';
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from 'react-webcam';

function App() {

  //setup references
  const webcamRef = useRef(null); //allows to onscreen components
  const canvasRef = useRef(null);

  //load facemesh: load facemesg model into our app and allows detection
  const runFacemesh = async() =>{
    const net = await facemesh.load({
      inputResolution: {width: 640, height: 480}, scale: 0.8 //how big of a photo will be loaded
    })
  }


  return ( 

    <div className="App">
      <header className="App-header">
      <Webcam ref={webcamRef} 
      style = {{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndexL: 9,
        width: 640,
        height: 480,
        }}
      />
      <canvas ref={canvasRef} 
      style = {{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndexL: 9,
        width: 640,
        height: 480,
      }}
      />
      </header>
    </div>
  );
}

export default App;
