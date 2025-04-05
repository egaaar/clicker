let $time = document.querySelector('#time');
let $result = document.querySelector('#result');
let $timeHeader = document.querySelector('#time-header');
let $resultHeader = document.querySelector('#result-header');
let $start = document.querySelector('#start');
let $game = document.querySelector('#game');
let $gameTime = document.querySelector('#game-time');

let score = 0;
let isGameStarted = false;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);
$gameTime.addEventListener('input', setGameTime);

function startGame() {
  score = 0;
  setGameTime();
  $gameTime.setAttribute('disabled', 'true');
  isGameStarted = true;
  $game.style.backgroundColor = '#fff';
  $start.classList.add('hide');

  let interval = setInterval(function() {
    let time = parseFloat($time.textContent);
    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  renderBox();
}

function setGameTime() {
  let time = +$gameTime.value;
  $time.textContent = time.toFixed(1);
  $timeHeader.classList.remove('hide');
  $resultHeader.classList.add('hide');
}

function endGame() {
  isGameStarted = false;
  $gameTime.removeAttribute('disabled');
  $start.classList.remove('hide');
  $game.style.backgroundColor = '#ccc';
  $game.innerHTML = '';
  $resultHeader.classList.remove('hide');
  $timeHeader.classList.add('hide');
  $result.textContent = score;
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return;
  }

  if (event.target.dataset.box) {
    score++;
    renderBox();
  }
}

function renderBox() {
  $game.innerHTML = '';
  
  let box = document.createElement('div');
  let boxSize = getRandom(30, 100);
  let gameSize = $game.getBoundingClientRect();
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;
  let randomTop = getRandom(0, maxTop);
  let randomLeft = getRandom(0, maxLeft);
  let randomColor = getRandomColor();
  
  box.style.height = box.style.width = boxSize + 'px';
  box.style.position = 'absolute';
  box.style.backgroundColor = randomColor;
  box.style.top = randomTop + 'px';
  box.style.left = randomLeft + 'px';
  box.style.cursor = 'pointer';
  box.style.borderRadius = '10px';
  box.setAttribute('data-box', 'true');
  
  $game.insertAdjacentElement('afterbegin', box);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}