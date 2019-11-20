class WaterReservoir {
    constructor() {
        this.waterLevelSensor = new WaterLevelSensor(this);
        this.waterLevel = 0;
        this.maxWaterLevel = 750;
    }

    addWater(amount){
        if(amount <= this.waterLevelSensor.freeSpace()){ 
            this.waterLevel += amount
        }else{
            return {type: "error", text: "Reservoir cannot hold that much water." }
        }
    }

    removeWater(amount){
        this.waterLevel -= amount
        if(this.waterLevel < 0){
            this.waterLevel = 0
        }
    }

}