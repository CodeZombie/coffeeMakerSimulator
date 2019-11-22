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
        //Brew button.
        this.brewButton = new Button(() => {
            return this.turnOn()
        })

        this.burnerLight = new LED();
        this.boilerLight = new LED();

        //Carafe
        this.carafe = new Carafe(300)
        this.carafe.attachHeatingElement(new HeatingElement(55))

        //Coffee Ground Container. Pours into Carafe
        this.coffeeGroundContainer = new CoffeeGroundContainer(50)
        this.coffeeGroundContainer.attachTo(this.carafe)
        this.coffeeGroundContainer.coffeeBrewContainer.attachTo(this.carafe)

        //Water Container. Pours into Coffee Ground Container
        this.waterContainer = new Reservoir(750)
        this.waterContainer.attachHeatingElement(new HeatingElement(120))
        this.waterContainer.attachTo(this.coffeeGroundContainer.coffeeBrewContainer);
        


        //Condiments
        this.milkContainer = new Reservoir(50)
        this.milkContainer.attachTo(this.carafe)

        this.sugarContainer = new Reservoir(50)
        this.sugarContainer.attachTo(this.carafe)

        this.creamContainer = new Reservoir(50)
        this.creamContainer.attachTo(this.carafe)
    }

    step() {
        if(this.isBrewing()){
            this.boilerLight.turnOn();
        }else{
            this.boilerLight.turnOff();
        }

        if(this.carafe.heatingElement.on){
            this.burnerLight.turnOn()
        }else{
            this.burnerLight.turnOff()
        }

        //if the coffee ground container is unable to drip...
        if(!this.coffeeGroundContainer.canDispense()){
           this.waterContainer.heatingElement.turnOff();
        }

        this.coffeeGroundContainer.step()

        this.waterContainer.step()
        this.carafe.step()
    }

    reset() {
        this.boilerLight.reset()
        this.burnerLight.reset()
        this.waterContainer.reset()
        this.milkContainer.reset()
        this.sugarContainer.reset()
        this.creamContainer.reset()
        this.coffeeGroundContainer.reset()
        this.carafe.reset()
    }

    turnOn() {
        if(this.isBrewing()){
            return {type: "error", text: "Cannot start brewing: Brew already in progress."}
        }
        if(this.coffeeGroundContainer.levelSensor.level() == 0){
            return {type: "error", text: "Cannot start brewing: No coffee grounds inserted."}
        }
        if(!this.carafe.onBurner) {
            return {type: "error", text: "Cannot start brewing when carafe is off burner."}
        }
        var error = this.waterContainer.turnOnHeatingElement()
        if(error) { return error }
    }

    turnOff() {
        if(!this.isBrewing()){
            return {type: "error", text: "Cannot cancel brewing: No brew in progress."}
        }
        var error = this.waterContainer.heatingElement.turnOff();
        if(error) {return error }
    }

    isBrewing() {
        return this.waterContainer.heatingElement.on
    }

    /*
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
    }*/
  }