import { playGame } from './game/gamePlay.js';
import runCamStream from './modules/cameraStream.js';

const video = await runCamStream();

playGame(video);
