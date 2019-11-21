class Reservoir {
    constructor(maxAmount) {
        this.levelSensor = new LevelSensor(this);
        this.amount = 0;
        this.maxAmount = maxAmount;
        this.heatingElement = null //optional heating element.
        this.attachedTo = null //the other reservoir that this one will drip into.
    }

    attachHeatingElement(heatingElement){
        this.heatingElement = heatingElement
    }

    attachTo(reservoir){
        this.attachedTo = reservoir
    }
    
    step() {
        if(this.heatingElement){
            this.heatingElement.step()
            if(this.heatingElement.temperature >= 100){
                if(this.canDispense()){ 
                    this.dispense(1)
                }
            }   
            if(this.levelSensor.level() == 0){
                this.heatingElement.turnOff()
            }
        }
    }

    canDispense(){
        if(this.attachedTo){ //if there is somewhere to dispense to...
            if(!this.attachedTo.levelSensor.isFull()){ //if there is space in the recepticle reservoir
                return true
            }
        }
        return false
    }

    dispense(amount){
        if(this.attachedTo){
            if(this.amount >= amount) {
                var error = this.attachedTo.add(amount)
                if(error){
                    return error
                }
            }
            error = this.remove(amount)
            if(error) { return error; }
        }
    }

    add(amount){
        //if there is free space...
        if(this.levelSensor.freeSpace() > 0){ 
            this.amount += amount

            //if it has overflowed...
            if(this.levelSensor.freeSpace() < 0){ 
                this.amount = this.maxAmount
            }
        }else{
            return {type: "error", text: "Cannot add any more. Not enough room in reservoir." }
        }
    }

    remove(amount){
        if(this.amount > 0){
            this.amount -= amount
            if(this.amount < 0){
                this.amount = 0
            }
        }else{
            return {type: "error", text: "Cannot dispense. Reservoir is empty."}
        }
    }

    empty(){
        this.amount = 0;
    }

    turnOnHeatingElement(){
        if(this.heatingElement){
            if(this.levelSensor.level() > 0){
                return this.heatingElement.turnOn();
            }else{
                return {type: "error", text: "Cannot turn on heating element. Reservoir is empty."}
            }
        }
    }

    reset() {
        this.amount = 0
    }
}