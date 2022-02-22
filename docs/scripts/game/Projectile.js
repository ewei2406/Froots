import { audioPlayer, audios } from "../Audio.js";
import { canvas } from "../Canvas.js";
import { colors } from "../Color.js";
import { gameSession } from "./GameSession.js";
import { ExplosionEffect } from "./Particle.js";
export class Projectile {
    constructor(x, y, theta, speed, pierce, damage, maxLifespan, size, mute = false) {
        this.lifespan = 0;
        this.x = x;
        this.y = y;
        this.theta = theta;
        this.speed = speed;
        this.pierce = pierce;
        this.damage = damage;
        this.maxLifespan = maxLifespan;
        this.size = size;
        this.mute = mute;
    }
    update() {
        this.x += this.speed * Math.cos(this.theta);
        this.y += this.speed * Math.sin(this.theta);
        this.lifespan++;
    }
    useHit(e) {
        if (this.isAlive()) {
            this.pierce--;
            e.health -= this.damage;
            if (!this.mute)
                audioPlayer.playAudio(audios.HIT);
        }
    }
    isAlive() {
        return this.lifespan <= this.maxLifespan && this.pierce > 0;
    }
    draw() {
        canvas.drawPixel(this.x, this.y, 2, colors.ULTRABRIGHT);
        // canvas.arrowDeg(this.x, this.y, this.theta, 5, 2, 2, colors.SOLID)
        // canvas.arrowDeg(this.x, this.y, this.theta + Math.PI, 5, 0, 2, colors.SOLID)
    }
}
export class Bomb extends Projectile {
    constructor(x, y, theta, speed, explosionPierce, explosionDamage, maxLifespan, explosionSize, bombSize) {
        super(x, y, theta, speed, 1, 0, maxLifespan, bombSize);
        this.flash = 0;
        this.explosionPierce = explosionPierce;
        this.explosionDamage = explosionDamage;
        this.explosionSize = explosionSize;
    }
    update() {
        this.flash++;
        this.x += this.speed * Math.cos(this.theta);
        this.y += this.speed * Math.sin(this.theta);
        this.lifespan++;
    }
    useHit(e) {
        if (this.isAlive()) {
            this.pierce--;
            gameSession.addParticle(new ExplosionEffect(this.x, this.y, 5, this.explosionSize));
            gameSession.addProjectile(new Explosion(this.x, this.y, this.explosionPierce, this.explosionDamage, this.explosionSize, true));
            audioPlayer.playAudio(audios.EXPLOSION);
        }
    }
    draw() {
        canvas.drawPixel(this.x, this.y, (this.flash % 5) ? 2 : 3, (this.flash % 5) ? colors.SOLID : colors.ULTRABRIGHT);
    }
}
export class Explosion extends Projectile {
    constructor(x, y, pierce, damage, size, mute) {
        super(x, y, 0, 0, pierce, damage, 1, size, mute);
    }
    draw() {
        // canvas.fillCircle(this.x, this.y, this.size, colors.DEBUG)
    }
}
