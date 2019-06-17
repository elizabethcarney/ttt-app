# Tic Tac Toe 
### [Tutorial: Intro to React](https://reactjs.org/tutorial/tutorial.html)

### How it works

First of all, this program has a function `Square(props)` that returns a button with the following properties: 
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
  - It starts by calling super, because all React components with constructors should begin with a `super(props)` call.
  - State properties
    - `history`: An array of arrays. Each move, a new array filled with the squares' current values is added to this array.

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
