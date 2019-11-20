
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
            this.runtime++;
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
        }
    }
});

function step() {
    coffeeMakerApp.step();
    setTimeout(step, 1000);
}
step();


