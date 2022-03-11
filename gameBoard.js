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

//DOM Elements
let gridBox = document.querySelector('.edenContainer')
let gameScore = document.querySelector('.apple')
let bestScore = document.querySelector('.bestScore')
let button = document.getElementById('start')
let gameModeButton = document.getElementById('gameMode')
let gameMessage = document.getElementById('gameInfo')
let snake = document.getElementsByClassName('.snake')
let food = document.getElementsByClassName('.food')

//Building grid on gameBoard
let width = 15
let height = 15
let gridSize = width * height

let directionChange = false
let snakeDirection = 1 //1 is right, 2 is left, 3 is up and 4 is down
let snakeSpeed = 1
let interval = 0
let intervalTime = 250
let appleX
let appleY

// Game Tools
// let hasGamestarted = false

let snakeBody = [
  { x: 4, y: 7 },
  { x: 3, y: 7 },
  { x: 2, y: 7 }
]
// console.log(snakeBody)

// let snakeHead = [{ x: 4, y: 7 }]
// let snakeTail = [{ x: 2, y: 7 }]

function snakeIsHere(y, x) {
  let result = false
  snakeBody.forEach((element) => {
    if (element.x === x && element.y === y) {
      result = true
    }
  })
  return result
}

let foodBody = [{ x: 13, y: 7 }]

function foodIsHere(y, x) {
  let result = false
  foodBody.forEach((element) => {
    if (element.x === x && element.y === y) {
      result = true
    }
  })
  return result
}

// function findEmptyGrid() {
//   if (snakeIsHere === true) {
//     foodIsHere === false
//   }
// }

// Variables for Scoring
let appleScore = 0
let personalBest = 0

function initBoard() {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      let gridPosition = document.createElement('div')
      if (snakeIsHere(i, j)) {
        gridPosition.setAttribute('class', `x${i}y${j} snake`)
      } else if (foodIsHere(i, j)) {
        gridPosition.setAttribute('class', `x${i}y${j} food`)
      } else {
        gridPosition.setAttribute('class', `x${i}y${j}`)
      }
      gridBox.appendChild(gridPosition)
    }
  }
}

function clearBoard() {
  let oldSnake = document.querySelectorAll('.snake')
  let oldFood = document.querySelectorAll('.food')
  oldSnake.forEach(function clearSnake(element) {
    element.removeAttribute('.snake')
  })

  oldFood.forEach(function clearSnake(element) {
    element.removeAttribute('.food')
  })
}

// generateApple()
//set arrow key movement event listener
function gameKeys(s) {
  const goingUp = snakeDirection === 3
  const goingDown = snakeDirection === 4
  const goingLeft = snakeDirection === 2
  const goingRight = snakeDirection === 1

  if (s.code === 'ArrowUp' && !goingDown) {
    snakeDirection = 3
    console.log(s.code)
  } else if (s.code === 'ArrowDown' && !goingUp) {
    snakeDirection = 4
    console.log(s.code)
  } else if (s.code === 'ArrowLeft' && !goingRight) {
    snakeDirection = 2
    console.log(s.code)
  } else if (s.code === 'ArrowRight' && !goingLeft) {
    snakeDirection = 1
    console.log(s.code)
  }
}
document.addEventListener('keydown', (s) => gameKeys(s))

function snakeMovement() {
  // snake head
  if (snakeDirection === 1) {
    //move to the right
    let newHead = { x: snakeBody[0].x + 1, y: snakeBody[0].y }
    snakeBody.unshift(newHead)
    //.pop()
  } else if (snakeDirection === 2) {
    //move to the left
    let newHead = { x: snakeBody[0].x - 1, y: snakeBody[0].y }
    snakeBody.unshift(newHead)
    //snakeBody.pop()
  } else if (snakeDirection === 3) {
    //move up
    let newHead = { x: snakeBody[0].x, y: snakeBody[0].y - 1 }
    snakeBody.unshift(newHead)
    //snakeBody.pop()
  } else if (snakeDirection === 4) {
    //move down
    let newHead = { x: snakeBody[0].x, y: snakeBody[0].y + 1 }
    snakeBody.unshift(newHead)
    //snakeBody.pop()
  }

  const hasEatenFood =
    snakeBody[0].x === foodBody[0].x && snakeBody[0].y === foodBody[0].y

  if (hasEatenFood) {
    //add to score
    appleScore++
    //display score
    gameScore.innerHTML = appleScore
    if (appleScore > personalBest) {
      personalBest = appleScore
      bestScore.innerHTML = personalBest
    }
    IncrementTime()
    generateApple()
  } else {
    snakeBody.pop()
  }
}

