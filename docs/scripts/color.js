export class RgbColor {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    toString() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
}
export class RgbaColor {
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
const Colors = {
    RED: new RgbColor(255, 0, 0),
    GREEN: new RgbColor(0, 255, 0),
    BLUE: new RgbColor(0, 0, 255)
};
export { Colors };
