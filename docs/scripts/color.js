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
    SOLID: new RgbColor(255, 0, 0),
    EMPTY: new RgbColor(0, 0, 0),
    VOID: new RgbColor(0, 1, 0),
    DEBUG: new RgbColor(0, 255, 0),
    BRIGHT: new RgbColor(255, 0, 150),
    ULTRABRIGHT: new RgbColor(255, 0, 255),
};
export { Colors };
