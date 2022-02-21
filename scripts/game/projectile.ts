import { canvas } from "../Canvas.js"
import { colors } from "../Color.js"
import { Enemy } from "./enemy.js"

export class Projectile {
    x: number
    y: number
    theta: number
    speed: number
    pierce: number
    damage: number
    lifespan = 0
    size = 5
    maxLifespan: number

    constructor(x: number, y: number, theta: number, speed: number, pierce: number, damage: number, maxLifespan: number) {
        this.x = x
        this.y = y
        this.theta = theta
        this.speed = speed
        this.pierce = pierce
        this.damage = damage
        this.maxLifespan = maxLifespan
    }

    update() {
        this.x += this.speed * Math.cos(this.theta)
        this.y += this.speed * Math.sin(this.theta)
        this.lifespan++
    }

    useHit(e: Enemy) {
        this.pierce--
        e.health -= this.damage
    }

    isAlive() {
        return this.lifespan < this.maxLifespan && this.pierce > 0
    }

    draw() {
        canvas.drawPixel(this.x, this.y, 2, colors.ULTRABRIGHT)
        // canvas.arrowDeg(this.x, this.y, this.theta, 5, 2, 2, colors.SOLID)
        // canvas.arrowDeg(this.x, this.y, this.theta + Math.PI, 5, 0, 2, colors.SOLID)
    }
}