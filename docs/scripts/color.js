export class rgbColor {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    toString() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
}
export class rgbaColor {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    toString() {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
    }
}
export class Colors {
    constructor() {
        this.Red = new rgbColor(255, 0, 0);
        this.Green = new rgbColor(0, 255, 0);
        this.Blue = new rgbColor(0, 0, 255);
    }
}
