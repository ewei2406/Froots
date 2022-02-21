import { audioPlayer, audios } from "../Audio.js";
import { canvas } from "../Canvas.js";
import { colors } from "../Color.js";
import { cursor } from "../ui/Cursor.js";
import { gameSession } from "./gameSession.js";
import { Projectile } from "./projectile.js";
var towerState;
(function (towerState) {
    towerState[towerState["IDLE"] = 0] = "IDLE";
})(towerState || (towerState = {}));
var targeting;
(function (targeting) {
    targeting[targeting["FIRST"] = 0] = "FIRST";
    targeting[targeting["LAST"] = 1] = "LAST";
    targeting[targeting["CLOSE"] = 2] = "CLOSE";
    targeting[targeting["STRONG"] = 3] = "STRONG";
})(targeting || (targeting = {}));
export class Tower {
    constructor(x, y) {
        this.size = 15;
        this.range = 50;
        this.state = towerState.IDLE;
        this.fireRate = 10;
        this.fireTimer = 0;
        this.isHover = false;
        this.isSelected = false;
        this.hasTarget = false;
        this.x = x;
        this.y = y;
        this.theta = 0;
    }
    draw() {
        const color = this.isHover || this.isSelected ? colors.ULTRABRIGHT : colors.SOLID;
        canvas.arrowDeg(this.x, this.y, this.theta, 8, 3, 3, color, "square");
        canvas.arrowDeg(this.x, this.y, this.theta + Math.PI, 8, 0, 3, color);
        canvas.strokeCircle(this.x, this.y, this.size / 2, color, 1);
    }
    drawRange() {
        canvas.strokeCircle(this.x, this.y, this.range, colors.ULTRABRIGHT, 1);
    }
    getValidEnemies() {
        return gameSession.enemies.filter(e => {
            if (this.distanceToSq(e) < Math.pow((this.range + (e.size / 2)), 2)) {
                return true;
            }
            return false;
        });
    }
    distanceToSq(e) {
        const dx = e.x - this.x;
        const dy = e.y - this.y;
        return Math.pow(dx, 2) + Math.pow(dy, 2);
    }
    target() {
        const validEnemies = this.getValidEnemies();
        if (validEnemies.length == 0) {
            this.hasTarget = false;
            return;
        }
        else {
            this.hasTarget = true;
        }
        let bestTarget = validEnemies[0];
        switch (this.targeting) {
            case targeting.FIRST:
                validEnemies.forEach(e => {
                    if (e.distance > bestTarget.distance) {
                        bestTarget = e;
                    }
                });
                break;
            case targeting.LAST:
                validEnemies.forEach(e => {
                    if (e.distance < bestTarget.distance) {
                        bestTarget = e;
                    }
                });
                break;
            case targeting.STRONG:
                validEnemies.forEach(e => {
                    if (e.health < bestTarget.health) {
                        bestTarget = e;
                    }
                });
                break;
            case targeting.CLOSE:
                validEnemies.forEach(e => {
                    if (this.distanceToSq(e) < this.distanceToSq(bestTarget)) {
                        bestTarget = e;
                    }
                });
                break;
            default:
                null;
        }
        this.lookAt(bestTarget);
    }
    lookAt(e) {
        if (e.x > this.x) {
            this.theta = Math.atan((this.y - e.y) / (this.x - e.x));
        }
        else if (e.x < this.x) {
            this.theta = Math.PI + Math.atan((this.y - e.y) / (this.x - e.x));
        }
        else {
            if (e.y > this.y) {
                this.theta = Math.PI / 2;
            }
            else {
                this.theta = 3 * Math.PI / 2;
            }
        }
    }
    fire() {
        gameSession.addProjectile(new Projectile(this.x, this.y, this.theta, 5, 1, 1, 20));
    }
    update() {
        const dx = Math.abs(cursor.x - this.x);
        const dy = Math.abs(cursor.y - this.y);
        if (dx < this.size / 2 && dy < this.size / 2) {
            this.isHover = true;
            if (cursor.click) {
                audioPlayer.playAudio(audios.OPEN);
                gameSession.setSelectedTower(this);
            }
        }
        else {
            this.isHover = false;
        }
        if (this.fireTimer <= 0) {
            this.target();
            if (this.hasTarget)
                this.fire();
            this.fireTimer = this.fireRate;
        }
        else {
            this.fireTimer--;
        }
    }
}
