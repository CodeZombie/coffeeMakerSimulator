class Carafe {
    constructor() {
        this.coffee = 0
        this.condiments = 0
        this.maxAmount = 300
        this.onBurner = true
        this.temperature = 0;
    }

    step() {
        if(!this.onBurner){
            this.temperature--
            if(this.temperature < 0){
                this.temperature = 0
            }
        }else{

        }
    }

    getFreeSpace(){
        return this.maxAmount - this.getTotalLiquid() 
    }

    isFull(){
        return (this.getTotalLiquid() >= this.maxAmount)
    }

    getTotalLiquid(){
        return this.coffee + this.condiments
    }

    addCoffee(amount){
        if(this.getTotalLiquid() + amount <= this.maxAmount){
            this.coffee += amount
        }else{
            return -1 //tell the caller that the liquid could not be added.
        }
    }

    addCondiment(amount){
        if(this.getTotalLiquid() + amount <= this.maxAmount){
            this.condiments += amount
        }else{
            return -1 //tell the caller that the liquid could not be added.
        }
    }

    removeLiquid(amount){
        if(this.getTotalLiquid() == 0){
            return {type: "error", text: "There's no coffee in the carafe :("}
        }
        var amountToRemove = amount / this.getTotalLiquid()
        var coffeeToRemove = Math.floor(this.coffee * amountToRemove)
        var condimentsToRemove = Math.floor(this.condiments * amountToRemove)
        
        this.coffee -= coffeeToRemove
        this.condiments -= condimentsToRemove
        if(this.coffee < 0){
            this.coffee = 0
        }
        if(this.condiments <0){
            this.condiments = 0
        }

    }
}