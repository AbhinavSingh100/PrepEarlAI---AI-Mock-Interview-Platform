import React from 'react'
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 1280,
    facingMode: "user"
  };

const WebCam = () => {
    const webcamRef = React.useRef(null);
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
    },
    [webcamRef]
  );
  return (
    <div>
        <Webcam
        audio={false}
        height={1280}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
    </div>
    
  )
}

export default WebCam