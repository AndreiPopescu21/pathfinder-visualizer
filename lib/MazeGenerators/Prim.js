import BoardManager from "../BoardManager";

export default class Prim {
    constructor(boardManager) {
        this.boardManager = boardManager;
        
        const startSquare = BoardManager.board[BoardManager.startRow][BoardManager.startCol];
        this.list = [ startSquare ];
    }

    popRandomElement = () => {
        if(this.list.length <= 0)
            return;

        const randomElement = this.list[Math.floor(Math.random() * this.list.length)];
        
        this.list = this.list.filter((element) => element != randomElement);

        return randomElement;
    }

    step = () => {
        if(this.list.length <= 0)
            return true;
        
        const currentSquare = this.popRandomElement();

        const currentSquareRowIndex = BoardManager.getSquarePosition(currentSquare)[0];
        const currentSquareColIndex = BoardManager.getSquarePosition(currentSquare)[1];

        BoardManager.board[currentSquareRowIndex][currentSquareColIndex].setGenerationVisited(true);
        const neighbours = BoardManager.getValidSquareNeighbours(currentSquareRowIndex, currentSquareColIndex);

        const randomNeighbour = neighbours[Math.floor(Math.random() * neighbours.length)];
        neighbours.forEach((neighbour) => {
            if(neighbour != randomNeighbour)
                this.list.push(neighbour);
        });

        if(randomNeighbour) {
            const randomNeighbourPosition = BoardManager.getSquarePosition(randomNeighbour);
            this.boardManager.toggleWall(randomNeighbourPosition[0], randomNeighbourPosition[1]);
        }

        return false;
    }

}