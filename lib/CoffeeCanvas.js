class CoffeeCanvas {
    constructor(canvas, location){
        this.canvas = canvas

        this.canvas.width = 520;
        this.canvas.height= 456
        this.canvasContext = canvas.getContext("2d")
        this.coffeeMakerImage

        console.log("Attempting to load image")
        var image = new Image();
        image.onload = () => {
            this.coffeeMakerImage = image
            console.log("Image loaded succesfully")
        };
        image.src = location;
        console.log("Canvas Created")
    }

    drawRect(x, y, width, height, color){
        this.canvasContext.beginPath();
        this.canvasContext.fillStyle = color;
        this.canvasContext.fillRect(x, y, width, height);
        this.canvasContext.stroke();
    }

    drawBar(x, y, width, height, bgColor, fillColor, fillAmount) {
        this.canvasContext.beginPath();
        this.canvasContext.fillStyle = bgColor;
        this.canvasContext.fillRect(x, y, width, height);
        this.canvasContext.stroke();

        this.canvasContext.fillStyle = fillColor;
        var filledHeight = height * fillAmount
        this.canvasContext.fillRect(x, y + (height - filledHeight), width, height * fillAmount);
        this.canvasContext.stroke();
    }

    drawCoffeeMakerImage(x, y){
        if(this.coffeeMakerImage){
            this.canvasContext.drawImage(this.coffeeMakerImage, x, y)
            //this.canvasContext.drawImage(this.coffeeMakerImage, x, y, this.canvas.width, this.canvas.height)
        }else{
            console.log("Cannot draw coffee maker image. Not loaded.");
        }
    }

    draw(coffeeMaker) {
        this.drawRect(0,0,this.canvas.width, this.canvas.height, "white")
        /* Grab data from the coffee Maker object and draw it to the screen. */
        if(coffeeMaker.indicatorLight.on){
            this.drawRect(56, 16, 16, 16, "red")
        }
        //milk
        this.drawBar(256, 48, 32, 144, "grey", "white", coffeeMaker.milkContainer.amount / coffeeMaker.milkContainer.maxAmount)
        //sugar
        this.drawBar(320, 48, 32, 144, "grey", "white", coffeeMaker.sugarContainer.amount / coffeeMaker.sugarContainer.maxAmount)
        //cream
        this.drawBar(376, 48, 32, 144, "grey", "white", coffeeMaker.creamContainer.amount / coffeeMaker.creamContainer.maxAmount)
        //water
        this.drawBar(448, 124, 60, 260, "white", "#2185d0", coffeeMaker.boiler.waterReservoir.waterLevel / coffeeMaker.boiler.waterReservoir.maxWaterLevel)
        //coffee grounds
        this.drawBar(48, 104, 24, 96, "white", "#62441c", coffeeMaker.coffeeGroundContainer.amount / coffeeMaker.coffeeGroundContainer.maxAmount)

        //coffee in carafe
        this.drawBar(48, 264, 24, 128, "white", "#62441c", coffeeMaker.carafe.getTotalLiquid() / coffeeMaker.carafe.maxAmount)
        this.drawCoffeeMakerImage(0,0)
    }

}