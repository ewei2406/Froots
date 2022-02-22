import { canvas } from "../Canvas.js";
import { colors, RgbColor } from "../Color.js";
export class Particle {
    constructor(x, y, lifespan, theta = 0) {
        this.x = x;
        this.y = y;
        this.lifespan = lifespan;
        this.theta = theta;
    }
    isAlive() {
        return this.lifespan > 0;
    }
    draw() {
        canvas.strokeCircle(this.x, this.y, 5, colors.DEBUG, 1);
    }
    update() {
        this.lifespan--;
    }
}
export class ExplosionEffect extends Particle {
    constructor(x, y, lifespan, size) {
        super(x, y, lifespan);
        this.size = size;
        this.color = new RgbColor(0, 0, 255, 1.1);
    }
    draw() {
        canvas.fillCircle(this.x, this.y, this.size, this.color);
    }
    isAlive() {
        return this.color.a > 0;
    }
    update() {
        this.color.a -= 1 / this.lifespan;
    }
}
export class LaserBeam extends Particle {
    constructor(x, y, x2, y2) {
        super(x, y, 5, 0);
        this.x2 = x2;
        this.y2 = y2;
        this.color = new RgbColor(255, 0, 255, 1.5);
    }
    draw() {
        canvas.startLine(this.x, this.y, 1, this.color);
        canvas.lineTo(this.x2, this.y2);
        canvas.finishLine();
    }
    isAlive() {
        return this.color.a > 0;
    }
    update() {
        this.color.a -= 1 / this.lifespan;
    }
}
