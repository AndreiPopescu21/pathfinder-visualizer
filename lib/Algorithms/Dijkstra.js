import BoardManager from "../BoardManager";
import Square from "../Square";

export default class Dijkstra {

    constructor(boardManager) {
        this.boardManager = boardManager; 
        this.path = [];

        const startNode = BoardManager.board[BoardManager.startRow][BoardManager.startCol];
        this.queue = [ startNode ];

        // Set the initial distances to each square.
        for(var i=0; i<BoardManager.rows; i++)
            for(var j=0; j<BoardManager.cols; j++)
                BoardManager.board[i][j].setDistance(Number.POSITIVE_INFINITY);
        BoardManager.board[BoardManager.startRow][BoardManager.startCol].setDistance(0);
    }

    popSmallestDistanceElement = () => {
        if(this.queue.length <= 0)
            return;

        var min = this.queue[0];

        this.queue.forEach((element) => {
            if(element.distance < min.distance)
                min = element;
        });
        
        this.queue = this.queue.filter((element) => element != min);

        return min;
    }

    step = () => {
        const currentSquare = this.popSmallestDistanceElement();
        
        const currentSquareRowIndex = BoardManager.getSquarePosition(currentSquare)[0];
        const currentSquareColIndex = BoardManager.getSquarePosition(currentSquare)[1];
        
        this.boardManager.setVisited(currentSquareRowIndex, currentSquareColIndex);
        const neighbours = BoardManager.getValidSquareNeighbours(currentSquareRowIndex, currentSquareColIndex);
        
        neighbours.forEach((neighbour) => {
            const neighbourPosition = BoardManager.getSquarePosition(neighbour);
            
            const minDistance = Math.min(neighbour.getDistance(), currentSquare.getDistance() + neighbour.getWeight());
            if(neighbour.getDistance() != minDistance) {
                BoardManager.board[neighbourPosition[0]][neighbourPosition[1]].setDistance(minDistance);
                BoardManager.board[neighbourPosition[0]][neighbourPosition[1]].setLastVisitedSquare(currentSquare);
            }
            
            if(!this.queue.includes(neighbour))
                this.queue.push(neighbour);
        });

        if(this.queue.length <= 0)
            return true;

        if(currentSquare.getState() == Square.FINISH)
            return true;    

        return false;
    }

    getPath = () => {
        var pathSquare = BoardManager.board[BoardManager.finishRow][BoardManager.finishCol];
        
        while(pathSquare) {
            this.path.push(pathSquare);
            pathSquare = pathSquare.getLastVisitedSquare();
        }

        return this.path.reverse();
    }

}