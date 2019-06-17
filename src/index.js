/**
 * Tic Tac Toe
 * from Tutorial: Intro to React - https://reactjs.org/tutorial/tutorial.html
 * 
 * Elizabeth Carney
 * June 2019
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    // If the square causes a win, add classname 'winSquare'
    const className = 'square ' + (props.winSquare ? 'winSquare' : '');
    return (
        <button className={className} onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square 
                value={this.props.squares[i]} 
                onClick={() => this.props.onClick(i)}
                winSquare={this.props.winningSquares.includes(i)}
            />
        );
    }
  
    render() {
        // Create the squares
        const boardDimension = 3;
        let squaresArray = [];
        for (let i = 0; i < boardDimension; i++) {
            let rowOfSquares = [];
            for (let j = 0; j < boardDimension; j++) {
                let squareIndex = i*boardDimension + j;
                rowOfSquares = rowOfSquares.concat(this.renderSquare(squareIndex));
            }
            squaresArray = squaresArray.concat(<div className="board-row">{rowOfSquares}</div>);
        }
        return (
            <div>
                {squaresArray}
            </div>
        );
    }
}
  
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            sortedUp: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice(); // slice (copy) avoids direct data mutation
        if (calculateWinner(squares) || squares[i]) { return; }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        
        this.setState({
            history: history.concat([{
                squares: squares,
                changedSquare: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    // Reverse the order of the moves in the list
    switchSort() {
        this.setState({
            sortedUp: !this.state.sortedUp
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        var filled = true;
        var status = "";

        // Check if all squares are filled
        for (let i=0; i<current.squares.length; i++) {
            if (current.squares[i] === null) {
                filled = false;
            }
        }
    
        // Check for a winner
        var winner = null;
        var winningSquares = [];
        const winningInfo = calculateWinner(current.squares);
        if (winningInfo) {
            winner = winningInfo.winner;
            winningSquares = winningInfo.winningLine;
        }

        const moves = history.map((step, move) => {
            // Add the location of the move (col, row) to move history list items
            const changedSquare = step.changedSquare;
            const col = (changedSquare % 3) + 1;
            const row = Math.trunc(changedSquare / 3) + 1;
            const selectedButton = this.state.stepNumber === move;
            const desc = 
                (move && selectedButton) ? 'Move #' + move + ' (' + col + ', ' + row + ')' :
                move ? 'Go to move #' + move + ' (' + col + ', ' + row + ')' :
                (!move && selectedButton) ? 'Start of game' :
                'Go to start of game';
            // If this list item is currently selected, add classname 'selectedButton'
            const className = (selectedButton) ? 'selectedButton gibutton' : 'gibutton';
            return (
                <li key={move}>
                    <button className={className} onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            );
        });
        // Sort the moves in either ascending or descending order
        if (!this.state.sortedUp) { moves.reverse(); }
        
        // When no one wins, display a message about the result being a draw
        status = winner ? 'Winner: ' + winner : filled ? "It's a draw!" : (this.state.xIsNext ? 'X' : 'O') + "'s turn!";

        return (
        <div className="game">
            <div className="game-board">
                <Board 
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                    winningSquares={winningSquares}
                />
            </div>
            <div className="game-info">
                <div>
                    {status}
                    <button id='switch-button' className='gibutton' onClick={() => this.switchSort()}>
                        {this.state.sortedUp ? 'Sort ↑' : 'Sort ↓'}
                    </button>
                </div>
                <ul>{moves}</ul>
            </div>
        </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                winner: squares[a], 
                winningLine: lines[i],
            };
        }
    }
    return null;
}
  
// ========================================
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);