import Square from "./Square";

import DFS from "../lib/Algorithms/DFS";
import BFS from "../lib/Algorithms/BFS";
import Dijkstra from "../lib/Algorithms/Dijkstra";
import AStar from "../lib/Algorithms/AStar";

import RandomMaze from "./MazeGenerators/RandomMaze";
import DFS_Maze from "./MazeGenerators/DFS_Maze";
import Prim from "./MazeGenerators/Prim";

export default class BoardManager {
    static rows = 20;
    static cols = 40;
    static board = [];
    static startRow = 5;
    static startCol = 5;
    static finishCol = 35;
    static finishRow = 15;

    constructor(setBoard) {
        this.setBoard = setBoard;
    }

    initBoard = () => {
        var new_board = [];
        Square.UUID = 0;

        for(var i=0; i<BoardManager.rows; i++){
            new_board.push([]);
            for(var j=0; j<BoardManager.cols; j++){
                new_board[i].push(new Square());        
            }
        }

        BoardManager.board = new_board;
        this.setBoard([...BoardManager.board]);

        this.setStart(BoardManager.startRow, BoardManager.startCol);
        this.setFinish(BoardManager.finishRow, BoardManager.finishCol);
    }

    clearBoard = () => {
        this.initBoard();
        this.setStart(5, 5);
        this.setFinish(15, 35);
    }

    clearByState = (state) => {
        for(var i=0; i<BoardManager.rows; i++)
            for(var j=0; j<BoardManager.cols; j++){
                if(BoardManager.board[i][j].getState() == state)
                    BoardManager.board[i][j].setState(Square.EMPTY);
            }
        this.setBoard(BoardManager.board);
    }

    toggleWall = (rowIndex, colIndex) => {
        var new_board = BoardManager.board;

        if(new_board[rowIndex][colIndex].getState() == Square.START || 
            new_board[rowIndex][colIndex].getState() == Square.FINISH)
            return;
        
        const lastState = BoardManager.board[rowIndex][colIndex].getLastState();

        if(new_board[rowIndex][colIndex].getState() == Square.WALL)
            new_board[rowIndex][colIndex].setState(lastState);
        else
            new_board[rowIndex][colIndex].setState(Square.WALL);

        BoardManager.board = new_board;
        this.setBoard([...BoardManager.board]);
    }

    setVisited = (rowIndex, colIndex) => {
        var new_board = BoardManager.board;

        if(new_board[rowIndex][colIndex].getState() == Square.START || 
            new_board[rowIndex][colIndex].getState() == Square.FINISH)
            return;
        
        new_board[rowIndex][colIndex].setState(Square.VISITED);

        BoardManager.board = new_board;
        this.setBoard([...BoardManager.board]);
    }

    setPath = (path, callback) => {
        if(path.length <= 0) {
            callback();
            return;
        }

        path.shift();
        path.pop();

        var new_board = BoardManager.board;
        const delay = 10;

        path.forEach((square, index) => {
            setTimeout(() => {
                const position = BoardManager.getSquarePosition(square);
                new_board[position[0]][position[1]].setState(Square.PATH);
                BoardManager.board = new_board;
                this.setBoard([...BoardManager.board]);
            }, delay*index);
        });

        setTimeout(() => {
            callback();
        }, delay*path.length);
    }

    static clearLastVisitedSquare() {
        for(var i=0; i<BoardManager.rows; i++)
            for(var j=0; j<BoardManager.cols; j++) {
                BoardManager.setLastVisitedSquare(i, j, null);
                BoardManager.board[i][j].setGenerationVisited(false);
            }
    }

    static clearGenerationVisits() {
        for(var i=0; i<BoardManager.rows; i++)
            for(var j=0; j<BoardManager.cols; j++) 
                BoardManager.board[i][j].setGenerationVisited(false);
    }

    setStart(rowIndex, colIndex) {
        const currentState = BoardManager.board[rowIndex][colIndex].getState();

        if(currentState == Square.START || currentState == Square.FINISH)
            return;

        const lastState = BoardManager.board[BoardManager.startRow][BoardManager.startCol].getLastState();
        BoardManager.board[BoardManager.startRow][BoardManager.startCol].setState(lastState);

        BoardManager.startCol = colIndex;
        BoardManager.startRow = rowIndex;

        BoardManager.board[rowIndex][colIndex].setState(Square.START);

        this.setBoard([...BoardManager.board]);
    }

