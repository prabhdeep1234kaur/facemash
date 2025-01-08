/**
 * install dependencies:  done
 * import dependencies: done
 * setup webcam : done
 * define references : done
 * load facemesh: done
 * detect functions: done
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
    });
    setInterval(()=>{
      detect(net)
    }, 100) //every 100 milliseconds, detecting our face
  };

   //detect function: runs when app starts and detect the model
  const detect = async(net) =>{
    if(typeof webcamRef.current !== "undefined" 
    && webcamRef.current !== null 
    && webcamRef.current.video.readyState === 4){ //webcam is up and running + receiving data
      //get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      //set video and canvas width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      //make detections: network from tensorflow as net: basically from webcam
      const face = await net.estimateFaces(video);
      console.log(face);
      //get canvas content for drawing


    }
  }

  runFacemesh();//trigger the function

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
