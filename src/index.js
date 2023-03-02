import runCamStream from './modules/cameraStream.js';
import getVideoFrame from './modules/videoFrame.js';

const video = await runCamStream();

setInterval(() => {
  const frame = getVideoFrame(video);
  console.log(frame)
}, 1000);
