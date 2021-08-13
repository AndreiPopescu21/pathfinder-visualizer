import BoardManager from "../BoardManager";
import Square from "../Square";

export default class AStar {
    constructor(boardManager) {
        this.boardManager = boardManager; 
        this.path = [];

        const startSquare = BoardManager.board[BoardManager.startRow][BoardManager.startCol];
        this.list = [ [startSquare, 0] ];

        BoardManager.initDistances();
    }

    popSmallestCostElement = () => {
        if(this.list.length <= 0)
            return;

        var min = this.list[0];

        this.list.forEach((element) => {
            if(element[1] < min[1])
                min = element;
        });
        
        this.list = this.list.filter((element) => element != min);

        return min;
    }

    getListSquareIndex = (square) => {
        this.list.forEach((element, index) => { 
            if(element[0].id == square.id) 
                return index;
        });

        return -1;
    }

    step = () => {
        const currentSquare = this.popSmallestCostElement()[0];
        
        const currentSquareRowIndex = BoardManager.getSquarePosition(currentSquare)[0];
        const currentSquareColIndex = BoardManager.getSquarePosition(currentSquare)[1];
        
        this.boardManager.setVisited(currentSquareRowIndex, currentSquareColIndex);
        const neighbours = BoardManager.getValidSquareNeighbours(currentSquareRowIndex, currentSquareColIndex);
    
        neighbours.forEach((neighbour) => {
            const minRootDistance = Math.min(neighbour.getRootDistance(), 
                    currentSquare.getRootDistance() + neighbour.getWeight());
            neighbour.setRootDistance(minRootDistance);
            const minDistance = Math.min(neighbour.getDistance(), 
                    neighbour.getRootDistance() + neighbour.getManhattenDistance());

            if(minDistance < neighbour.getDistance()) {
                neighbour.setLastVisitedSquare(currentSquare);
                neighbour.setDistance(minDistance);

                const neighbourListIndex = this.getListSquareIndex(neighbour); 
                if(neighbourListIndex != -1) {
                    this.list[neighbourListIndex][1] = minDistance;
                }
            }

            const neighbourListIndex = this.getListSquareIndex(neighbour);
            this.list.push([ neighbour, neighbour.getDistance() ]);
        });

        if(this.list.length <= 0)
            return true;       
        if(currentSquare.getState() == Square.FINISH)
            return true; 
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