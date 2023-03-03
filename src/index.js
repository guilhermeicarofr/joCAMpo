import runCamStream from './modules/cameraStream.js';
import detectHands from './modules/handsDetection.js';
import getVideoFrame from './modules/videoFrame.js';

const video = await runCamStream();

setInterval(async () => {
  const frame = getVideoFrame(video);
  const hands = await detectHands(frame);
  console.log('hands-on', hands.length?true:false);
}, 100);
