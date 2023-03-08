import { runApp } from './modules/game/gamePlay.js';
import { renderHUD } from './modules/hud/hud.js';
import { runCamStream } from './modules/video/cameraStream.js';

const video = await runCamStream();
renderHUD();
runApp(video);
