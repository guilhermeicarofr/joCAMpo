import "https://cdn.jsdelivr.net/npm/fingerpose@0.1.0/dist/fingerpose.min.js";

const { GestureDescription, Finger, FingerCurl } = window.fp;

const rockGesture = new GestureDescription('rock'); // ✊️
const paperGesture = new GestureDescription('paper'); // 🖐
const scissorsGesture = new GestureDescription('scissors'); // ✌️

//rock gesture
rockGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
rockGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  rockGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  rockGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

//paper gesture
for (let finger of Finger.all) {
  paperGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

//scissors gesture
scissorsGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
scissorsGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
scissorsGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);
for (let finger of [Finger.Ring, Finger.Pinky]) {
  rockGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  rockGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

const gesturesList = [
  rockGesture,
  paperGesture,
  scissorsGesture
];

const gestureStrings = {
  'rock': '✊️',
  'paper': '🖐',
  'scissors': '✌️'
};

export {
  gesturesList,
  gestureStrings
};
