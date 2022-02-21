import { canvas } from "../Canvas.js";
import { colors } from "../Color.js";
export class Projectile {
    constructor(x, y, theta, speed, pierce, damage, maxLifespan) {
        this.lifespan = 0;
        this.size = 5;
        this.x = x;
        this.y = y;
        this.theta = theta;
        this.speed = speed;
        this.pierce = pierce;
        this.damage = damage;
        this.maxLifespan = maxLifespan;
    }
    update() {
        this.x += this.speed * Math.cos(this.theta);
        this.y += this.speed * Math.sin(this.theta);
        this.lifespan++;
    }
    useHit(e) {
        this.pierce--;
        e.health -= this.damage;
    }
    isAlive() {
        return this.lifespan < this.maxLifespan && this.pierce > 0;
    }
    draw() {
        canvas.drawPixel(this.x, this.y, 2, colors.ULTRABRIGHT);
        // canvas.arrowDeg(this.x, this.y, this.theta, 5, 2, 2, colors.SOLID)
        // canvas.arrowDeg(this.x, this.y, this.theta + Math.PI, 5, 0, 2, colors.SOLID)
    }
}
