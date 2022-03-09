// Game Tools
let hasGamestarted = false
let snakeStart = document.getElementsByClassName(
  'row7columns2',
  'row7columns3',
  'row7columns4'
)

let snakeBody = [
  { x: 2, y: 7 },
  { x: 3, y: 7 },
  { x: 4, y: 7 }
]

function snakeIsHere(row, column) {
  let result = false
  snakeBody.forEach(function checkPlacement(loc) {
    if (loc.x === column && loc.y === row) {
      result = true
    }
  })
  return result
}

let appleStart = document.getElementsByClassName('row7columns13')

let foodBody = [{ x: 13, y: 7 }]

function foodIsHere(row, column) {
  let result = false
  foodBody.forEach(function checkFoofPlacement(loc) {
    if (loc.x === column && loc.y === row) {
      result = true
    }
  })
  return result
}

let snakeDirectionX = 1
let snakeDirectionY = 0
let snakeSpeed = 1
let interval = 0
let IntervalTime = 250

//Variables for Scoring
let appleScore = 0
let personalBest = 0

//Building grid on gameBoard
const width = 18
const height = 15

//DOM Elements
let gridBox = document.querySelector('.edenContainer')
let gameScore = document.getElementsByClassName('.apple')
let bestScore = document.getElementsByClassName('.bestScore')
let button = document.getElementById('start')

function drawBoard() {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let gridPosition = document.createElement('div')

      if (snakeIsHere(i, j)) {
        gridPosition.setAttribute('class', `row${i}columns${j} snake`)
      } else if (foodIsHere(i, j)) {
        gridPosition.setAttribute('class', `row${i}columns${j} food`)
      } else {
        gridPosition.setAttribute('class', `row${i}columns${j}`)
      }

      let grid = document.querySelector('.edenContainer')
      grid.appendChild(gridPosition)
    }
  }
}

//set arrow key movement event listener

function gameKeys(s) {
  // let firstGridBox = document.querySelector('.edenContainer').firstElementChild

  // firstGridBox.classList.toggle('snake')
  const goingUp = snakeDirectionY === -1
  const goingDown = snakeDirectionY === 1
  const goingLeft = snakeDirectionX === -1
  const goingRight = snakeDirectionX === 1

  if (s.code === 'ArrowUp' && !goingDown) {
    snakeDirectionY = -1
    snakeDirectionX = 0
    console.log(s.code)
  } else if (s.code === 'ArrowDown' && !goingUp) {
    snakeDirectionY = 1
    snakeDirectionX = 0
    console.log(s.code)
  } else if (s.code === 'ArrowLeft' && !goingRight) {
    snakeDirectionX = -1
    snakeDirectionY = 0
    console.log(s.code)
  } else if (s.code === 'ArrowRight' && goingLeft) {
    snakeDirectionX = 1
    snakeDirectionY = 0
    console.log(s.code)
  }
}
document.addEventListener('keydown', (e) => gameKeys(e))

//Functions for game logic

function hideStartButton() {
  let sG = document.getElementById('start')
  sG.style.display = 'none'
}
function showStartButton() {
  let sG = document.getElementById('start')
  sG.style.display = 'block'
}

function startGame() {
  hideStartButton()
  hasGamestarted = true
  appleScore = 0
  personalBest = 0
  appleScore.innerHTML = appleScore
  //TODO: Call function to generate random apple
  clearInterval(interval)
  interval = setInterval(snakeOutcomes, IntervalTime)
}

button.addEventListener('click', startGame)
