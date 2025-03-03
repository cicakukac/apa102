//% blockId=apa102p
namespace apa102 {
    export class p {
        private static defaultInstance: p; // Static instance for automatic usage

        NUM_PIXELS_X: number
        NUM_PIXELS_Y: number
        DAT: number
        CLK: number
        NUM_PIXELS: number
        BRIGHTNESS: number
        pixels: number[][]

        constructor() {
            this.NUM_PIXELS_X = 16;
            this.NUM_PIXELS_Y = 16;
            this.DAT = DigitalPin.P1;
            this.CLK = DigitalPin.P0;
            this.NUM_PIXELS = this.NUM_PIXELS_X * this.NUM_PIXELS_Y;
            this.BRIGHTNESS = 7;

            // Initialize pixel array
            this.pixels = this.init_pixels();
        }

        private init_pixels(): number[][] {
            let pixel_list: number[][] = [];
            for (let i = 0; i < this.NUM_PIXELS; i++) {
                pixel_list.push([0, 0, 0, this.BRIGHTNESS]);
            }
            return pixel_list;
        }

        /**
         * Get the default instance (auto-created)
         */
        private static getInstance(): p {
            if (!this.defaultInstance) {
                this.defaultInstance = new p(); // Automatically create instance
            }
            return this.defaultInstance;
        }

        /** Internal method for getting instance */
        static instance(): p {
            return this.getInstance();
        }
    }

    /**
     * Plot a pixel at position X, Y (correctly inserts `apa102.plotAt(x, y)`)
     */
    //% blockId=apa102plotat
    //% block="plot at $x $y"
    //% x.min=0 x.max=15
    //% y.min=0 y.max=15
    export function plotAt(x: number, y: number): void {
        let instance = p.instance(); // Get or create instance
        console.log("NUM_PIXELS_X: " + instance.NUM_PIXELS_X);
        led.plot(x, y);
    }
}
