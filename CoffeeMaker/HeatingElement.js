/* The Heating Element class
An element that can move between 0 and 100 degrees celsius when turned on.

*/

class HeatingElement {
    constructor(maxTemperature) {
        this.on = false;
        this.temperature = 0;
        this.maxTemperature = maxTemperature;
    }

    step(){
        //Heats up or cools down.
        if(this.on){
            this.temperature += 1
            if(this.temperature > this.maxTemperature){
                this.temperature = this.maxTemperature
            }
        }else{
            this.temperature -= 1
            if(this.temperature < 0){
                this.temperature = 0
            }
        }
    }
    
    //maybe get rid of this method and just temperature--, because temps can be negative!
    reduceTemperature(amount){
        this.temperature -= amount;
        if(this.temperature < 0){
            this.temperature = 0
        }
    }

    turnOn(){
        this.on = true;
    }

    turnOff() {
        this.on = false;
    }

    reset() {
        this.on = false
        this.temperature = 0
    }
}