import { audioPlayer, audios } from "../Audio.js"
import { canvas } from "../Canvas.js"
import { colors, RgbColor } from "../Color.js"
import { gameSession } from "./GameSession.js"
import { ExplosionEffect } from "./Particle.js"
import { Explosion, Projectile } from "./Projectile.js"
import { Track } from "./Tracks.js"

export enum enemyTypes {
    REGULAR, BOSS
}

export class Enemy {
    health: number
    initialHealth: number
    distance: number
    speed: number
    type: enemyTypes
    size: number
    color = new RgbColor(255, 0, 0)
    x = 0
    y = 0
    deathMoney: number

    projectilesHitBy: Array<Projectile>

    constructor(health: number, type = enemyTypes.REGULAR, distance=0) {
        this.distance = distance
        this.health = health
        this.initialHealth = health
        this.deathMoney = health
        this.type = type

        switch(this.type) {
            case enemyTypes.REGULAR:
                this.speed = Math.min(0.1 * (this.health + (gameSession.difficulty * 0.5) + 8), 6)
                this.size = 5 + this.health
                break
            case enemyTypes.BOSS:
                this.speed = 0.75
                this.size = 20
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
                }
            }
        })
    }

    getLivesLost() {
        switch (this.type) {
            case enemyTypes.BOSS:
                return 99999
                break
            case enemyTypes.REGULAR:
                return this.health
                break
        }
    }

    addHit(projectile: Projectile) {
        this.projectilesHitBy.push(projectile)
        if (projectile.isAlive()) projectile.useHit(this)
    }

    update(track: Track) {
        this.distance += this.speed
        const pos = track.getPosition(this.distance)
        this.x = pos.x
        this.y = pos.y

        this.checkCollisions(gameSession.projectiles)

        this.color.r = (this.health / this.initialHealth) * 255
    }

    isAlive() {
        return this.health > 0
    }

    deathEffect() {
        switch (this.type) {
            case enemyTypes.BOSS:
                audioPlayer.playAudio(audios.EXPLOSION)
                gameSession.addParticle(new ExplosionEffect(this.x, this.y, 15, 20))
                break
            default:
                null
                break
        }
    }

    draw() {
        switch(this.type) {
            case enemyTypes.BOSS:
                for (let i = 0; i < this.initialHealth; i += 10) {
                    const color = (i <= this.health) ? colors.SOLID : colors.MEDIUM
                    canvas.strokeCircle(this.x, this.y, (i + 5) / 4, color, 2)
                }
                break
            case enemyTypes.REGULAR:
                canvas.strokeCircle(this.x, this.y, this.size / 2, this.color, 2)
                break
        }
    }

    drawBoundingBox() {
        canvas.strokeRect(this.x - (this.size / 2), this.y - (this.size / 2), this.size, this.size, colors.DEBUG, 1)
    }
}