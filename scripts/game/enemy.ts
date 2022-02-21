import { canvas } from "../Canvas.js"
import { colors } from "../Color.js"
import { gameSession } from "./gameSession.js"
import { Projectile } from "./projectile.js"
import { Track } from "./tracks.js"

enum enemyTypes {
    REGULAR
}

export class Enemy {
    health: number
    initialHealth: number
    distance: number
    speed: number
    type: enemyTypes
    size: number
    color = colors.SOLID
    x = 0
    y = 0

    projectilesHitBy: Array<Projectile>

    constructor(health: number, type = enemyTypes.REGULAR, distance=0) {
        this.distance = distance
        this.health = health
        this.initialHealth = health
        this.type = type

        switch(this.type) {
            case enemyTypes.REGULAR:
                this.speed = Math.min(0.25 * (this.health + gameSession.difficulty + 1.5), 6)
                this.size = 5 + this.health
                break
            default:
                this.speed = 1
                this.size = 10
        }

        this.projectilesHitBy = []
    }


    checkAlreadyHit(projectile: Projectile) {
        return this.projectilesHitBy.some(p => p === projectile)
    }

    distanceToSq(p: Projectile) {
        const dx = p.x - this.x
        const dy = p.y - this.y

        return dx ** 2 + dy ** 2
    }

    checkCollisions(projectiles: Array<Projectile>) {
        projectiles.forEach(p => {
            if (!this.checkAlreadyHit(p)) {
                if (this.distanceToSq(p) < ((0.5 * (this.size + p.size)) ** 2)) {
                    this.addHit(p)
                    console.log("HIT!");
                    
                }
            }
        })
    }

    addHit(projectile: Projectile) {
        this.projectilesHitBy.push(projectile)
        projectile.useHit(this)
    }

    update(track: Track) {
        this.distance += this.speed
        const pos = track.getPosition(this.distance)
        this.x = pos.x
        this.y = pos.y

        this.color = colors.SOLID

        this.checkCollisions(gameSession.projectiles)

        this.color.r = (this.health / this.initialHealth) * 255
    }

    isAlive() {
        return this.health > 0
    }

    draw() {
        canvas.fillRect(this.x - (this.size / 2), this.y - (this.size / 2), this.size, this.size, this.color)
    }

    drawBoundingBox() {
        canvas.strokeRect(this.x - (this.size / 2), this.y - (this.size / 2), this.size, this.size, colors.DEBUG, 1)
    }
}