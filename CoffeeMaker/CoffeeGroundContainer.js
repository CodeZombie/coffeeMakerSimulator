class CoffeeGroundContainer {
    constructor(carafe) {
        this.amount = 0
        this.maxAmount = 50
        this.filterAdded = false
        this.carafe = carafe
    }

    canDrip(){
        return this.carafe.onBurner && !this.carafe.isFull() && this.amount > 0
    }

    recieveWater(amount){
        this.carafe.addCoffee(amount)
    }

    addFilter() {
        if(this.filterAdded == false){
            this.filterAdded = true
        }else{
            return {type:"error", text:"Cannot add coffee filter. One is already inserted."}
        }
    }

    addGrounds(amount){
        if(this.filterAdded == false){
            return {type:"error", text:"Cannot add coffee grounds without a filter inserted."}
        }
        if(this.amount + amount > this.maxAmount){
            return {type:"error", text:"Cannot add that many coffee grounds. Container is too full."}
        }else{
            this.amount += amount
        }
    }

    removeFilter() {
        if(this.filterAdded == false){
            return {type:"error", text:"Cannot remove coffee filter. None has been inserted."}
        }
        this.filterAdded = false
        this.amount = 0
    }
}