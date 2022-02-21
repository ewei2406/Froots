import { canvas } from "../Canvas.js"
import { colors } from "../Color.js"
import { gameSession } from "./gameSession.js"
import { Track } from "./tracks.js"

enum enemyTypes {
    REGULAR
}

export class Enemy {
    health: number
    distance: number
    speed: number
    type: enemyTypes
    size: number
    x = 0
    y = 0

    constructor(health: number, type = enemyTypes.REGULAR, distance=0) {
        this.distance = distance
        this.health = health
        this.type = type

        switch(this.type) {
            case enemyTypes.REGULAR:
                this.speed = Math.min(0.25 * (this.health + gameSession.difficulty) + .75, 6)
                this.size = 5 + this.health
                break
            default:
                this.speed = 1
                this.size = 10
        }
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