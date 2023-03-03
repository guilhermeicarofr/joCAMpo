import detectGesture from '../modules/gestures/gesturesDetection.js';
import detectHands from '../modules/handsDetection.js';
import getVideoFrame from '../modules/videoFrame.js';

async function playerTurn(resolve, video) {
  let confirmGesture = { count: 0, gesture: ''};
  let playerGesture = '';

  const interval = setInterval(async () => {
    const frame = getVideoFrame(video);
    const hands = await detectHands(frame);
    const gesture = await detectGesture(hands);
    
    //debug
    //console.log(`hands:${(hands.length)?'up':'down'}`, confirmGesture);
  
    if(gesture.name && gesture.name === confirmGesture.gesture) {
      confirmGesture.count++;
    } else {
      confirmGesture.count = 0;
      confirmGesture.gesture = gesture.name;
    }
  
    if(confirmGesture.count > 20) {
      playerGesture = confirmGesture.gesture;
      confirmGesture = { count: 0, gesture: ''};
      clearInterval(interval);
      resolve(playerGesture);
    }
  }, 100);
}

async function opponentTurn(resolve) {
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

async function playGame(video) {

  let score = 0;

  while(true) {
    let playerGesture = await new Promise((resolve) => playerTurn(resolve, video));

    console.log(playerGesture)
  
    const opponentGesture = await new Promise(opponentTurn);
  
    console.log(opponentGesture);

    const result = gestureMatch(playerGesture, opponentGesture);
    if(result === 'win') score++;
    //if(result === 'draw') continue;
    if(result === 'loss') break;

    console.log(result);
    console.log(score);
  }

  console.log('End of game! Score:', score)
}

export { playGame };
