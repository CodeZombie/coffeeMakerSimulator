
var coffeeMakerApp = new Vue({
    el: '#app',
    data: {
        runtime: 0,
        coffeeMaker: new CoffeeMaker(),
        messageText: "",
        messageType: "error",
        tutorialMode: false,
        tutorialStage: 0,
        tutorialStages: {
            'addFilter': "Add a coffee filter",
            "addCoffee": "Add your coffee",
            "addWater": "Add some water",
            "addMilk": "Add milk",
            "addSugar": "Add sugar",
            "startBrewing": "Start brewing",
            "pourMilk": "Pour some milk",
            "pourSugar": "Pour some sugar",
            "drinkCoffee": "Drink your coffee"}
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

            if(this.tutorialMode){
                if(this.tutorialStage == 'startBrewing' && this.coffeeMaker.carafe.getTotalLiquid() > 0){
                    this.tutorialStage = 'pourMilk'
                }
                this.showMessage(this.tutorialStages[this.tutorialStage], "tutorial")
            }
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
            var message = this.coffeeMaker.brewButton.press();
            if(message){
                this.showMessage(message.text, message.type);
            }
        },
        pressCancelBrewButton: function() {
            this.clearMessage();
            var message = this.coffeeMaker.turnOff();
            if(message){
                this.showMessage(message.text, message.type);
            }
        },
        pressAddWaterButton: function() {
            this.clearMessage();
            var message = this.coffeeMaker.waterContainer.add(100);
            if(message){
                this.showMessage(message.text, message.type);
            }
            if(this.tutorialMode){
                this.tutorialStage = 'addMilk'
            }
        },
        pressAddMilkButton: function() {
            this.clearMessage();
            var message = this.coffeeMaker.milkContainer.add(10)
            if(message){
                this.showMessage(message.text, message.type);
            }
            if(this.tutorialMode){
                this.tutorialStage = 'addSugar'
            }
        },
        pressAddCreamButton: function() {
            this.clearMessage();
            var message = this.coffeeMaker.creamContainer.add(10)
            if(message){
                this.showMessage(message.text, message.type);
            }
        },
        pressAddSugarButton: function() {
            this.clearMessage();
            var message = this.coffeeMaker.sugarContainer.add(5)
            if(message){
                this.showMessage(message.text, message.type);
            }
            if(this.tutorialMode){
                this.tutorialStage = 'startBrewing'
            }
        },
        pressAddFilterButton: function() {
            this.clearMessage();
            var message = this.coffeeMaker.coffeeGroundContainer.addFilter()
            if(message){
                this.showMessage(message.text, message.type);
            }
            if(this.tutorialMode){
                this.tutorialStage = 'addCoffee'
            }
        },
        pressRemoveFilterButton: function() {
            this.clearMessage();
            var message = this.coffeeMaker.coffeeGroundContainer.removeFilter()
            if(message){
                this.showMessage(message.text, message.type);
            }
        },
        pressAddCoffeeGroundsButton: function() {
            this.clearMessage();
            var message = this.coffeeMaker.coffeeGroundContainer.add(15)
            if(message){
                this.showMessage(message.text, message.type);
            }
            if(this.tutorialMode){
                this.tutorialStage = 'addWater'
            }
        },
        pressDrinkCoffeeButton: function() {
            this.clearMessage();
            var message = this.coffeeMaker.carafe.remove(15)
            if(message){
                this.showMessage(message.text, message.type);
            }
            if(this.tutorialMode){
                this.tutorialMode = false
            }
        },
        pressPourMilkButton: function() {
            this.clearMessage();
            var message = this.coffeeMaker.milkContainer.dispense(5)
            if(message){
                this.showMessage(message.text, message.type);
            }
            if(this.tutorialMode){
                this.tutorialStage = 'pourSugar'
            }
        },
        pressPourSugarButton: function() {
            this.clearMessage();
            var message = this.coffeeMaker.sugarContainer.dispense(5)
            if(message){
                this.showMessage(message.text, message.type);
            }
            if(this.tutorialMode){
                this.tutorialStage = 'drinkCoffee'
            }
        },
        pressPourCreamButton: function() {
            this.clearMessage();
            var message = this.coffeeMaker.creamContainer.dispense(5)
            if(message){
                this.showMessage(message.text, message.type);
            }
        },
        pressToggleTutorialButton: function() {
            this.clearMessage();
            if(this.tutorialMode){
                this.tutorialMode = false
            }else{
                this.tutorialMode = true
                this.tutorialStage = 'addFilter'
                this.coffeeMaker.reset()
            }
        }, 
        pressToggleCarafeOnBurnerButton: function() {
            this.clearMessage();
            var message
            if(this.coffeeMaker.carafe.onBurner){
                message = this.coffeeMaker.carafe.takeOffBurner()
            }else{
                message = this.coffeeMaker.carafe.putOnBurner()
            }
            if(message){
                this.showMessage(message.text, message.type);
            }
        }
    }
});

var coffeeCanvas = new CoffeeCanvas(document.getElementById("coffeeCanvas"), "res/maker.png")

function step() {
    coffeeMakerApp.step();
    coffeeCanvas.draw(coffeeMakerApp.coffeeMaker)

    setTimeout(step, 10);
}
step();





