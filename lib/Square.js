export default class Square {
    static EMPTY = "empty";
    static VISITED = "visited";
    static WALL = "wall";
    static PATH = "path";
    static START = "start";
    static FINISH = "finish";

    static UUID = 0;

    constructor() {
        this.lastState = Square.EMPTY;
        this.state = Square.EMPTY;
        this.id = Square.UUID;
        this.lastVisitedSquare = null;
        this.distance = 0;
        this.weight = 1;
        Square.UUID += 1;
    }

    setState(state) {
        this.lastState = this.state;
        this.state = state;
    }

    getState() {
        return this.state;
    }

    getLastState() {
        return this.lastState;
    }

    isNavigable() {
        return this.state != Square.WALL;
    }

    isVisited() {
        return this.state == Square.VISITED;
    }

    setLastVisitedSquare(square) {
        this.lastVisitedSquare = square;
    }

    getLastVisitedSquare() {
        return this.lastVisitedSquare;
    }

    setDistance(distance) {
        this.distance = distance;
    }

    getDistance() {
        return this.distance;
    }

    setWeight(weight) {
        this.weight = weight;
    }

    getWeight() {
        return this.weight;
    }
}