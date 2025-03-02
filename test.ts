// tests go here; this will not be compiled when this package is used as an extension.
let ctrl = new apa102.p()
for (let i = 0; i < 25; ++i) {
    ctrl.plotAt(3,3)
    basic.pause(500)
}
