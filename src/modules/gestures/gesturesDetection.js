import "https://cdn.jsdelivr.net/npm/fingerpose@0.1.0/dist/fingerpose.min.js";
import { gesturesList, gestureStrings } from './gesturesLibrary.js';

const { GestureEstimator } = window.fp;

const estimator = new GestureEstimator(gesturesList);

export default async function detectGesture(hands) {
  const noGesture = { name: '', score: 0 };
  if(!hands.length) return noGesture;
  
  const hand = hands[0];
  const fingerMarks = hand.keypoints3D.map(keypoint => [
    keypoint.x,
    keypoint.y,
    keypoint.z,
  ]);

  const { gestures } = await estimator.estimate(fingerMarks, 9);
  return gestures[0] || noGesture;
}
