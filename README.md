# Tic Tac Toe 
### [Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html)

### How it works

This write-up is a summary of what I've learned about React through this tutorial.

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

2. Bold the currently selected item in the move list.
3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
4. Add a toggle button that lets you sort the moves in either ascending or descending order.
5. When someone wins, highlight the three squares that caused the win.
6. When no one wins, display a message about the result being a draw.

<br/><br/><br/><br/>
#### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
