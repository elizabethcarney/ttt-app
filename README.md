# Tic-Tac-Toe 
### [Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html)

### How it works

First of all, this program has the function `Square(props)` that returns a button with the following properties: 
- `winSquare`: `true` if the square is one of the three that causes a win (else `false`)
- `className`: `square`, which styles it via the CSS file 
  - If `winSquare` is true, then the class `winSquare` is added to it, making it green.
- `onClick`: `this.props.onClick(i)`, which is passed down from Game to Board to Square. It calls `handleClick(i)`, where `i` is the index of the square
- `value`: `props.value`, the text of the button, again passed down from Game

Then, the class `Board` contains two methods:
- `renderSquare(i)` - This function returns a square, passing it the properties named above. 
- `render()` - This function creates the board of square buttons using nested for-loops.

The `Game` class is where most of the action happens. 
- `constructor(props)`
  - Starts by calling super, because all React components with constructors should begin with a `super(props)` call.
  - State properties
    - `history`: an array of arrays: each move, a new array filled with the squares' current values is added to this array
    - `stepNumber`: how many moves have been made in the game
    - `xIsNext`: whose turn it is
    - `sortedUp`: whether the list of moves is sorted in ascending or descending order
- `handleClick(i)` (called when a square is clicked)
  1. Copies the current array of square values into a new `squares` array
  2. If there is a winner or if the square is already filled, ignore the click (return)
  3. Otherwise, fill the square with an X or O depending on the current player
  4. Update the Game's state
     - Concatenate the new array of square values onto the `history` array and note that `changedSquare` is now the square that was just clicked
     - Increment the step number
     - Switch whose turn it is
- `jumpTo(step)` (called when a move history button is clicked)
  - Update the Game's state
    - Change the step number to `step`
    - Calculate whose turn it was at that point and make it that player's turn
- `switchSort()` (called when the sort toggle button is clicked)
  - Update the Game's state
    - Toggle the ascending/descending order of the move history list
- `render()`
  1. Check if all the squares are filled
  2. Check for a winner
  3. Map each move history item to a button
     - Calculate row and column of `changedSquare` by its index
     - Set button description with (col, row) and move #
       - The first move's description is "Start of game"
       - If the item is not currently selected, it says "Go to ..." before the move #/coords
     - Give the button the classname 'gibutton'
       - If the item is currently selected, add the classname 'selectedButton'
     - Return the button with its classnames, its onClick set to `jumpTo(move)`, and its description
  4. If `sortedUp` is false, reverse the order of the buttons
  5. Display whose turn it is via the status message
     - If someone wins, display the winner
     - If all squares are full but no one won, display "It's a draw!"
  6. Return: 
     - `game-board` div: the Board component with the current array of squares as well as a list called `winningSquares`, which will contain the squares causing a win if there's a winner 
     - `game-info` div: the status message, the toggle sort button, and the move history list
     
Lastly, the `calculateWinner(squares)` function first defines all of the possible winning square index combinations in an array called `lines` (3-in-a-row horizontally, vertically, and diagonally). Then, for each line in the array, it checks whether the squares at those indices all share the same value (X or O) and that the value is not null. If so, it returns the value (X or O, equivalent to the player who just won) as `winner`, and it returns the three squares causing the win as a list called `winningSquares`. If no one has won yet, it returns null.
  - Note: each Square element decides whether or not it is a winning square by asking whether its index is contained in `winningSquares`
  
Finally, we call ReactDOM.render() and render the Game into the HTML element called `root`, which was created by Create React App.

### My solutions to the game improvement prompts

1. Display the location for each move in the format (col, row) in the move history list.
   - Added a prop to `history` so that each move records which square was clicked on that turn (`changedSquare` holds its index)
   - For each button in the move history list:
     - Calculated the row and column of the clicked square based on its index
     - Altered the button's description to include that coordinate
   - I also decided to alter the description based on whether or not it was the currently selected item in the move list. I learned how to use the ternary operator and chain it, producing the following snippet:
   
      ```
      const desc = (move && selectedButton) ? 'Move #' + move + ' (' + col + ', ' + row + ')' :
                   move ? 'Go to move #' + move + ' (' + col + ', ' + row + ')' :
                   (!move && selectedButton) ? 'Start of game' :
                   'Go to start of game';
      ```
                
      The code above is equivalent to:
      
      ```
      // If we're past the first move and this is the currently selected item
      if (move && selectedButton) {
        desc = 'Move #' + move + ' (' + col + ', ' + row + ')'
      } 
      // If we're past the first move and this is not the currently selected item
      else if (move) {
        desc = 'Go to move #' + move + ' (' + col + ', ' + row + ')'
      } 
      // If we're at the first move and this is the currently selected item
      else if (!move && selectedButton) {
        desc = 'Start of game'
      } 
      // If we're at the first move and this is not the currently selected item
      else {
        desc = 'Go to start of game';
      }
      ```

2. Bold the currently selected item in the move list.
   - Created boolean `selectedButton` to check whether a move button matched the current move or not:
      ```
      const selectedButton = this.state.stepNumber === move;
      ```
   - If so, added the classname `selectedButton` to it, which receives a `bold` font-weight in `index.css`
   
3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
   - Added nested for-loops (outer creates rows, inner creates squares)
   - See `render()` method in `Board` class
4. Add a toggle button that lets you sort the moves in either ascending or descending order.
   - Added a button to the `game-info` div
      - Its ID allows for CSS styling
      - Its text changes depending on the sorting order
   - When the button is clicked, it calls the `switchSort()` method, which toggles the boolean `sortedUp`
   - Each time the move history list buttons are re-rendered, I check the boolean, and if it is false then I reverse the order of the list:
      ```
      if (!this.state.sortedUp) { 
        moves.reverse(); 
      }
      ```
5. When someone wins, highlight the three squares that caused the win.
   - Altered `calculateWinner()` to also return `winningSquares`, a list of indices of the squares in the winning line
   - `winningSquares` is passed down to Square as a prop
   - When Board renders each square, it checks whether the square's index is included in `winningSquares`
   - If it is, then the square's prop called `winSquare` becomes `true`
   - In the `Square()` function, if the `winSquare` prop is `true` then the square gets the classname `winSquare`, which changes its background to green
6. When no one wins, display a message about the result being a draw.
   - Added boolean called `filled` to check whether all of the squares had been filled yet
   - If so, the status message changes to say "It's a draw!" instead of saying whose turn it is or who the winner is
   - Another approach could've been to check whether the 9th move had happened yet

______

#### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
