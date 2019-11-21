
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
            if(this.tutorialMode){
                this.tutorialStage = 'addMilk'
            }
        },
        pressAddMilkButton: function() {
            this.clearMessage();
            message = this.coffeeMaker.milkContainer.add(10)
            if(message){
                this.showMessage(message.text, message.type);
            }
            if(this.tutorialMode){
                this.tutorialStage = 'addSugar'
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
            if(this.tutorialMode){
                this.tutorialStage = 'startBrewing'
            }
        },
        pressAddFilterButton: function() {
            this.clearMessage();
            message = this.coffeeMaker.coffeeGroundContainer.addFilter()
            if(message){
                this.showMessage(message.text, message.type);
            }
            if(this.tutorialMode){
                this.tutorialStage = 'addCoffee'
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
            if(this.tutorialMode){
                this.tutorialStage = 'addWater'
            }
        },
        pressDrinkCoffeeButton: function() {
            this.clearMessage();
            message = this.coffeeMaker.carafe.removeLiquid(15)
            if(message){
                this.showMessage(message.text, message.type);
            }
            if(this.tutorialMode){
                this.tutorialMode = false
            }
        },
        pressPourMilkButton: function() {
            this.clearMessage();
            message = this.coffeeMaker.pourMilk(5)
            if(message){
                this.showMessage(message.text, message.type);
            }
            if(this.tutorialMode){
                this.tutorialStage = 'pourSugar'
            }
        },
        pressPourSugarButton: function() {
            this.clearMessage();
            message = this.coffeeMaker.pourSugar(5)
            if(message){
                this.showMessage(message.text, message.type);
            }
            if(this.tutorialMode){
                this.tutorialStage = 'drinkCoffee'
            }
        },
        pressPourCreamButton: function() {
            this.clearMessage();
            message = this.coffeeMaker.pourCream(5)
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





