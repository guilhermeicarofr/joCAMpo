export default function getVideoFrame(video) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { willReadFrequently: true });
  
  const [ width, height ] = [ video.videoWidth, video.videoHeight ];
  canvas.width = width;
  canvas.height = height;
  context.drawImage(video, 0, 0, width, height);

  const frame = context.getImageData(0, 0, width, height);
  return frame;
}
