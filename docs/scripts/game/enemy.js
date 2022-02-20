import { canvas } from "../Canvas.js";
import { colors } from "../Color.js";
export class Enemy {
    constructor(distance, health, size) {
        this.speed = 5;
        this.x = 0;
        this.y = 0;
        this.distance = distance;
        this.health = health;
        this.size = size;
    }
    update(track) {
        this.distance += this.speed;
        const pos = track.getPosition(this.distance);
        this.x = pos.x;
        this.y = pos.y;
    }
    draw() {
        canvas.fillRect(this.x - (this.size / 2), this.y - (this.size / 2), this.size, this.size, colors.SOLID);
    }
    drawBoundingBox() {
        canvas.strokeRect(this.x - (this.size / 2), this.y - (this.size / 2), this.size, this.size, colors.DEBUG, 1);
    }
}
class RegularEnemy extends Enemy {
    constructor(distance, health) {
        super(distance, health, 10);
        switch (true) {
            case this.health >= 6:
                this.speed = 2;
                break;
            default:
                this.speed = this.health * 0.33;
                break;
        }
    }
}
