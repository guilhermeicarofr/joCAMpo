import { setGesture, setGestureLoading, setOpponentLoading, setResult, setScore } from '../hud/hud.js';
import { detectGesture } from '../gestures/gesturesDetection.js';
import { detectHands } from '../video/handsDetection.js';
import { getVideoFrame } from '../video/videoFrame.js';

async function playerTurn(resolve, video) {
  let confirmGesture = { count: 0, gesture: ''};
  let playerGesture = '';

  const interval = setInterval(async () => {
    const frame = getVideoFrame(video);
    const hands = await detectHands(frame);
    const gesture = await detectGesture(hands);
    
    if(gesture.name && gesture.name === confirmGesture.gesture) {
      confirmGesture.count++;
    } else {
      confirmGesture.count = 0;
      confirmGesture.gesture = gesture.name;
    }
  
    setGesture('player', confirmGesture.gesture);
    setGestureLoading(confirmGesture.count);

    if(confirmGesture.count > 25) {
      playerGesture = confirmGesture.gesture;
      confirmGesture = { count: 0, gesture: ''};
      clearInterval(interval);
      resolve(playerGesture);
    }
  }, 100);
}

async function opponentTurn(resolve) {
  setOpponentLoading();
  setTimeout(() => {
    const index =  Math.floor(Math.random() * 3);
    const gesture = [ 'rock', 'paper', 'scissors' ][index];
    resolve(gesture);
  }, 2000);
}

function gestureMatch(player, opponent) {
  if(player===opponent) return 'draw';

  if(player==='paper' && opponent==='rock') return 'win';
  if(player==='paper' && opponent==='scissors') return 'loss';

  if(player==='rock' && opponent==='scissors') return 'win';
  if(player==='rock' && opponent==='paper') return 'loss';

  if(player==='scissors' && opponent==='paper') return 'win';
  if(player==='scissors' && opponent==='rock') return 'loss';S

  return 'draw';
}

async function delay(resolve, delay) {
  setTimeout(() => {
    resolve();
  }, delay);
}

export async function playGame(video) {
  let score = 0;
  setScore(0);

  while(true) {
    setGesture('player', '');
    setGesture('opponent', '');
    setResult('');

    let playerGesture = await new Promise((resolve) => playerTurn(resolve, video));
    console.log(playerGesture);
    setGesture('player', playerGesture);
  
    const opponentGesture = await new Promise(opponentTurn);
    console.log(opponentGesture);
    setGesture('opponent', opponentGesture);

    const result = gestureMatch(playerGesture, opponentGesture);
    console.log(result);
    setResult(result);

    if(result === 'win') score++;
    console.log(score);
    setScore(score);

    await new Promise((resolve) => delay(resolve, 3000));
    //if(result === 'draw') continue;
    if(result === 'loss') break;
  }

  console.log('End of game! Score:', score);
  setResult(`End of game! Score: ${score}`);
}
