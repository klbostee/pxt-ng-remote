
radio.setGroup(23)

input.onButtonPressed(Button.A, function () {
    radio.sendNumber(5)
})

input.onButtonPressed(Button.B, function () {
    radio.sendNumber(11)
})

input.onButtonPressed(Button.AB, function () {
    radio.sendNumber(511)
})

input.onGesture(Gesture.Shake, function () {
    radio.sendString("shake")
})

radio.onReceivedNumber(function (receivedNumber: number) {
    if (receivedNumber > 0) {
        basic.showNumber(receivedNumber)
    }
})
