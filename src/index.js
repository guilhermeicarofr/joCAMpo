import { playGame } from './game/gamePlay.js';
import { renderHUD } from './hud/hud.js';
import runCamStream from './modules/cameraStream.js';

const video = await runCamStream();

renderHUD();
playGame(video);