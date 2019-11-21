class Carafe extends Reservoir {
    constructor(maxAmount) {
        super(maxAmount)
        this.onBurner = true
    }

    step(){
        super.step()
        if(this.onBurner && this.levelSensor.level() > 0){
            this.turnOnHeatingElement()
        }else{
            this.heatingElement.turnOff();
        }
    }

    takeOffBurner() {
        this.onBurner = false
    }

    putOnBurner(){
        this.onBurner = true
    }
}