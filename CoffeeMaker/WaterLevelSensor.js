class WaterLevelSensor {
    constructor(waterReservoir){
        this.waterReservoir = waterReservoir;
    }

    waterLevel() {
        return this.waterReservoir.waterLevel
    }

    freeSpace() {
        return this.waterReservoir.maxWaterLevel - this.waterReservoir.waterLevel 
    }

    isFull(){
        if(this.waterReservoir.waterLevel >= this.waterReservoir.maxWaterLevel){
            return true;
        }
        return false;
    }

    isEmpty() {
        if(this.waterReservoir.waterLevel > 0){
            return true;
        }
        return false;
    }
}