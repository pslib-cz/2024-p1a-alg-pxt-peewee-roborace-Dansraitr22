type IRC = {
    l: DigitalPin,
    c: DigitalPin,
    r: DigitalPin
}
const IR: IRC = {
    c: DigitalPin.P14,
    l: DigitalPin.P13,
    r: DigitalPin.P15
}
let speed: number = 100
pins.setPull(IR.l, PinPullMode.PullNone);
pins.setPull(IR.c, PinPullMode.PullNone);
pins.setPull(IR.r, PinPullMode.PullNone);
function online(left: number, right: number, center: number) {
    if (left || right || center === 1) {
        return true
    } else if (left && right && center === 0) {
        return false
    } return false
}

let center: number = 0
let left: number = 0
let right: number = 0

basic.forever(function () {
    center = pins.digitalReadPin(IR.c)
    left = pins.digitalReadPin(IR.l)
    right = pins.digitalReadPin(IR.r)
    if (online(left, right, center)) {
        if (center === 1) {
            PCAmotor.MotorRun(PCAmotor.Motors.M1, speed)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, speed)
        } if (left === 1) {
            PCAmotor.MotorRun(PCAmotor.Motors.M4, 0)
            PCAmotor.MotorRun(PCAmotor.Motors.M1, speed)
        } if (right === 1) {
            PCAmotor.MotorRun(PCAmotor.Motors.M4, speed)
            PCAmotor.MotorRun(PCAmotor.Motors.M1, 0)
        }

    } else if (!online(left, right, center)) {
        PCAmotor.MotorStop(PCAmotor.Motors.M1)
        PCAmotor.MotorStop(PCAmotor.Motors.M4)

    }

})
radio.onReceivedString(function (name: string) {

    if (name === "leva") {
        PCAmotor.MotorRun(PCAmotor.Motors.M4, speed - 40)
        PCAmotor.MotorRun(PCAmotor.Motors.M1, speed + 20)
    }
    if (name === "prava") {
        PCAmotor.MotorRun(PCAmotor.Motors.M4, speed + 20)
        PCAmotor.MotorRun(PCAmotor.Motors.M1, speed - 40)
    }
    if (name === "rovne") {
        PCAmotor.MotorRun(PCAmotor.Motors.M1, speed)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, speed)
    }
}
)