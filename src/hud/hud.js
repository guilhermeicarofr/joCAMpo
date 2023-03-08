export function renderHUD() {
  const hud = document.querySelector('div#hud');

  hud.innerHTML = (`
    <h1 id="title">Jo-CAM-Po</h1>
    <h3 id="score">Score: </h3>
    <div id="playerGesture" class="gesture"></div>
    <div id="opponentGesture" class="gesture"></div>
    <h2 id="result"></h2>
  `);
  return;
}
