export default async function runCamStream() {
  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
      'Browser mediaDevices'
    );
  }

  const videoConfig = {
    audio: false,
    video: {
      width: globalThis.screen.availWidth,
      height: globalThis.screen.availHeight,
      facingMode: "user",
      frameRate: {
        ideal: 60
      }
    }
  };

  const stream = await navigator.mediaDevices.getUserMedia(videoConfig);

  const video = document.querySelector('#videoStream');
  video.srcObject = stream;
  
  await new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video)
    };
  });

  video.play();
  return stream;
}
