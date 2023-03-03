import runCamStream from './modules/cameraStream.js';
import detectGesture from './modules/gestures/gesturesDetection.js';
import detectHands from './modules/handsDetection.js';
import getVideoFrame from './modules/videoFrame.js';

const video = await runCamStream();

let playGesture = { count: 0, gesture: ''};

const interval = setInterval(async () => {
  const frame = getVideoFrame(video);
  const hands = await detectHands(frame);
  const gesture = await detectGesture(hands);

  console.log(`hands:${(hands.length)?'up':'down'}`, playGesture);

  if(gesture.name && gesture.name === playGesture.gesture) {
    playGesture.count++;
  } else {
    playGesture.count = 0;
    playGesture.gesture = gesture.name;
  }

  if(playGesture.count >= 15) {
    console.info(playGesture.gesture);
    playGesture = { count: 0, gesture: ''};
  }
}, 100);
