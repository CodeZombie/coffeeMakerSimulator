/*
Button.
Holds a method which is called when the button is pressed.

*/

class Button{
    constructor(onPress) {
        this.onPress = onPress
    }

    press() {
        return this.onPress()
    }

}