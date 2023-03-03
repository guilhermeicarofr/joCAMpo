import runCamStream from './modules/cameraStream.js';
import detectGesture from './modules/gestures/gesturesDetection.js';
import detectHands from './modules/handsDetection.js';
import getVideoFrame from './modules/videoFrame.js';

const video = await runCamStream();

setInterval(async () => {
  const frame = getVideoFrame(video);
  const hands = await detectHands(frame);
  const gesture = await detectGesture(hands);

  console.log(`hands:${(hands.length)?'up':'down'}`, gesture);
}, 100);
