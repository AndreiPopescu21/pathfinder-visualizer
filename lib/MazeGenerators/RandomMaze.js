import BoardManager from "../BoardManager";

export default class RandomMaze {
    static steps = 200;

    constructor(boardManager) {
        this.boardManager = boardManager; 
        this.currentSteps = 0;
    }

    step = () => {
        this.currentSteps += 1;
        if(this.currentSteps > RandomMaze.steps)
            return true;
        
        const rowIndex = Math.floor(Math.random() * BoardManager.rows);
        const colIndex = Math.floor(Math.random() * BoardManager.cols);
        this.boardManager.toggleWall(rowIndex, colIndex);

        return false;
    }

}