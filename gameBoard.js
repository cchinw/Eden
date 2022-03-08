document.addEventListener('DOMContentLoaded', () => {
  // Game Tools
  let hasGamestarted = false
  let snakeStart = [128, 129, 130]
  let appleStart = [139]

  let firstGridBox = [0]
  let snakeMovement = 1
  let snakeSpeed = 1
  let interval = 0
  let IntervalTime = 0

  function appleDefault() {
    return gridBox[appleStart]
  }

  let snakeDefault = (snake) => {
    snake.forEach((element) => {
      let snakes = gridBox[element]
    })
  }

  //Variables for Scoring
  let appleScore = 0
  let personalBest = 0

  //Building grid on gameBoard
  const width = 18
  const height = 15

  let grid = document.querySelector('.edenContainer')
  for (let i = 0; i < width * height; i++) {
    let absolutePosition = document.createElement('div')
    absolutePosition.setAttribute('class', 'position')

    let eachGridBox = document.createElement('div')
    eachGridBox.setAttribute('class', 'grids')
    eachGridBox.appendChild(absolutePosition)

    grid.appendChild(eachGridBox)
  }

  //DOM Elements
  let gridBox = document.querySelectorAll('.grid, .grids, .position')
  let gameScore = document.getElementsByClassName('apple')
  let bestScore = document.getElementsByClassName('bestScore')
  let button = document.getElementById('#start')

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
    appleDefault()
    snakeDefault()
    hasGamestarted = true
    hideStartButton()
  }

  //set arrow key movement event listener
  const left = 37
  const up = 38
  const right = 39
  const down = 40

  let plays = []

  function gameKeys(s) {
    gridBox[firstGridBox].classList.remove('snake')

    if (s.keycode === up) {
      snakeMovement = -width
    } else if (s.keycode === down) {
      snakeMovement = +width
    } else if (s.keycode === left) {
      snakeMovement = -1
    } else if (s.keycode === right) {
      snakeMovement = 1
    }
  }
  document.addEventlistener('keyup', gameKeys)
})
