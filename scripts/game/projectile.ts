import { audioPlayer, audios } from "../Audio.js"
import { canvas } from "../Canvas.js"
import { colors } from "../Color.js"
import { Enemy } from "./Enemy.js"
import { gameSession } from "./GameSession.js"
import { ExplosionEffect } from "./Particle.js"
import { getAngle, getTarget, targeting } from "./Tower.js"

export class Projectile {
    x: number
    y: number
    theta: number
    speed: number
    pierce: number
    damage: number
    lifespan = 0
    size: number
    maxLifespan: number
    mute: boolean

    constructor(x: number, y: number, theta: number, speed: number, pierce: number, damage: number, maxLifespan: number, size: number, mute=false) {
        this.x = x
        this.y = y
        this.theta = theta
        this.speed = speed
        this.pierce = pierce
        this.damage = damage
        this.maxLifespan = maxLifespan
        this.size = size
        this.mute = mute
    }

    update() {
        this.x += this.speed * Math.cos(this.theta)
        this.y += this.speed * Math.sin(this.theta)
        this.lifespan++
    }

    useHit(e: Enemy) {
        if (this.isAlive()) {
            this.pierce--
            e.health -= this.damage
            if (!this.mute) audioPlayer.playAudio(audios.HIT)
        }
    }

    isAlive() {
        return this.lifespan <= this.maxLifespan && this.pierce > 0
    }

    draw() {
        canvas.drawPixel(this.x, this.y, 2, colors.ULTRABRIGHT)
        // canvas.arrowDeg(this.x, this.y, this.theta, 5, 2, 2, colors.SOLID)
        // canvas.arrowDeg(this.x, this.y, this.theta + Math.PI, 5, 0, 2, colors.SOLID)
    }
}

export class Bomb extends Projectile {
    
    explosionPierce: number
    explosionDamage: number
    explosionSize: number
    flash = 0

    constructor(x: number, y: number, theta: number, speed: number, explosionPierce: number, explosionDamage: number, maxLifespan: number, explosionSize: number, bombSize: number) {
        super(x, y, theta, speed, 1, 0, maxLifespan, bombSize)
        this.explosionPierce = explosionPierce
        this.explosionDamage = explosionDamage
        this.explosionSize = explosionSize
    }

    update(): void {
        this.flash++
        this.x += this.speed * Math.cos(this.theta)
        this.y += this.speed * Math.sin(this.theta)
        this.lifespan++
    }

    useHit(e: Enemy) {
        if (this.isAlive()) {
            this.pierce--
            gameSession.addParticle(new ExplosionEffect(this.x, this.y, 5, this.explosionSize))
            gameSession.addProjectile(new Explosion(this.x, this.y, this.explosionPierce, this.explosionDamage, this.explosionSize * 2, true))
            audioPlayer.playAudio(audios.EXPLOSION)
        }
    }

    draw() {
        canvas.drawPixel(this.x, this.y, (this.flash % 5) ? 2 : 3, (this.flash % 5) ? colors.SOLID : colors.ULTRABRIGHT)
    }
}

export class Missile extends Bomb {

    accel: number
    missileTargeting: targeting
    target: Enemy
    maxSpeed: number

    constructor(x: number, y: number, theta: number, speed: number, 
        explosionPierce: number, explosionDamage: number, maxLifespan: number, 
        explosionSize: number, bombSize: number, initialTarget: Enemy, missileTargeting = targeting.CLOSE) 
        {
        super(x, y, theta, speed, explosionPierce, explosionDamage, maxLifespan, explosionSize, bombSize)
        this.accel = 0.2
        this.missileTargeting = missileTargeting
        this.target = initialTarget

        this.maxSpeed = speed
        this.speed = 0
    }

    update(): void {
        this.speed = Math.min(this.speed + this.accel, this.maxSpeed)

        this.flash++
        this.x += this.speed * Math.cos(this.theta)
        this.y += this.speed * Math.sin(this.theta)
        this.lifespan++

        if (this.flash % 3 == 0) gameSession.addParticle(new ExplosionEffect(this.x, this.y, 3, 3))
        
        if (this.target) {
            const desiredAngle = getAngle(this, this.target)

            // const dtheta = (((this.theta % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) -
            //     (((desiredAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2))

            let dtheta = ((this.theta - desiredAngle) % (Math.PI * 2)) + (Math.PI * 2)
            dtheta %= (Math.PI * 2)

            if (dtheta < Math.PI) {
                this.theta -= 0.1
            } else {
                this.theta += 0.1
            }

            if (!this.target.isAlive()) {
                console.log("CHANGING TARGET");
                this.target = getTarget(this, gameSession.enemies, this.missileTargeting)
            }
        } else {
            this.target = getTarget(this, gameSession.enemies, this.missileTargeting)
        }
    }

    draw() {
        canvas.arrowDeg(this.x, this.y, this.theta, 5, 3, 2, colors.SOLID)

        if (this.target) {
            canvas.strokeCircle(this.target.x, this.target.y, 8, colors.SOLID, 1)
            canvas.arrowDeg(this.target.x, this.target.y, 0, 10, 0, 1, colors.SOLID)
            canvas.arrowDeg(this.target.x, this.target.y, Math.PI / 2, 10, 0, 1, colors.SOLID)
            canvas.arrowDeg(this.target.x, this.target.y, Math.PI, 10, 0, 1, colors.SOLID)
            canvas.arrowDeg(this.target.x, this.target.y, -Math.PI / 2, 10, 0, 1, colors.SOLID)
        }
    }
}

export class Explosion extends Projectile {
    constructor(x: number, y: number, pierce: number, damage: number, size: number, mute: boolean) {
        super(x, y, 0, 0, pierce, damage, 1, size, mute)
    }

    draw(): void {
        // canvas.fillCircle(this.x, this.y, this.size, colors.DEBUG)
    }
}