// Game Tools
let hasGamestarted = false

let snakeBody = [
  { x: 4, y: 7 },
  { x: 3, y: 7 },
  { x: 2, y: 7 }
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

let foodBody = [{ x: 13, y: 7 }]

function foodIsHere(row, column) {
  let result = false
  foodBody.forEach(function checkFoodPlacement(loc) {
    if (loc.x === column && loc.y === row) {
      result = true
    }
  })
  return result
}

let directionChange = false
let snakeDirectionX = 1
let snakeDirectionY = 0
let snakeSpeed = 1
let interval = 0
let intervalTime = 250
let appleX
let appleY

//Variables for Scoring
let appleScore = 0
let personalBest = 0

//Building grid on gameBoard
const width = 18
const height = 15
const gridSize = width * height

//DOM Elements
let gridBox = document.querySelector('.edenContainer')
let gameScore = document.getElementsByClassName('.apple')
let bestScore = document.getElementsByClassName('.bestScore')
let button = document.getElementById('start')
let snake = document.getElementsByClassName('.snake')
let snakeFood = document.getElementsByClassName('.food')

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

generateApple()
//set arrow key movement event listener
document.addEventListener('keydown', (s) => gameKeys(s))

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
  } else if (s.code === 'ArrowRight' && !goingLeft) {
    snakeDirectionX = 1
    snakeDirectionY = 0
    console.log(s.code)
  }
}

//Functions for game logic

function gamePlay() {
  if (isGameOver()) {
    return
  }

  directionChange = false

  setTimeout(function gameTimer() {
    clearGrid()
    document.getElementsByClassName('food')
    snakeMovement()
    document.getElementsByClassName('.snake')

    //repeat
    gamePlay()
  }, intervalTime)
}

function clearGrid() {
  if (snake in gridBox === true && snakeFood in gridBox === true) {
    removeAttribute('.snake', '.food')
  }
}

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
  interval = setInterval(snakeOutcomes, intervalTime)
}

button.addEventListener('click', startGame)

function randomfood(min, max) {
  return Math.round((Math.random() * (max - min) + min) / gridSize) * gridSize
}

function generateApple() {
  appleX = randomfood(0, gridBox.width - gridSize)
  appleY = randomfood(0, gridBox.height - gridSize)

  snakeBody.forEach(function snakeEatenFood(yum) {
    let eatenFood = yum.x === appleX && yum.y === appleY
    if (eatenFood) {
      generateApple()
    }
  })
}
function snakeMovement() {
  // snake head
  const snakeHead = { x: snakeBody[4].x, y: snakeBody[7].y }
  // grow snake on apple eat
  snakeBody.unshift(snakeHead)
  const hasEatenApple = snakeBody[0].x === appleX && snakeBody[0].y === appleY
  if (hasEatenApple) {
    //increase apple score
    appleScore += 1
    //show score display on apple scoreboard
    gameScore.innerHTML = appleScore
    // generate new apple on random board location
    generateApple()
  } else {
    snakeBody.pop()
  }
}

function snakeOutcomes() {
  //Snake hitting the wall //Snake hitting its own self
  if (isGameOver()) {
    return
  }
  //place Food
  //move SNAKE
  let snakeTail = snakeBody[2]
  snakeBody.unshift(snakeBody[0] + snakeDirectionX)

  drawBoard()
  clearInterval(interval)
}

//Snake hitting an apple

function isGameOver() {
  showStartButton()
  for (let i = 4; i < snakeBody.length; i++) {
    if (snakeBody[i].x === snakeBody[0].x && snakeBody[i].y === snakeBody[0].y)
      return true
  }

  const hitLeftWall = snakeBody[0].x < 0
  const hitRightWall = snakeBody[0].x > width - 1
  const hitTopWall = snakeBody[0].y < 0
  const hitBottomWall = snakeBody[0].y > height - 1

  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}
