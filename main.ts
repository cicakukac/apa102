namespace apa102 {
    export class p {
        NUM_PIXELS_X: number
        NUM_PIXELS_Y: number
        DAT: number
        CLK: number
        NUM_PIXELS: number
        BRIGHTNESS: number

        constructor() {
            this.NUM_PIXELS_X = 16;
            this.NUM_PIXELS_Y = 16;
            this.DAT = DigitalPin.P1;
            this.CLK = DigitalPin.P0;
            this.NUM_PIXELS = this.NUM_PIXELS_X * this.NUM_PIXELS_Y;
            this.BRIGHTNESS = 7;

            // Initialize pixel array
            let pixels: number[][] = this.init_pixels();
        }

        init_pixels(): number[][] {
            let pixel_list: number[][] = [];
            for (let i = 0; i < this.NUM_PIXELS; i++) {
                pixel_list.push([0, 0, 0, this.BRIGHTNESS]);
            }
            return pixel_list;
        }

        /**
         * Addddd
         */
        //% blockId=apa102plotat
        //% block="plot at $x $y"
        //% x.min=0 x.max=4
        //% y.min=0 y.max=4
        plotAt(x: number, y: number): void {
            console.log("NUM_PIXELS_X: " + this.NUM_PIXELS_X);
            // this.NUM_PIXELS_X = (this.NUM_PIXELS_X + 1) % this.NUM_PIXELS_X;
            led.plot(x, y)
        }
    }
}

