import { canvas } from "../Canvas.js";
import { colors } from "../Color.js";
import { gameSession } from "./gameSession.js";
var enemyTypes;
(function (enemyTypes) {
    enemyTypes[enemyTypes["REGULAR"] = 0] = "REGULAR";
})(enemyTypes || (enemyTypes = {}));
export class Enemy {
    constructor(health, type = enemyTypes.REGULAR, distance = 0) {
        this.x = 0;
        this.y = 0;
        this.distance = distance;
        this.health = health;
        this.type = type;
        switch (this.type) {
            case enemyTypes.REGULAR:
                this.speed = Math.min(0.25 * (this.health + gameSession.difficulty) + .75, 6);
                this.size = 5 + this.health;
                break;
            default:
                this.speed = 1;
                this.size = 10;
        }
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
