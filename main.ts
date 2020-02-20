
radio.setGroup(23)

let isDocked = false
let dockedCheck = false
let manualCounter = 0

function moveServo(score: number) {
    if (score > 0) {
        const angle = 190 - score * 18
        pins.servoWritePin(AnalogPin.P0, angle)
        basic.showNumber(score)
    } else {
        basic.clearScreen()
        pins.servoWritePin(AnalogPin.P0, 90)
        basic.pause(2000)
        pins.digitalWritePin(DigitalPin.P0, 0)
    }
}

input.onButtonPressed(Button.A, function () {
    if (isDocked) {
        manualCounter += 1
        moveServo(manualCounter)
    } else {
        radio.sendNumber(5)
    }
})

input.onButtonPressed(Button.B, function () {
    if (isDocked) {
        manualCounter = 0
        moveServo(manualCounter)
    } else {
        radio.sendNumber(11)
    }
})

input.onButtonPressed(Button.AB, function () {
    radio.sendNumber(511)
})

input.onGesture(Gesture.Shake, function () {
    radio.sendString("shake")
})

basic.forever(function () {
    dockedCheck = false
    pins.digitalWritePin(DigitalPin.P1, 1)
    basic.pause(100)
    if (input.pinIsPressed(TouchPin.P2)) {
        dockedCheck = true
    }
    pins.digitalWritePin(DigitalPin.P1, 0)
    if (isDocked != dockedCheck) {
        isDocked = dockedCheck
        if (isDocked) {
            basic.showIcon(IconNames.Yes)
        } else {
            basic.showIcon(IconNames.No)
        }
        basic.pause(2000)
        basic.clearScreen()
    }
    basic.pause(2000)
})

radio.onReceivedNumber(function (receivedNumber: number) {
    if (isDocked) {
        moveServo(receivedNumber)
    }
})
