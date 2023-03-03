import "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@4.2.0/dist/tf-core.min.js"
import "https://unpkg.com/@tensorflow/tfjs-backend-webgl@3.7.0/dist/tf-backend-webgl.min.js"
import "https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915/hands.min.js"
import "https://cdn.jsdelivr.net/npm/@tensorflow-models/hand-pose-detection@2.0.0/dist/hand-pose-detection.min.js"

const handPoseDetection = window.handPoseDetection;
const handsVersion = window.VERSION;

const model = handPoseDetection.SupportedModels.MediaPipeHands;
const detectorConfig = {
  runtime: 'mediapipe',
  solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${handsVersion}`,
  modelType: 'lite',
  maxHands: 1
};

const detector = await handPoseDetection.createDetector(model, detectorConfig);

export default async function detectHands(frame) {
  const hands = await detector.estimateHands(frame, {
    flipHorizontal: true
  });
  return hands;
}
