import Square from "./Square";

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
        if(path.length <= 0)
            return;

        path.shift();
        path.pop();

        var new_board = BoardManager.board;

        path.forEach((square, index) => {
            setTimeout(() => {
                const position = BoardManager.getSquarePosition(square);
                new_board[position[0]][position[1]].setState(Square.PATH);
                BoardManager.board = new_board;
                this.setBoard([...BoardManager.board]);
            }, 50*index);
        });

        setTimeout(() => {
            callback();
        }, 50*path.length);
    }

    setStart(rowIndex, colIndex) {
        const lastState = BoardManager.board[BoardManager.startRow][BoardManager.startCol].getLastState();
        BoardManager.board[BoardManager.startRow][BoardManager.startCol].setState(lastState);

        BoardManager.startCol = colIndex;
        BoardManager.startRow = rowIndex;

        BoardManager.board[rowIndex][colIndex].setState(Square.START);

        this.setBoard([...BoardManager.board]);
    }

    setFinish(rowIndex, colIndex) {
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

}