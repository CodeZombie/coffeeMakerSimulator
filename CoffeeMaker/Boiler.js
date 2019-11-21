/* The Boiler Class.
Holds water in an internal reservoir.
Boils the water and sends it out through any generic function passed to it.
*/

class Boiler {
    constructor(dripApparatus) {
        this.heatingElement = new HeatingElement(120) //120 is a good temperature to boil the water at.
        this.waterReservoir = new Reservoir(750)
        this.dripApparatus = dripApparatus
    }

    step(coffeeGroundContainer) {
        this.heatingElement.step()
        if(this.heatingElement.temperature >= 100){ //if the heating element is at boiling temp...
            if(coffeeGroundContainer.canDrip()){
                coffeeGroundContainer.recieveWater(1)
                this.waterReservoir.add(1)
            }
        }
        if(this.waterReservoir.levelSensor.level() == 0){
            this.heatingElement.turnOff();
        }
    }

    start() {
        if(this.waterReservoir.levelSensor.level() > 0) {
            this.heatingElement.turnOn()
        }else{
            return {type: "error", text: "Boiler cannot start boiling. No water in reservoir." }
        }
    }

    stop() {
        this.heatingElement.turnOff()
    }

    isOn() {
        return this.heatingElement.on
    }

    reset() {
        this.heatingElement.reset()
        this.waterReservoir.reset()
    }
}