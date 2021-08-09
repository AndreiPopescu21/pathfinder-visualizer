import BoardManager from "../BoardManager";
import Square from "../Square";

export default class DFS {
    constructor(boardManager) {
        this.boardManager = boardManager; 
        const startSquare = BoardManager.board[BoardManager.startRow][BoardManager.startCol];
        this.queue = [startSquare];
        this.path = [];
    }

    getValidSquareNeighbours = (rowIndex, colIndex, lastSquare) => {
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

    step = () => {
        const lastVisitedSquare = this.queue.pop();
        if(lastVisitedSquare.getState() == Square.FINISH) 
            return true;

        const lastVisitedSquareRowIndex = BoardManager.getSquarePosition(lastVisitedSquare)[0];
        const lastVisitedSquareColIndex = BoardManager.getSquarePosition(lastVisitedSquare)[1];

        const neighbours = this.getValidSquareNeighbours(lastVisitedSquareRowIndex, lastVisitedSquareColIndex, lastVisitedSquare);

        neighbours.forEach((neighbour) => {
            const neighbourPosition = BoardManager.getSquarePosition(neighbour);
            BoardManager.setLastVisitedSquare(neighbourPosition[0], neighbourPosition[1], lastVisitedSquare);
            this.boardManager.setVisited(neighbourPosition[0], neighbourPosition[1]);
            this.queue.unshift(neighbour);
        });

        if(this.queue.length <= 0)
            return true;
        return false;
    }

    getPath = () => {
        var pathSquare = BoardManager.board[BoardManager.finishRow][BoardManager.finishCol];
        console.log(pathSquare)
        while(pathSquare) {
            this.path.push(pathSquare);
            pathSquare = pathSquare.getLastVisitedSquare();
        }

        return this.path;
    }

}