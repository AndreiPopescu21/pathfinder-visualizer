import { useState, useEffect } from "react";

import DFS from "../lib/Algorithms/DFS";
import BFS from "../lib/Algorithms/BFS";

import BoardManager from "../lib/BoardManager";
import Square from "../lib/Square";

const Grid = ({selectedAlgorithm, selectedClear, setSelectedClear, visualize, setVisualize, speed, mazeGenerationTehniques}) => {

    const [isMouseDownOnGrid, setIsMouseDownOnGrid] = useState(false);
    const [isStartSquareDragged, setIsStartSquareDragged] = useState(false);
    const [isFinishSquareDragged, setIsFinishSquareDragged] = useState(false);

    const [board, setBoard] = useState([]);
    const boardManager = new BoardManager(setBoard, selectedClear);

    const [delay, setDelay] = useState(1000);

    useEffect(() => {
        boardManager.initBoard();
    }, []);

    useEffect(() => {
        if(visualize)
            return;
        if(selectedClear == "Board")
            boardManager.clearBoard();
        else if(selectedClear == "Walls")
            boardManager.clearByState(Square.WALL);
        else if(selectedClear == "Path")
            boardManager.clearByState(Square.PATH);
        setSelectedClear("");
    }, [selectedClear])

    useEffect(() => {
    }, [board])

    useEffect(() => {
        switch(speed) {
            case "Slow":
                setDelay(500);
                break;
            case "Medium":
                setDelay(100);
                break;
            default:
                setDelay(0);
                break;
        }
    }, [speed]);

    useEffect(() => {
        if(visualize){
            visualizeAlgorithm()
        }
    }, [visualize]);

    useEffect(() => {
        console.log(mazeGenerationTehniques);
    }, [mazeGenerationTehniques]);

    const onSquareHover = (rowIndex, colIndex) => {
        if(!isMouseDownOnGrid)
            return;           
            
        if(isStartSquareDragged)
            boardManager.setStart(rowIndex, colIndex);
        else if(isFinishSquareDragged)
            boardManager.setFinish(rowIndex, colIndex);
        else
            boardManager.toggleWall(rowIndex, colIndex);
    }

    const onMouseDownOnGrid = (e, rowIndex, colIndex) => {
        e.preventDefault();
        if(visualize)
            return;

        setIsMouseDownOnGrid(true);

        if(board[rowIndex][colIndex].getState()=="start")
            setIsStartSquareDragged(true);
        else if(board[rowIndex][colIndex].getState()=="finish")
            setIsFinishSquareDragged(true);
    }

    const onMouseClick = (rowIndex, colIndex) => {
        if(visualize)
            return;
        
        boardManager.toggleWall(rowIndex, colIndex)
    }

    const mouseStopGridHover = () => {
        setIsMouseDownOnGrid(false);
        setIsStartSquareDragged(false);
        setIsFinishSquareDragged(false);
    }

    const visualizeAlgorithm = () => {
        boardManager.clearByState("path");
        boardManager.clearByState("visited");

        var algorithm;
        switch(selectedAlgorithm) {
            case "DFS":
                algorithm = new DFS(boardManager);
                break;
            case "BFS":
                algorithm = new BFS(boardManager);
                break;
            default:
                algorithm = new DFS(boardManager);
                break;
        }

        var timer = setInterval(() => {
            if(algorithm.step()){
                clearInterval(timer);
                boardManager.setPath(algorithm.getPath(), () => setVisualize(false));
            }
        }, delay);

    }

    return (
    <div className="container">
        <div className="grid"
             onMouseLeave={() => mouseStopGridHover()}>
            {   
                boardManager && 
                board.map((row, rowIndex) => (
                    <>
                    {
                        row.map((col, colIndex) => (
                            <div key={board[rowIndex][colIndex].id} 
                                 className={board[rowIndex][colIndex].getState()}
                                 onMouseUp={() => boardManager.toggleWall(rowIndex, colIndex)}
                                 onMouseDown={(e) => onMouseDownOnGrid(e, rowIndex, colIndex)}
                                 onMouseUp={() => mouseStopGridHover()}
                                 onMouseEnter={() => onSquareHover(rowIndex, colIndex)}
                                 onClick={() => onMouseClick(rowIndex, colIndex)}/>
                        ))
                    }
                    </>
                ))
            }
        </div>
    </div>
    );
}

export default Grid;