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

}