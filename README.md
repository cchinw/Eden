# Eden

### By Chinwendu Ukoha

[LinkedIn](https://www.linkein.com/in/chinwenduukoha)
[Trello for Eden Game](https://trello.com/b/HDHUjIal/snake-board-game)
[Game Link](https://gardenofeden.surge.sh/)

Snake game inspired by the story of the garden of Eden

## General Overview

A snake chases an apple across a 15 x 15 grid box. Each time the snake gets the apple, the snake's length increases and the apple is _eaten_ and moves to a different location on the grid box. The snake chases the apple across the board, until it hits the edges of the grid box, or it hits itself. In that case, it would be **Game Over**, and the game restarts. This game would be built using HTML, CSS and JavaScript.

## Game Outlook

### The Head

The page opens with a landing page that gives the use insight on the prelude to the game. There is a link to enter game displayed on this page.

The link leads to a page that opens with a `header`, a `nav` and a `body`. The top header contains the game name, the nav tab contains three grid items. The first item is the `appleScore`, which counts the score for how many apples were eaten by the snake in one game. It would be represented by an apple `img` icon, and a number count that starts at 0. This refreshes after every `gameOver`

The second item is the `winScore`, which is the **Best Score** count of how many times the snake eats the apple. This does not refresh when `gameOver` occurs, but would refresh when the page is reloaded.

The next item is a display text that shows `playerMode` as the `Easy Mode` or `Hard Mode`. This display changes as the mode button on the buttom of the page is toggled.

### The Body

The game grid would be a large box with 15 rows and 15 columns in Easy mode, and 30. As soon as the page loads, the snake sits on the 8th column, between the 3rd and 5th row, and the apple icon would sit on the 13th row, also on the 8th column.

## Game Play Logic

### Starting the game

The page would use an `eventListener` with the _up_, _down_, _left_ and _right_ arrow keys on the keyboard. The game can be started by pressing either the _up_, _down_ and _right_ keys, but would not respond to the _left_ key on start.
Arrow keys are triggered by `onkeydown`.

The code should look something like:

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

### The Snake (i)

The snake would be built entirely on CSS. The snake can **only** move **forward** (head first) by using the arrow keys _(up, down, left,right)_. Each time the snake swallows an apple, it's length increments by _++1_, and would continue to increment until `gameOver`.

### The Apple (j)

The apple starts on the 8th column of the 13th row of the game grid box. It is represented by an apple `img` icon. The `img` moves across all 17 rows and 15 columns in the game grid, and each time the `snakeHead === applePosition` in the gridbox, the apple _style_ changes to `display: none` in CSS. The apple `img` then moves to a random **empty** grid within the game grid box that does not contain any part of the snake or its increments.

## Game Over

`gameOver` occurs when the snake head attempts to go past the 17th row, goes before the first row, goies past the 15th column and goes before the first column. If the `snakeHead` attempts to go outside of the `border-box`, gameOver is called.
gameOver also occurs when the `snakeHead` touches any part of its own body.

## Game Restart Logic

Once `gameOver`, a **modal** pops up and prompts user to `Play Again`. If Play Again is selected, game refreshes apple count but does not refresh `bestScore` count. `bestScore` count is only refreshed when the page is refreshed

### References

[StackOverflow - onkeydown Event Listener](https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript)

[Google Snake Game](https://g.co/kgs/WXFeip)

[Title Icon](https://freesvg.org/img/1367392415.png)

[gridGame height and width](https://elementor.com/help/whats-the-difference-between-px-em-rem-vw-and-vh/)

[Resizing images in CSS](https://codepen.io/sarus/pen/PJGPmy)

[gameIcons](https://fontawesome.com/kits/81bbffb19f/use?welcome=yes)

[DOMContentLoaded Event listener](https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event)

[Keyup](https://developer.mozilla.org/en-US/docs/Web/API/Document/keyup_event)

[clearInterval](https://www.w3schools.com/jsref/met_win_clearinterval.asp)

[Unshift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

[Remove attribute](https://www.w3schools.com/jsref/met_element_removeattribute.asp)

[Modals](https://www.w3schools.com/howto/howto_css_modals.asp)

[Adding Gifs to p tag](https://www.codegrepper.com/code-examples/html/how+to+add+gif+in+html+w3schools)

[Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

[Ternary Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
