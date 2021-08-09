import BoardManager from "../BoardManager";
import Square from "../Square";

export default class DFS {
    constructor(boardManager) {
        this.boardManager = boardManager; 
        this.path = [BoardManager.board[BoardManager.startRow][BoardManager.startCol]];
        boardManager.setVisited(BoardManager.startRow, BoardManager.startCol);
    }

    step = () => {
        const lastVisitedSquare = this.path[this.path.length-1];
        const lastVisitedSquareRowIndex = BoardManager.getSquarePosition(lastVisitedSquare)[0];
        const lastVisitedSquareColIndex = BoardManager.getSquarePosition(lastVisitedSquare)[1];
        
        this.boardManager.setVisited(lastVisitedSquareRowIndex, lastVisitedSquareColIndex);

        if(BoardManager.checkValidMoveSquare(lastVisitedSquareRowIndex-1, lastVisitedSquareColIndex)) 
            this.path.push(BoardManager.board[lastVisitedSquareRowIndex-1][lastVisitedSquareColIndex]);
        else if(BoardManager.checkValidMoveSquare(lastVisitedSquareRowIndex+1, lastVisitedSquareColIndex))
            this.path.push(BoardManager.board[lastVisitedSquareRowIndex+1][lastVisitedSquareColIndex]);
        else if(BoardManager.checkValidMoveSquare(lastVisitedSquareRowIndex, lastVisitedSquareColIndex+1))
            this.path.push(BoardManager.board[lastVisitedSquareRowIndex][lastVisitedSquareColIndex+1]);
        else if(BoardManager.checkValidMoveSquare(lastVisitedSquareRowIndex, lastVisitedSquareColIndex-1))
            this.path.push(BoardManager.board[lastVisitedSquareRowIndex][lastVisitedSquareColIndex-1]);
        else
            this.path.pop();
        
        if(this.path.length <= 0)
            return true;
        
        const lastPathSquare = this.path[this.path.length-1];
        if(lastPathSquare.getState() == Square.FINISH)
            return true;
        
        return false;
    }

    getPath = () => {
        return this.path;
    }

}