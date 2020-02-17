
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
        const angle = 165 - receivedNumber * 15
        pins.servoWritePin(AnalogPin.P0, angle)
        basic.showNumber(receivedNumber)
    } else {
        basic.clearScreen()
        pins.servoWritePin(AnalogPin.P0, 175)
    }
})
