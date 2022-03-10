// Requiremments

// Include a minimum of 2 HTML pages and navigation between them
// Include a minimum of 2 event handlers
// Have at least 20 meaningful git commits. You should be committing your changes every time you build a new feature.
// Your code should be properly indented, spaced, and within code blocks. DO NOT leave in commented out code that was left unused (bad practice). Comments, if in your code at all, should be in your code to describe what your functions are doing.
// Display proper use of global variables and function parameters (function scopes)
// Use camelCase for JavaScript variables
// Be deployed on Surge

// Post MVP Ideas

// Add a dark mode feature
// Use object oriented programming to create reusable elements
// Use Google Fonts in your project. To do this, find a font on Google Fonts , select the font, go to the embed link, and put its HTML tag in your HTML document's <head> tag, above your link to your CSS. You will then need to use its CSS Rule to apply it in your CSS file.

//---------------------------------------------------------------------Starts Here

// Game Tools
let hasGamestarted = false

let snakeBody = [
  { x: 4, y: 7 },
  { x: 3, y: 7 },
  { x: 2, y: 7 }
]
// let snakeHead = [{ x: 4, y: 7 }]
// let snakeTail = [{ x: 2, y: 7 }]

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
let food = document.getElementsByClassName('.food')

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
  snakeBody

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
    drawFood()
    snakeMovement()
    drawSnake()

    //repeat
    gamePlay()
  }, intervalTime)
}

function drawSnake() {
  snakeBody.forEach(snake)
}

function drawFood() {
  foodBody.forEach(food)
}

function clearGrid() {
  if (snake in gridBox === true && food in gridBox === true) {
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
  return Math.round(Math.random() * gridBox.length)
}

function generateApple() {
  appleX = randomfood(0, gridBox.width - 1)
  appleY = randomfood(0, gridBox.height - 1)

  snakeBody.forEach(function snakeEatenFood(yum) {
    const eatenFood = yum.x === appleX && yum.y === appleY
    if (eatenFood) generateApple()
  })
}
function snakeMovement() {
  // snake head
  let snakeHead = { x: snakeBody[0].x, y: snakeBody[0].y }
  snakeBody.unshift(snakeHead)
  // grow snake on apple eat
  const snakeEatsApple = snakeBody[0].x === appleX && snakeBody[0].y === appleY
  if (snakeEatsApple) {
    appleScore++
    gameScore.innerHTML = appleScore
    generateApple()
  } else {
    snakeBody.pop()
  }

  // if (gridBox.snakeBody[0].classList('food')) {
  //   gridBox[snakeBody[0]].classList.remove('food')
  //   gridBox[snakeTail].classList.add('snake')
  //   snakeBody.push(snakeTail)
  //   appleScore++
  //   gameScore.innerHTML = appleScore
  //   intervalTime = intervalTime * snakeSpeed
  //   interval = setInterval(snakeOutcomes, intervalTime)
  // }
  // gridBox[snakeBody[0]].classList.add('snake')

  // snakeBody.unshift(snakeHead)
  // const hasEatenApple = snakeBody[0].x === appleX && snakeBody[0].y === appleY
  // if (hasEatenApple) {
  //   //increase apple score
  //   appleScore += 1
  //   //show score display on apple scoreboard
  //   appleScore.innerHTML = appleScore
  //   // generate new apple on random board location
  //   generateApple()
  // } else {
  //   snakeBody.pop()
  // }
}

function snakeOutcomes() {
  //Snake hitting the wall //Snake hitting its own self
  if (isGameOver()) {
    return clearInterval(interval)
  }
  //place Food
  //move SNAKE

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
