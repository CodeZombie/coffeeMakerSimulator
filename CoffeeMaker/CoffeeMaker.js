/*
The Coffee Maker class.
This class will contain all the other components that the coffee maker consists of.
    HOW IT WORKS:
        The user places all the ingredients in the machine, then presses the Brew button.
        The boiler will turn on the heating element which will bring the water up to a boiling temperature.
        The boiler will push the water into the CoffeeGroundContainer, which will convert the water into coffee,
            and drip into the carafe.
        Once there is liquid in the Carafe, the heating plate will turn on and try to keep the coffee
            at a set temperature.
        The user can then dispense milk, cream, or sugar into the carafe.
*/

class CoffeeMaker {
    constructor() {
        this.brewButton = new Button(() => {
            if(this.isBrewing()){
                return {type: "error", text: "Cannot start brewing: Brew already in progress."}
            }
            if(this.coffeeGroundContainer.amount == 0){
                return {type: "error", text: "Cannot start brewing: No coffee grounds inserted."}
            }
            var boilerError = this.boiler.start()
            if(boilerError) {return boilerError }
        })
        this.indicatorLight = new LED();
        this.boiler = new Boiler()
        this.milkContainer = new CondimentContainer("milk", 50)
        this.sugarContainer = new CondimentContainer("sugar", 25)
        this.creamContainer = new CondimentContainer("cream", 50)
        this.carafe = new Carafe();
        this.carafeBurner = new HeatingElement(55) //55 degrees C is a good drinking temperature.
        this.coffeeGroundContainer = new CoffeeGroundContainer(this.carafe)
    }

    step() {
        //step for all components.
        if(this.isBrewing()){
            this.indicatorLight.turnOn();
        }else{
            this.indicatorLight.turnOff();
        }
        if(!this.coffeeGroundContainer.canDrip()){
           this.boiler.stop();
        }
        this.boiler.step(this.coffeeGroundContainer)
        this.carafeBurner.step()

        if(this.carafe.onBurner && this.carafe.getTotalLiquid() > 0){
            this.carafeBurner.turnOn();
        }else{
            this.carafeBurner.turnOff();
        }

        if(this.carafe.onBurner){
            if(this.carafe.temperature > this.carafeBurner.temperature){
                this.carafe.temperature--
            }else if(this.carafe.temperature < this.carafeBurner.temperature){
                this.carafe.temperature++
            }
        }
    }

    reset() {
        this.indicatorLight.reset()
        this.boiler.reset()
        this.milkContainer.reset()
        this.sugarContainer.reset()
        this.creamContainer.reset()
        this.carafe.reset()
        this.carafeBurner.reset()
        this.coffeeGroundContainer.reset()
    }

    stopBrewing() {
        if(!this.isBrewing()){
            return {type: "error", text: "Cannot cancel brewing: No brew in progress.."}
        }
        var boilerError = this.boiler.stop();
        if(boilerError) {return boilerError }
    }

    addWater(amount) {
        return this.boiler.addWater(amount);
    }

    isBrewing() {
        return this.boiler.isOn()
    }

    pourMilk(amount) {
        //if theres enough room
        if(this.carafe.getFreeSpace() < amount){
            return {type: "error", text: "Cannot dispense " + amount + "ml of milk. Not enough space in carafe"}
        }
        var dispenseMessage = this.milkContainer.dispense(amount)
        if(dispenseMessage){ return dispenseMessage }
        var pourMessage = this.carafe.addCondiment(amount)
        if(pourMessage) {return pourMessage}
    }

    pourSugar(amount) {
        //if theres enough room
        if(this.carafe.getFreeSpace() < amount){
            return {type: "error", text: "Cannot dispense " + amount + "ml of sugar. Not enough space in carafe"}
        }
        var dispenseMessage = this.sugarContainer.dispense(amount)
        if(dispenseMessage){ return dispenseMessage }
        var pourMessage = this.carafe.addCondiment(amount)
        if(pourMessage) {return pourMessage}
    }

    pourCream(amount) {
        //if theres enough room
        if(this.carafe.getFreeSpace() < amount){
            return {type: "error", text: "Cannot dispense " + amount + "ml of cream. Not enough space in carafe"}
        }
        var dispenseMessage = this.creamContainer.dispense(amount)
        if(dispenseMessage){ return dispenseMessage }
        var pourMessage = this.carafe.addCondiment(amount)
        if(pourMessage) {return pourMessage}
    }
  }