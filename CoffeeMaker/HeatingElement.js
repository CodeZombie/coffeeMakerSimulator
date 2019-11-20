/* The Heating Element class
An element that can move between 0 and 100 degrees celsius when turned on.

*/

class HeatingElement {
    constructor() {
        this.on = false;
        this.temperature = 0;
        this.maxTemperature = 100;
    }

    step(){
        //Heats up or cools down.
        if(this.on){
            this.temperature += 25;
            if(this.temperature > this.maxTemperature){
                this.temperature = this.maxTemperature
            }
        }else{
            this.temperature -= 15
            if(this.temperature < 0){
                this.temperature = 0
            }
        }
    }

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
}