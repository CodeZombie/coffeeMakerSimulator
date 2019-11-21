class CoffeeGroundContainer extends Reservoir {
    constructor(maxAmount) {
        super(maxAmount);
        this.filterAdded = false
        this.coffeeBrewContainer = new Reservoir(50)
        this.slowCounter = 0
    }

    step(){
        super.step()
        this.slowCounter++
        if(this.slowCounter>2){
            if(this.canDispense()){
                this.coffeeBrewContainer.dispense(1)
            }
            this.slowCounter=0;
        }

    }

    canDispense(){
        if(this.levelSensor.level() == 0){
            return false
        }
        if(!this.attachedTo.onBurner){
            return false
        }
        return super.canDispense()
    }

    add(amount){
        if(this.filterAdded == false){
            return {type:"error", text:"Cannot add coffee grounds without a filter inserted."}
        }
        return super.add(amount)
    }

    addFilter() {
        if(this.filterAdded == false){
            this.filterAdded = true
        }else{
            return {type:"error", text:"Cannot add coffee filter. One is already inserted."}
        }
    }

    removeFilter() {
        if(this.filterAdded == false){
            return {type:"error", text:"Cannot remove coffee filter. None has been inserted."}
        }
        this.filterAdded = false
        this.empty()
    }
    
    reset() {
        this.removeFilter();
    }
}