import BoardManager from "../BoardManager";

export default class DFS_Maze {
    constructor(boardManager) {
        this.boardManager = boardManager;
        
        const startSquare = BoardManager.board[BoardManager.startRow][BoardManager.startCol];
        this.list = [ startSquare ];
    }

    step = () => {
        if(this.list.length <= 0)
            return true;

        const currentSquare = this.list.pop();

        const currentSquareRowIndex = BoardManager.getSquarePosition(currentSquare)[0];
        const currentSquareColIndex = BoardManager.getSquarePosition(currentSquare)[1];

        BoardManager.board[currentSquareRowIndex][currentSquareColIndex].setGenerationVisited(true);
        const neighbours = BoardManager.getValidSquareNeighbours(currentSquareRowIndex, currentSquareColIndex);

        const randomNeighbour = neighbours[Math.floor(Math.random() * neighbours.length)];
        neighbours.forEach((neighbour) => {

            if(neighbour != randomNeighbour){
                const neighbourPositon = BoardManager.getSquarePosition(neighbour);
                this.boardManager.toggleWall(neighbourPositon[0], neighbourPositon[1]);
                this.list.push(neighbour);
            }
        });

        if(neighbours.length > 0)
            this.list.push(randomNeighbour);
        
        return false;
    }

}