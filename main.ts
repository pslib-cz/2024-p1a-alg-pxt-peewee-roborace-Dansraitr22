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
let speed: number = 90
pins.setPull(IR.l, PinPullMode.PullNone);
pins.setPull(IR.c, PinPullMode.PullNone);
pins.setPull(IR.r, PinPullMode.PullNone);
function online(left: number, right: number, center: number) {
    if (left || right  || center === 1) {
        return true
    } else if (left && right && center===0){
        return false
    }return false
}

let center: number = 0
let left:number=0
let right:number=0
basic.forever(function () {
    center = pins.digitalReadPin(IR.c)
    left = pins.digitalReadPin(IR.l)
    right = pins.digitalReadPin(IR.r)
    if (online(left, right, center)) {
        if (center === 1) {
            PCAmotor.MotorRun(PCAmotor.Motors.M1, speed )
            PCAmotor.MotorRun(PCAmotor.Motors.M4, speed)
        } else if (left === 1) {
            PCAmotor.MotorRun(PCAmotor.Motors.M4, speed  - 60)
            PCAmotor.MotorRun(PCAmotor.Motors.M1, speed  + 30)
        } else if (right === 1)
            PCAmotor.MotorRun(PCAmotor.Motors.M4, speed   + 30)
        PCAmotor.MotorRun(PCAmotor.Motors.M1, speed - 60)
    } else if (!online(left, right, center)) {
        PCAmotor.MotorStop(PCAmotor.Motors.M1, )
        PCAmotor.MotorStop(PCAmotor.Motors.M4,)
    } 

})
