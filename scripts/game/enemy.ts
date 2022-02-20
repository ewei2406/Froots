import { canvas } from "../Canvas.js"
import { colors } from "../Color.js"
import { Track } from "./tracks.js"

export class Enemy {
    health: number
    distance: number
    speed = 5
    size: number
    x = 0
    y = 0

    constructor(distance: number, health: number, size: number) {
        this.distance = distance
        this.health = health
        this.size = size
    }

    update(track: Track) {
        this.distance += this.speed
        const pos = track.getPosition(this.distance)
        this.x = pos.x
        this.y = pos.y
    }

    draw() {
        canvas.fillRect(this.x - (this.size / 2), this.y - (this.size / 2), this.size, this.size, colors.SOLID)
    }

    drawBoundingBox() {
        canvas.strokeRect(this.x - (this.size / 2), this.y - (this.size / 2), this.size, this.size, colors.DEBUG, 1)
    }
}

class RegularEnemy extends Enemy {
    constructor(distance: number, health: number) {
        super(distance, health, 10)

        switch(true) {
            case this.health >= 6:
                this.speed = 2
                break;
            default:
                this.speed = this.health * 0.33
                break;
        }
    }
}