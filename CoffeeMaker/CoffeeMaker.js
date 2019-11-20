/*
The Coffee Maker class.
This class will contain all the other components that the coffee maker consists of.
*/

class CoffeeMaker {
    constructor() {
        this.brewButton = new Button()
        this.indicatorLight = new LED();
       // this.dripApparatus = new DripApparatus()
        this.boiler = new Boiler()
    }

    step() {
        //step for all components.
        if(this.isBrewing()){
            this.indicatorLight.turnOn();
        }else{
            this.indicatorLight.turnOff();
        }

        this.boiler.step()
    }

    brew() {
        if(this.isBrewing()){
            return {type: "error", text: "Cannot start brewing: Brew already in progress."}
        }
        var boilerError = this.boiler.start()
        if(boilerError) {return boilerError }
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
  }