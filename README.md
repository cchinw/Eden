# Eden

Snake game inspired by the story of the garden of Eden

## General Overview

A snake chases an apple across a 17 x 15 grid box. Each time the snake gets the apple, the snake's length increasesand the apple is _eaten_ and moves to a different locationon the grid box. The snake chases the apple across the board, until it hits the edges of the grid box, or it hits itself. In that case, it would be **Game Over**, and the game restarts. This game would be built using HTML, CSS and JavaScript.

## Game Outlook

### The Head

The page opens with a `header`, a `nav` and a `body`. The top header contains the game name, the nav tab contains three grid items. The first item is the `appleScore`, which counts the score for how many apples were eaten by the snake in one game. It would be represented by an apple `img` icon, and a number count that starts at 0. This refreshes after every `gameOver`

The second item is the `winScore`, which is the **Best Score** count of how many times the snake eats the apple. This does not refresh when `gameOver` occurs, but would refresh when the page is refreshed.

The next item is a timer that counts `timeElapsed` as the `gameStart` occurs. This timer would go on as long as the game loops.The timer does not begin until the snake starts moving across the board.

### The Body

The game grid would be a large box with 17 rows and 15 columns. As soon as the page loads, the snake sits on the 8th column, between the 3rd and 5th row, and the apple icon would sit on the 13th row, also on the 8th column.

## Game Play Logic

### Starting the game

The page would use an `eventListener` with the _up_, _down_, _left_ and _right_ arrow keys on the keyboard. The game can be started by pressing either the _up_, _down_ and _right_ keys, but would not respond to the _left_ key on start.
Arrow keys are triggered by `onkeydown`. The keycodes are:

- left = 37
- up = 38
- right = 39
- down = 40

The code should look something like:

    document.onkeydown = startGame

    function checkKey(s) {

    if (s.keyCode == '38') {
        // up arrow
    }
    else if (s.keyCode == '40') {
        // down arrow
    }
    else if (s.keyCode == '37') {
       // left arrow
    }
    else if (s.keyCode == '39') {
       // right arrow
    }

### The Snake (i)

The snake would be built entirely on CSS. The snake can **only** move **forward** (head first) by using the arrow keys _(up, down, left,right)_. Each time the snake swallows an apple, it's length increments by _++1_, and would continue to increment until `gameOver`.

### The Apple (j)

The apple starts on the 8th column of the 13th row of the game grid box. It is represented by an apple `img` icon. The `img` moves across all 17 rows and 15 columns in the game grid, and each time the `snakeHead === applePosition` in the gridbox, the apple _style_ changes to `display: none` in CSS. The apple `img` then moves to a random **empty** grid within the game grid box that does not contain any part of the snake or its increments.

## Game Over

`gameOver` occurs when the snake head attempts to go past the 17th row, goes before the first row, goies past the 15th column and goes before the first column. If the `snakeHead` attempts to go outside of the `border-box`, gameOver is called.
gameOver also occurs when the `snakeHead` touches any part of its own body.

## Game Restart Logic

Once `gameOver`, a new **HTML** page pops up and `confirm` prompts `Play Again`. If Play Again is selected, game refreshes apple count but does not refresh `bestScore` count. `bestScore` count is only refreshed when the page is refreshed

### References

[StackOverflow - onkeydown Event Listener](https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript)

[Google Snake Game](https://g.co/kgs/WXFeip)
