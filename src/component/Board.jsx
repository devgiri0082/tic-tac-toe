import { useState } from "react";
import Button from "./Button";
import ControlMove from "./ControlMove";


export default function Board(props) {
    let [squares, setSquares] = useState(new Array(9).fill(" "));
    let [newSquares, setNewSquares] = useState([]);
    let [counter, setCounter] = useState(1);
    let values = ["Player X turn", "Player O turn"];
    let turn = ["X", "O"];
    let [won, setWon] = useState(undefined);
    let [pointer, setPointer] = useState(0);
    return (
            <div className = "container">
                <h1>{won ? `Player ${won} is the winner`:squares.some(elem => elem === " ") ? values[pointer] : "Game is Drawn"}</h1>
                <div className="body">
                    <div className = "board"> 
                    {squares.map((elem, index) => <Button key = {index}  id = {index} value = {elem} changeState = {changeState}/>)}
                    </div>
                    <div className="boxes">
                        <button className = "move" onClick = {changeGrid}>Start the game</button>
                        {newSquares.map(({id, value}, index)=> <ControlMove id = {index} move = {value} pointer = {index+1} changeBoard= {changeBoard}/>)}
                    </div>
                </div>
            </div>
    )
    function changeGrid() {
        setSquares(new Array(9).fill(" "));
        setWon(undefined);
        setPointer(0);
        setNewSquares([]);
    }
    function changeState(id) {
    if(squares[id] !== " " || won !== undefined) {
        return;
        }
        let arr = [...newSquares, [id, turn[pointer]]];
        setNewSquares(arr);
        setCounter(counter + 1);
        let squaresCpy = [...squares];
        squaresCpy[id] = turn[pointer];
        setPointer((pointer + 1) % 2);
        setSquares(squaresCpy)
        setWon(hasWon(squaresCpy));
    }

    function changeBoard(id) {
        console.log(newSquares, id);
        let newArr = new Array(9).fill(" ");
        let newButton = [];
        for (let i = 0; i <= id; i++) {
           newArr[newSquares[i][0]] = newSquares[i][1];
           newButton.push(newSquares[i]);
        }
        console.log(newArr);
        setSquares(newArr);
        setNewSquares(newButton);
        setWon(undefined);
        setPointer((id + 1)%2);
    }
    function hasWon(squaresCpy) {
        let grid = new Array(3).fill(0).map(() => new Array(3).fill(undefined));
        addToGrid(grid, squaresCpy);
        let winner = isWinner(grid);
       return winner;
    }
    function addToGrid(grid, squaresCpy) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0;j < 3; j++) {
                grid[i][j] = squaresCpy[i * 3 + j];
            }
        }
    }
    function isWinner(grid) {
        let mainDiag = new Set();
        let diag = new Set();
        for (let i = 0; i < 3; i++) {
            let row = new Set();
            let column = new Set();
            for (let j = 0;j < 3; j++) {
                row.add(grid[i][j]); 
                column.add(grid[j][i]);
                if(i === j) mainDiag.add(grid[i][j])
                if((i === 0 && j === 2 )|| (i === 1 && j === 1 ) || (i === 2 && j === 0)) diag.add(grid[i][j]);
            }
            if(row.size === 1 && [...row][0] !== " ") return [...row][0];
            else if (column.size === 1 && [...column][0] !== " ") return  [...column][0];
        }
        if(mainDiag.size === 1 && [...mainDiag][0] !== " ") return [...mainDiag][0];
        if(diag.size === 1 && [...diag][0] !== " ")return [...diag][0];
        return undefined;
    }
}