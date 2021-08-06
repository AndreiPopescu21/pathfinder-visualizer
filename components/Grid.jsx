import { useState, useEffect } from "react";

import BoardManager from "../lib/BoardManager";

const Grid = () => {
    const [isMouseDownOnGrid, setIsMouseDownOnGrid] = useState(false);
    const [isStartSquareDragged, setIsStartSquareDragged] = useState(false);
    const [isFinishSquareDragged, setIsFinishSquareDragged] = useState(false);

    const [board, setBoard] = useState([]);
    const boardManager = new BoardManager(setBoard);

    useEffect(() => {
        boardManager.initBoard();
    }, []);

    useEffect(() => {
        console.log(BoardManager.startRow);
    }, [board])

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
        setIsMouseDownOnGrid(true);

        if(board[rowIndex][colIndex].getState()=="start")
            setIsStartSquareDragged(true);
        else if(board[rowIndex][colIndex].getState()=="finish")
            setIsFinishSquareDragged(true);
        console.log("x")
    }

    const mouseStopGridHover = () => {
        setIsMouseDownOnGrid(false);
        setIsStartSquareDragged(false);
        setIsFinishSquareDragged(false);
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
                                 onClick={() => boardManager.toggleWall(rowIndex, colIndex)}
                                 >
                            </div>
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