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
class Colors {
    constructor() {
        this.lifespan = 0;
        this.SOLID = new RgbColor(255, 0, 0);
        this.MEDIUM = new RgbColor(50, 0, 0);
        this.EMPTY = new RgbColor(0, 0, 0);
        this.VOID = new RgbColor(0, 1, 0);
        this.DEBUG = new RgbColor(0, 255, 0);
        this.BRIGHT = new RgbColor(255, 0, 150);
        this.FLASHING = new RgbColor(255, 0, 150);
        this.ULTRABRIGHT = new RgbColor(255, 0, 255);
    }
    update() {
        this.lifespan++;
        this.FLASHING.b = 80 + (Math.sin(this.lifespan * 0.2) * 100);
    }
}
const colors = new Colors();
export { colors };
