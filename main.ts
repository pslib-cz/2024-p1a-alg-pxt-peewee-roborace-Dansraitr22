radio.setGroup(21)
type IRC = {
    l: DigitalPin,
    c: DigitalPin,
    r: DigitalPin
}
const IR: IRC = {
    c: DigitalPin.P15,
    l: DigitalPin.P14,
    r: DigitalPin.P13
}
let speed: number = 200
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
let start=control.millis()
let center: number = 0
let left: number = 0
let right: number = 0
let cr: boolean = false
basic.forever(function () {
    center = pins.digitalReadPin(IR.c)
    left = pins.digitalReadPin(IR.l)
    right = pins.digitalReadPin(IR.r)
    if (online(left, right, center) && cr === false) {
        if (center === 0) {
            PCAmotor.MotorRun(PCAmotor.Motors.M1, speed)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, -speed)

        }  if (left === 0) {
            PCAmotor.MotorRun(PCAmotor.Motors.M4, 0)
            PCAmotor.MotorRun(PCAmotor.Motors.M1, speed)

        }  if (right === 0) {
            PCAmotor.MotorRun(PCAmotor.Motors.M4, -speed)
            PCAmotor.MotorRun(PCAmotor.Motors.M1, 0)
        }
        else if (center === 0 && right === 0) {
            PCAmotor.MotorRun(PCAmotor.Motors.M4, -speed)
            PCAmotor.MotorRun(PCAmotor.Motors.M1, 0)
        }
        else if (center === 0 && left === 0) {
            PCAmotor.MotorRun(PCAmotor.Motors.M4, 0)
            PCAmotor.MotorRun(PCAmotor.Motors.M1, speed)
        }
    } else if (!online(left, right, center)) {
        PCAmotor.MotorStop(PCAmotor.Motors.M1)
        PCAmotor.MotorStop(PCAmotor.Motors.M4)
        cr = true
    
    }


})
radio.onReceivedString(function (name: string) {

    if (name === "leva") {
        let milis=control.millis()
        PCAmotor.MotorRun(PCAmotor.Motors.M4, 0)
        PCAmotor.MotorRun(PCAmotor.Motors.M1, speed)

        cr = false
        basic.pause(1000)
    }
    if (name === "prava") {
        PCAmotor.MotorRun(PCAmotor.Motors.M4, -speed)
        PCAmotor.MotorRun(PCAmotor.Motors.M1, 0)
        cr = false
        basic.pause(1000)
    }
    if (name === "rovne") {
        PCAmotor.MotorRun(PCAmotor.Motors.M1, speed)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, -speed)
        cr = false
        basic.pause(1000)
    }
}
)