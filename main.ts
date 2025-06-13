type IRC = {
    l: DigitalPin,
    c: DigitalPin,
    r: DigitalPin
}
const IR: IRC = {
    l: DigitalPin.P14,
    c: DigitalPin.P15,
    r: DigitalPin.P13
}
let speed: number = 125
pins.setPull(IR.l, PinPullMode.PullNone);
pins.setPull(IR.c, PinPullMode.PullNone);
pins.setPull(IR.r, PinPullMode.PullNone);
function online(left: number, right: number, center: number) {
    if (left || right || center === 1) {
        return true
    } else {
        return false
    }
}
basic.forever(function () {
    if (online(IR.l, IR.r, IR.c)) {
        if (IR.c === 1) {
            PCAmotor.MotorRun(PCAmotor.Motors.M1, speed)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, speed)
        } else if (IR.l === 1) {
            PCAmotor.MotorRun(PCAmotor.Motors.M1, speed + 40)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, speed - 40)
        } else if (IR.r === 1)
            PCAmotor.MotorRun(PCAmotor.Motors.M1, speed - 40)
        PCAmotor.MotorRun(PCAmotor.Motors.M4, speed + 40)
    } else if (!online(IR.l, IR.r, IR.c)) {
        PCAmotor.MotorStopAll
    }

})
