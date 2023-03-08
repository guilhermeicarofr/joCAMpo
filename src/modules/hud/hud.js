export function renderHUD() {
  const hud = document.querySelector('div#hud');

  hud.innerHTML = (`
    <h1 id="title">Jo-CAM-Po</h1>
    <h3 id="score">Score:  </h3>
    <div id="playerGesture" class="gesture"><img></img></div>
    <div id="opponentGesture" class="gesture"><img></img></div>
    <h2 id="result"></h2>
  `);
  return;
}

export function setGesture(target, gesture) {
  let imageGesture = '<img></img>';  
  if(gesture === 'rock' || gesture === 'paper' || gesture === 'scissors') {
    imageGesture = `<img src="assets/${gesture}.png" alt="${gesture}"></img>`;
  }

  let targetElement = null;
  if(target === 'player') {
    targetElement = document.querySelector('#playerGesture');
  } else if(target === 'opponent') {
    targetElement = document.querySelector('#opponentGesture');
  }

  targetElement.innerHTML = imageGesture;
  return;
}

export function setGestureLoading(load) {
  const progress = load*4;
  const target = document.querySelector('#playerGesture.gesture img');

  target.setAttribute('style', `--progress: ${progress}%`);
  return;
}

export function setOpponentLoading() {
  const targetElement = document.querySelector('#opponentGesture.gesture');
  const loadingImage = `<img class="loading" src="assets/loading.gif" alt="loading"></img>`;

  targetElement.innerHTML = loadingImage;
  return;
}

export function setResult(result) {
  const resultElement = document.querySelector('#result');
  resultElement.innerHTML = result;
  return;
}

export function setScore(score) {
  const resultElement = document.querySelector('#score');
  resultElement.innerHTML = `Score: ${score}`;
  return;
}
