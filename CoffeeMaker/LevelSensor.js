class LevelSensor {
    constructor(reservoir){
        this.reservoir = reservoir;
    }

    level() {
        return this.reservoir.amount
    }

    freeSpace() {
        return this.reservoir.maxAmount - this.reservoir.amount 
    }

    isFull(){
        if(this.reservoir.amount >= this.reservoir.maxAmount){
            return true;
        }
        return false;
    }

    isEmpty() {
        if(this.reservoir.amount > 0){
            return true;
        }
        return false;
    }
}