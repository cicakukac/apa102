//  to remind us which pin serves which function
let DAT = DigitalPin.P1
let CLK = DigitalPin.P0
//  number of pixels in the chain
let NUM_PIXELS = 256
//  default brightness setting
let BRIGHTNESS = 7
//  list of pixels
//  pixels = [[1,2,3,4], [1,2,3,4], [1,2,3,4]]
//  Initialize pixel list manually (avoiding list comprehensions)
function init_pixels(): number[][] {
    let pixel_list = []
    for (let i = 0; i < NUM_PIXELS; i++) {
        pixel_list.push([0, 0, 0, BRIGHTNESS])
    }
    //  Each pixel is a list of [R, G, B, Brightness]
    return pixel_list
}

//  Initialize pixels list
let pixels = init_pixels()
//  Set the brightness of all pixels - 0 - 1.
function set_brightness(brightness: number) {
    if (brightness < 0 || brightness > 1) {
        return
    }
    
    for (let x = 0; x < NUM_PIXELS; x++) {
        pixels[x][3] = Math.trunc(31.0 * brightness) & 0b11111
    }
}

//  Clear all of the pixels        
function clear() {
    for (let x = 0; x < NUM_PIXELS; x++) {
        for (let i = 0; i < 3; i++) {
            pixels[x][i] = 0
        }
    }
}

//  # Pulse a byte of data a bit at a time
//  def write_byte(byte):
//      bits = []
//      for i in range(7, -1, -1):
//          bits.append((byte >> i) & 1)
//      for x in range(8):
//          pins.digital_write_pin(DAT, bits[x])
//          pins.digital_write_pin(CLK,1)
//          pins.digital_write_pin(CLK,0)
//  Pulse a byte of data a bit at a time (optimized)
function write_byte(byte: number) {
    for (let i = 7; i > -1; i += -1) {
        //  Send 8 bits, MSB first
        pins.digitalWritePin(DAT, byte >> i & 1)
        pins.digitalWritePin(CLK, 1)
        pins.digitalWritePin(CLK, 0)
    }
}

//  Latch procedure - 36 clock pulses        
function eof() {
    pins.digitalWritePin(DAT, 0)
    for (let x = 0; x < 36; x++) {
        pins.digitalWritePin(CLK, 1)
        pins.digitalWritePin(CLK, 0)
    }
}

//  Latch at start - 32 clock pulses
function sof() {
    pins.digitalWritePin(DAT, 0)
    for (let x = 0; x < 32; x++) {
        pins.digitalWritePin(CLK, 1)
        pins.digitalWritePin(CLK, 0)
    }
}

//  Update colour and brightness values from pixels list
//  Call this procedure to update the display
function show() {
    sof()
    for (let pixel of pixels) {
        let [r, g, b, brightness] = pixel
        write_byte(0b11100000 | brightness)
        write_byte(b)
        write_byte(g)
        write_byte(r)
    }
    eof()
}

//  Set the colour and brightness of an individual pixel
function set_pix(x: number, rr: number, gg: number, bb: number, brightness: number = null) {
    if (brightness === null) {
        brightness = BRIGHTNESS
    } else {
        brightness = Math.trunc(31.0 * brightness) & 0b11111
    }
    
    pixels[x] = [rr & 0xff, gg & 0xff, bb & 0xff, brightness]
}

//  Set all of the pixels in the chain to the colour and brightness (optional)
function set_all(r: number, g: number, b: number, brightness: number = null) {
    for (let x = 0; x < NUM_PIXELS; x++) {
        set_pix(x, r, g, b, brightness)
    }
}

function set_all_rand() {
    for (let x = 0; x < NUM_PIXELS; x++) {
        set_pix(x, randint(0, 255), randint(0, 255), randint(0, 255), randint(0, 255))
    }
}

function set_brightness_gradient() {
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
            set_pix(y * 16 + x, 255, 255, 255, Math.abs(7.5 - y) / 8.)
        }
    }
}

function set_brightness_inv_gradient() {
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
            set_pix(y * 16 + x, 255, 255, 255, 1.0 - Math.abs(7.5 - y) / 8.)
        }
    }
}

//  Test code and example use
while (true) {
    //  all off
    //  clear()
    //  show()
    //  basic.pause(1000)
    //  on red individually
    //  for i in range(NUM_PIXELS):
    //      set_pix(i, 255, 0, 0)
    //      show()
    //  #     basic.pause(100)
    //  set_all(255,0,0,7)
    //  show()
    //  # basic.pause(1000)
    //  # all green
    //  set_all(0,255,0,7)
    //  show()
    //  # basic.pause(1000)
    //  # all blue
    //  set_all(0,0,255,7)
    //  show()
    //  set_all(255,255,255,7)
    //  show()
    //  # basic.pause(1000)
    //  set_all_rand()
    set_brightness_gradient()
    basic.pause(10)
    show()
    basic.pause(1500)
    set_brightness_inv_gradient()
    basic.pause(10)
    show()
    basic.pause(1500)
}
