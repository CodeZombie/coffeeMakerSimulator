
var coffeeMakerApp = new Vue({
    el: '#app',
    data: {
        runtime: 0,
        coffeeMaker: new CoffeeMaker(),
        messageText: "",
        messageType: "normal"
    },
    computed: {
    },
    methods: {
        atRoute: function(pageName) {
            return this.$route.name == pageName;
        },
        step: function() {
            this.runtime += 10;
            this.coffeeMaker.step();
        },
        showMessage: function(text, type) {
            this.messageText = text
            this.messageType = type
        },
        clearMessage: function() {
            this.messageText = ""
        },

        /* BUTTONS */
        pressBrewButton: function() {
            this.clearMessage();
            message = this.coffeeMaker.brew();
            if(message){
                this.showMessage(message.text, message.type);
            }
        },
        pressCancelBrewButton: function() {
            this.clearMessage();
            message = this.coffeeMaker.stopBrewing();
            if(message){
                this.showMessage(message.text, message.type);
            }
        },
        pressAddWaterButton: function() {
            this.clearMessage();
            message = this.coffeeMaker.addWater(100);
            if(message){
                this.showMessage(message.text, message.type);
            }
        },
        pressAddMilkButton: function() {
            this.clearMessage();
            message = this.coffeeMaker.milkContainer.add(10)
            if(message){
                this.showMessage(message.text, message.type);
            }
        },
        pressAddCreamButton: function() {
            this.clearMessage();
            message = this.coffeeMaker.creamContainer.add(10)
            if(message){
                this.showMessage(message.text, message.type);
            }
        },
        pressAddSugarButton: function() {
            this.clearMessage();
            message = this.coffeeMaker.sugarContainer.add(5)
            if(message){
                this.showMessage(message.text, message.type);
            }
        },
        pressAddFilterButton: function() {
            this.clearMessage();
            message = this.coffeeMaker.coffeeGroundContainer.addFilter()
            if(message){
                this.showMessage(message.text, message.type);
            }
        },
        pressRemoveFilterButton: function() {
            this.clearMessage();
            message = this.coffeeMaker.coffeeGroundContainer.removeFilter()
            if(message){
                this.showMessage(message.text, message.type);
            }
        },
        pressAddCoffeeGroundsButton: function() {
            this.clearMessage();
            message = this.coffeeMaker.coffeeGroundContainer.addGrounds(15)
            if(message){
                this.showMessage(message.text, message.type);
            }
        },
        pressDrinkCoffeeButton: function() {
            this.clearMessage();
            message = this.coffeeMaker.carafe.removeLiquid(15)
            if(message){
                this.showMessage(message.text, message.type);
            }
        },
        pressPourMilkButton: function() {
            this.clearMessage();
            message = this.coffeeMaker.pourMilk(5)
            if(message){
                this.showMessage(message.text, message.type);
            }
        },
        pressPourSugarButton: function() {
            this.clearMessage();
            message = this.coffeeMaker.pourSugar(5)
            if(message){
                this.showMessage(message.text, message.type);
            }
        },
        pressPourCreamButton: function() {
            this.clearMessage();
            message = this.coffeeMaker.pourCream(5)
            if(message){
                this.showMessage(message.text, message.type);
            }
        }
    }
});

var coffeeCanvas = new CoffeeCanvas(document.getElementById("coffeeCanvas"), "res/maker.png")

function step() {
    coffeeMakerApp.step();
    coffeeCanvas.draw(coffeeMakerApp.coffeeMaker);
    setTimeout(step, 10);
}
step();