    setFinish(rowIndex, colIndex) {
        const currentState = BoardManager.board[rowIndex][colIndex].getState();
        
        if(currentState == Square.START || currentState == Square.FINISH)
            return;

        const lastState = BoardManager.board[BoardManager.finishRow][BoardManager.finishCol].getLastState();
        BoardManager.board[BoardManager.finishRow][BoardManager.finishCol].setState(lastState);

        BoardManager.finishCol = colIndex;
        BoardManager.finishRow = rowIndex;

        BoardManager.board[rowIndex][colIndex].setState(Square.FINISH);

        this.setBoard([...BoardManager.board]);
    }

    static getSquarePosition = (square) => {
        for(var i=0; i<BoardManager.rows; i++)
            for(var j=0; j<BoardManager.cols; j++)
                if(BoardManager.board[i][j] == square)
                    return [i, j];
        return [-1, -1];
    }

    static checkValidMoveSquare = (rowIndex, colIndex) => {
        if(rowIndex < BoardManager.rows && colIndex < BoardManager.cols && 
            rowIndex >= 0 && colIndex >= 0 &&
            BoardManager.board[rowIndex][colIndex].isGenerationVisited() == false &&
            BoardManager.board[rowIndex][colIndex].getState() != Square.WALL &&
            BoardManager.board[rowIndex][colIndex].getState() != Square.VISITED &&
            BoardManager.board[rowIndex][colIndex].getState() != Square.START) 
            return true;
        
        return false;
    }

    static setLastVisitedSquare = (rowIndex, colIndex, square) => {
        BoardManager.board[rowIndex][colIndex].setLastVisitedSquare(square);
    }

    static getValidSquareNeighbours = (rowIndex, colIndex) => {
        var neighbours = [];

        if(BoardManager.checkValidMoveSquare(rowIndex-1, colIndex)) 
            neighbours.push(BoardManager.board[rowIndex-1][colIndex]);
        if(BoardManager.checkValidMoveSquare(rowIndex+1, colIndex))
            neighbours.push(BoardManager.board[rowIndex+1][colIndex]);
        if(BoardManager.checkValidMoveSquare(rowIndex, colIndex+1))
            neighbours.push(BoardManager.board[rowIndex][colIndex+1]);
        if(BoardManager.checkValidMoveSquare(rowIndex, colIndex-1))
            neighbours.push(BoardManager.board[rowIndex][colIndex-1]);
        
        return neighbours;
    }

    static calculateManhattenDistance = (square) => {
        const squarePosition = BoardManager.getSquarePosition(square);
        return 10*Math.abs(BoardManager.finishRow - squarePosition[0]) + 
                Math.abs(BoardManager.finishCol - squarePosition[1]);
    }

    static initDistances = () => {
        for(var i=0; i<BoardManager.rows; i++)
            for(var j=0; j<BoardManager.cols; j++) {
                BoardManager.board[i][j].setDistance(Number.POSITIVE_INFINITY);
                BoardManager.board[i][j].setRootDistance(Number.POSITIVE_INFINITY);
                const manhattenDistance = BoardManager.calculateManhattenDistance(BoardManager.board[i][j]);
                BoardManager.board[i][j].setManhattenDistance(manhattenDistance);
            }
        BoardManager.board[BoardManager.startRow][BoardManager.startCol].setRootDistance(0);
    }

    visualizeAlgorithm = (selectedAlgorithm, delay, setVisualize) => {
        this.clearByState("path");
        this.clearByState("visited"); 
        BoardManager.clearLastVisitedSquare();

        var algorithm;
        switch(selectedAlgorithm) {
            case "DFS":
                algorithm = new DFS(this);
                break;
            case "BFS":
                algorithm = new BFS(this);
                break;
            case "Dijkstra":
                algorithm = new Dijkstra(this);
                break;
            case "A*":
                algorithm = new AStar(this);
                break;
            default:
                algorithm = new DFS(this);
                break;
        }

        var timer = setInterval(() => {
            if(algorithm.step()){
                clearInterval(timer);
                this.setPath(algorithm.getPath(), () => setVisualize(false));
            }
        }, delay);
    }

    generateMaze = (mazeGeneratingTehnique, setIsMazeGenerating, setMazeGeneratingTehniques) => {
        BoardManager.clearGenerationVisits();
        this.clearByState("path");
        this.clearByState("visited"); 
        this.clearByState("wall"); 
        BoardManager.clearLastVisitedSquare();

        var algorithm;
        const delay = 10;

        switch(mazeGeneratingTehnique) {
            case "Random":
                algorithm = new RandomMaze(this);
                break;
            case "DFS":
                algorithm = new DFS_Maze(this);
                break;
            case "Prim's Algorithm":
                algorithm = new Prim(this);
                break;
            default:
                break;
        }

        if(!algorithm)
            return;

        var timer = setInterval(() => {
            if(algorithm.step()){
                clearInterval(timer);
                setIsMazeGenerating(false);
            }
        }, delay);
        setMazeGeneratingTehniques(false);
    }
}