class CondimentContainer {
    constructor(type, maxAmount){
        this.type = type
        this.amount = 0
        this.maxAmount = maxAmount
    }

    dispense(amount){
        if(this.amount - amount >= 0){
            this.amount -= amount
        }else{
            return {type: "error", text: "Cannot dispense " + amount + "ml of " + this.type + ". Not enough " + this.type + " in container."}
        }
    }

    add(amount){
        if(this.amount + amount > this.maxAmount){
            return {type: "error", text: "Cannot add that much " + this.type + ". Container too full."}
        }else{
            this.amount += amount
        }
    }

    reset() {
        this.amount = 0
    }
}