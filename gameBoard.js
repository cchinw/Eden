// Game Tools
let hasGamestarted = false
let snakeStart = document.getElementsByClassName(
  'row7 columns2',
  'row7 columns3',
  'row7 columns4'
)
let appleStart = document.getElementsByClassName('row7 columns13')

let firstGridBox = document.getElementsByClassName('row0 columns0')
let snakeDirection = 1
let snakeSpeed = 1
let interval = 0
let IntervalTime = 0

//Variables for Scoring
let appleScore = 0
let personalBest = 0

//Building grid on gameBoard
const width = 18
const height = 15

for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    let gridPosition = document.createElement('div')
    gridPosition.setAttribute('class', `row${i} columns${j}`)

    let grid = document.querySelector('.edenContainer')
    grid.appendChild(gridPosition)
  }
}

//DOM Elements
let gridBox = document.querySelector('.edenContainer')
let gameScore = document.getElementsByClassName('.apple')
let bestScore = document.getElementsByClassName('.bestScore')
let button = document.querySelector('button')

//set arrow key movement event listener

function gameKeys(s) {
  firstGridBox.className += 'snake'
  if (s.code === 'ArrowUp') {
    snakeDirection = -width
    console.log(s.code)
  } else if (s.code === 'ArrowDown') {
    snakeDirection = +width
    console.log(s.code)
  } else if (s.code === 'ArrowLeft') {
    snakeDirection = -1
    console.log(s.code)
  } else if (s.code === 'ArrowRight') {
    snakeDirection = 1
    console.log(s.code)
  }
}
document.addEventListener('keydown', (e) => gameKeys(e))

//Functions for game logic

function appleDefault() {
  return gridBox[appleStart]
}

let snakeDefault = (snake) => {
  snake.forEach((element) => {
    let snakes = snakeStart.gridBox[element]
  })
}

function hideStartButton() {
  let sG = document.getElementById('start')
  sG.style.display = 'none'
}
function showStartButton() {
  let sG = document.getElementById('start')
  sG.style.display = 'block'
}

let startGame = (gamePlay) => {
  gamePlay.forEach((play) => {
    appleDefault()
    snakeDefault()
    hasGamestarted = true
    hideStartButton()
    direction = 1
    appleScore = 0
    personalBest = 0
    clearInterval(interval)
    gameScore.innerText = appleScore
    bestScore.innerText = personalBest
    IntervalTime = 1000
    snakeStart = [128, 129, 130]
    appleStart = [139]
    firstGridBox = [0]
    snakeStart.forEach((box) => gridBox[box].classList.add('snake'))
    interval = setInterval(movement, IntervalTime)
  })
}
button.addEventListener('click', startGame)
console.log(snakeDefault)
console.log(appleDefault)