// console.log(snakeDirection)

//Functions for game logic

function paintSnake() {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      // console.log(i, j)

      const box = document.querySelector(`.x${i}y${j}`)
      // console.log(box)

      if (snakeIsHere(i, j) === true) {
        box.classList.add('snake')
      } else {
        box.classList.remove('snake')
      }
    }
  }
}

function paintFood() {
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      // console.log(i, j)

      const box = document.querySelector(`.x${i}y${j}`)
      // console.log(box)

      if (foodIsHere(i, j) === true) {
        box.classList.add('food')
      } else {
        box.classList.remove('food')
      }
    }
  }
}

function gamePlay() {
  snakeMovement()
  let gameOver = isGameOver()
  if (gameOver === true) {
    clearInterval(interval)
  } else {
    clearBoard()
    paintSnake()
    paintFood()
    //drawBoard()
  }
}

function startGame() {
  hideStartButton()
  initBoard()
  hasGamestarted = true
  appleScore = 0
  personalBest = 0
  appleScore.innerHTML = appleScore
  //intervalTime = 500
  //TODO: Call function to generate random apple
  // clearInterval(interval)
  interval = setInterval(gamePlay, intervalTime)
}
button.addEventListener('click', startGame)
gameModeButton.addEventListener('click', toggleGameMode)
let EasyGameMode = true
function toggleGameMode() {
  EasyGameMode = !EasyGameMode
  if (EasyGameMode) {
    //easy variables

    width = 15
    height = 15
    incVal = 50
    intervalTime = 500
    gameModeButton.innerHTML = 'Click for Hard Mode'
  } else {
    //hard variables
    width = 30
    height = 30
    incVal = 100
    intervalTime = 300
    gameModeButton.innerHTML = 'Click for Easy Mode'
  }
  while (gridBox.firstChild) {
    gridBox.removeChild(gridBox.firstChild)
  }

  Object.assign(gridBox.style, {
    'grid-template-columns': 'repeat(' + width + ',1fr)'
  })
  Object.assign(gridBox.style, {
    'grid-template-rows': 'repeat(' + height + ',1fr)'
  })
  //gridBox.style.cssText = 'gridTemplateColumns: repeat(' + width + ', 1fr);'
  //gridBox.style.gridTemplateRows = 'repeat(30, 1fr);'

  gridSize = width * height
  gameMessage.innerHTML = EasyGameMode ? 'Easy Mode' : 'Hard Mode'
}

function hideStartButton() {
  let sG = document.getElementById('hideable')
  sG.style.display = 'none'
}
function showStartButton() {
  let sG = document.getElementById('hideable')
  sG.style.display = 'block'
}

function randomFood(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function generateApple() {
  appleX = randomFood(0, width - 1)
  appleY = randomFood(0, height - 1)

  snakeBody.forEach(function snakeEatenFood(yum) {
    const eatenFood = yum.x === appleX && yum.y === appleY
    if (eatenFood) generateApple()
    else {
      foodBody[0].x = appleX
      foodBody[0].y = appleY
    }
  })
}

let incVal = 50

function IncrementTime() {
  clearInterval(interval)
  intervalTime -= incVal
  intervalTime = Math.min(Math.max(intervalTime, 100), 500)
  interval = setInterval(gamePlay, intervalTime)
}

function isGameOver() {
  // showStartButton()
  for (let i = 1; i < snakeBody.length; i++) {
    if (snakeBody[i].x === snakeBody[0].x && snakeBody[i].y === snakeBody[0].y)
      return true
  }

  const hitLeftWall = snakeBody[0].x < 0
  const hitRightWall = snakeBody[0].x > width - 1
  const hitTopWall = snakeBody[0].y < 0
  const hitBottomWall = snakeBody[0].y > height - 1

  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
}
