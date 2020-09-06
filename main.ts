input.onButtonPressed(Button.A, function () {
    Stop = 0
})
input.onButtonPressed(Button.B, function () {
    control.reset()
})
let Millis = 0
let Draaien = 0
let Stop = 0
basic.showLeds(`
    . . . . .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)
basic.pause(1000)
basic.showLeds(`
    . . . . .
    # # . # .
    . . . . .
    # . . . #
    . # # # .
    `)
basic.pause(500)
basic.showLeds(`
    . . . . .
    . # . # .
    . . . . .
    # . . . #
    . # # # .
    `)
Stop = 1
let Afstand = 1
basic.forever(function () {
    if (Stop == 0) {
        basic.showLeds(`
            . . . . .
            # # . # #
            . . . . .
            . . . . .
            # # # # #
            `)
        Kitronik_Move_Motor.setUltrasonicUnits(Kitronik_Move_Motor.Units.Centimeters)
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 60)
        if (Draaien == 1) {
            Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.On)
            basic.showLeds(`
                . . . . .
                . # . # .
                . # . # .
                . . . . .
                . # # # .
                `)
            Kitronik_Move_Motor.stop()
            Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 50)
            basic.pause(200)
            Kitronik_Move_Motor.stop()
            Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.Off)
            Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 70)
        }
    } else {
        Kitronik_Move_Motor.stop()
    }
})
basic.forever(function () {
    if (Kitronik_Move_Motor.measure() < 35) {
        Afstand = 0
    } else {
        Millis = control.millis() + 100
        Afstand = 1
    }
    if (Afstand == 0 && control.millis() > Millis) {
        Draaien = 1
    } else {
        Draaien = 0
    }
})
