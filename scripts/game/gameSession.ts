import { audioPlayer, audios } from "../Audio.js";
import { canvas } from "../Canvas.js";
import { colors } from "../Color.js";
import { Fonts } from "../Font.js";
import { screenNames, Screens } from "../Screens.js";
import { session } from "../Session.js";
import { Button } from "../ui/Button.js";
import { cursor } from "../ui/Cursor.js";
import { TextObject } from "../ui/Text.js";
import { UiObject } from "../ui/UiObject.js";
import { Enemy, enemyTypes } from "./Enemy.js";
import { difficulties, gameModes } from "./GameModes.js";
import { ExplosionEffect, LaserBeam, Particle } from "./Particle.js";
import { Bomb, Missile, Projectile } from "./Projectile.js";
import { gameModeRounds, Round, Rounds } from "./Rounds.js";
import { targeting, Tower, towerGenerator, towerNames } from "./Tower.js";
import { Track, TrackNames, tracks } from "./Tracks.js";


enum sessionState {
    WAITING, ROUND
}

enum shopState {
    NONE, SHOP, PLACETOWER
}

export class GameSession extends UiObject {

    trackName: TrackNames
    difficulty: difficulties
    gameMode: gameModes
    track: Track
    startFlash = 0
    endFlash = 0
    canPlace: boolean

    showShop = shopState.NONE
    shopUI: Array<UiObject>
    shopTowerButtons: Array<Button>

    attemptingToBuy: towerNames
    buyText = new TextObject("Click to place tower", 70, 282, 10, Fonts.BODY, colors.SOLID)
    cancelButton = new Button("CANCEL", 5, 277, 10, () => null)

    HUD = {
        // "track": new TextObject("T", 30, 5, 10, Fonts.BODY, colors.SOLID),
        "roundNumber": new TextObject("R", 340, 5, 10, Fonts.BODY, colors.SOLID),
        "lives": new TextObject("♥", 30, 5, 10, Fonts.BODY, colors.SOLID),
        "cash": new TextObject("$", 30, 15, 10, Fonts.BODY, colors.SOLID),
    }
    
    startButton = new Button("NEXT ROUND", 310, 277, 10, () => null)
    shopButton = new Button("SHOP", 5, 277, 10, () => null)
    pauseButton = new Button("❚❚", 5, 5, 10, () => null)
    speedButton = new Button("▸▸", 280, 277, 11, () => null)

    enabledFastForward = false

    currentState: sessionState
    currentRound: Round

    roundNumber: number
    roundQueue: Rounds
    cash: number
    lives: number

    enemies: Array<Enemy>
    towers: Array<Tower>
    selectedTower: Tower

    projectiles: Array<Projectile>
    particles: Array<Particle>

    constructor() {
        super(0, 0, canvas.width, canvas.height)

        this.startButton.onClick = (function () {
            this.startNextRound()
        }).bind(this)

        this.pauseButton.onClick = (function () {
            session.setCurrentScreen(screenNames.PAUSED)
        }).bind(this)

        this.shopUI = []
        this.shopTowerButtons = []
        
        this.shopButton.onClick = (function () {
            this.showShop = shopState.SHOP
        }).bind(this)

        const n = towerGenerator.numTowers
        const size = 20
        const width = 100
        this.addShopUI(new UiObject(
            5, 
            275 - (size * n), width, 
            (size * n) + size, 
            colors.EMPTY, colors.SOLID, 2))

        towerGenerator.availableTowers.forEach((towerName, i) => {
            const towerButton = new Button(
                towerName + " $" + towerGenerator.getBasePrice(towerName), 
                10, 275 - (size * i), 8, () => null)
            towerButton.w = width - 10

            towerButton.onClick = (function () {
                this.buyTower(towerName);
            }).bind(this)

            towerButton.towerPrice = towerGenerator.getBasePrice(towerName)

            this.shopTowerButtons.push(towerButton)
        })

        this.addShopUI(new TextObject("SHOP", 7, 280 - (size * n), 10, Fonts.BODY, colors.SOLID))

        const closeShop = new Button("X", width - 12, 275 - (size * n), 10, () => null)
        closeShop.onClick = (function () {
            this.showShop = shopState.NONE
        }).bind(this)

        closeShop.borderWidth = 0
        this.addShopUI(closeShop)

        this.cancelButton.onClick = (function () {
            this.showShop = shopState.SHOP
        }).bind(this)

        this.speedButton.onClick = (function () {
            this.enabledFastForward = !this.enabledFastForward
        }).bind(this)

        this.initialize(TrackNames.TWO, difficulties.EASY, gameModes.NORMAL)
    }

    createTowerButton() {
        //
    }

    addShopUI(uiObject: UiObject) {
        this.shopUI.push(uiObject)
    }

    initialize(trackName: TrackNames, difficulty: difficulties, gameMode: gameModes) {
        console.log("INITALIZED!");
        
        this.trackName = trackName
        this.difficulty = difficulty
        this.gameMode = gameMode
        this.enemies = []
        this.towers = []
        this.projectiles = []
        this.particles = []
        this.track = tracks.getTrack(this.trackName)

        switch(difficulty) {
            case difficulties.MEDIUM:
                this.cash = 600
                this.lives = 100
                break;
            case difficulties.HARD:
                this.cash = 400
                this.lives = 40
                break;
            case difficulties.DEATH:
                this.cash = 400
                this.lives = 1
                break
            default: // Easy
                this.cash = 800
                this.lives = 200
                break;
        }

        this.roundQueue = gameModeRounds.getGameModeRounds(gameModes.NORMAL)

        
        this.startButton.calcSize()

        this.roundNumber = 0

        
        this.currentRound = this.roundQueue.getRound(1)
        this.currentState = sessionState.WAITING
        this.startButton.disabled = false
        this.canPlace = false

        // this.addTower(new LaserTower(100, 80))
        // this.addTower(new Tower(150, 80))
        // this.addTower(new BombTower(100, 80))
    }

    buyTower(towerName: towerNames) {
        if (this.cash >= towerGenerator.getBasePrice(towerName)) {
            this.attemptingToBuy = towerName
            this.showShop = shopState.PLACETOWER
        }
    }
    
    addTower(tower: Tower) {
        this.towers.push(tower)
    }

    addProjectile(projectile: Projectile) {
        this.projectiles.push(projectile)
    }

    addParticle(particle: Particle) {
        this.particles.push(particle)
    }

    setSelectedTower(tower: Tower) {
        if (this.selectedTower) this.selectedTower.isSelected = false
        this.selectedTower = tower
        if (this.selectedTower) this.selectedTower.isSelected = true
    }

    addEnemy(enemy: Enemy) {
        this.enemies.push(enemy)
        this.startFlash = 5
    }

    drawTrack() {
        this.track.draw()
    }

    drawTrackStart() {
        this.track.drawStart()
    }

    drawTrackEnd() {
        this.track.drawEnd()
    }

    drawHUD() {
        this.HUD.roundNumber.draw()
        this.HUD.cash.draw()
        this.HUD.lives.draw()
        // this.HUD.track.draw()
    }

    drawEnemies() {
        this.enemies.forEach(e => e.draw())
    }

    drawTowers() {
        this.towers.forEach(t => t.draw())
        if (this.selectedTower) this.selectedTower.drawRange()
    }

    drawProjectiles() {
        this.projectiles.forEach(p => p.draw())
    }

    drawParticles() {
        this.particles.forEach(p => p.draw())
    }

    drawShop() {
        this.shopUI.forEach(s => s.draw())
        this.shopTowerButtons.forEach(b => b.draw())
    }

    drawPlaceTower() {
        if (this.canPlace) {
            canvas.arrowDeg(cursor.x, cursor.y - 10, Math.PI / 2, 5, 3, 2, colors.SOLID)
            canvas.arrowDeg(cursor.x + 8, cursor.y + 4, (7 / 6) * Math.PI, 5, 3, 2, colors.SOLID)
            canvas.arrowDeg(cursor.x - 8, cursor.y + 4, - (1 / 6) * Math.PI, 5, 3, 2, colors.SOLID)
        }
        canvas.strokeCircle(cursor.x, cursor.y, towerGenerator.getRange(this.attemptingToBuy), colors.MEDIUM, 2)
    }

    draw(): void {
        
        this.drawTrack()
        this.drawTrackStart()
        this.drawTrackEnd()

        this.drawEnemies()
        this.drawTowers()
        this.drawProjectiles()
        this.drawParticles()

        this.drawHUD()

        this.startButton.draw()
        this.pauseButton.draw()
        this.speedButton.draw()

        switch (this.showShop) {
            case shopState.NONE:
                this.shopButton.draw()
                break
            case shopState.SHOP:
                this.drawShop()
                break
            case shopState.PLACETOWER:
                this.drawPlaceTower()
                this.cancelButton.draw()
                this.buyText.draw()
                break
        }
    }

    loseLives(numLives: number) {
        audioPlayer.playAudio(audios.DESTROY)
        this.endFlash = 5
        this.lives -= numLives

        if (this.lives <= 0) {
            session.setCurrentScreen(screenNames.LOSE)
        }
    }

    startNextRound(): void {
        if (this.roundNumber < this.roundQueue.length) {
            this.startButton.disabled = true
            this.currentState = sessionState.ROUND
            this.projectiles = []
            this.currentRound = this.roundQueue.getRound(this.roundNumber + 1)
        }
    }

    endCurrentRound(): void {
        this.currentState = sessionState.WAITING
        this.startButton.disabled = false
        this.roundNumber++

        this.cash += 250 - (this.difficulty * 50)

        if (this.roundNumber == this.roundQueue.length) {
            session.currentScreen = screenNames.WIN
        }

        switch (this.gameMode) {
            case gameModes.NOPAUSE:
                this.startNextRound()
                break
            case gameModes.RECESSION:
                this.cash = Math.round(0.9 * this.cash)
                break
        }
    }

    updateEnemies() {
        this.enemies = this.enemies.filter(e => {
            e.update(this.track)
            if (e.distance >= this.track.length) { // Enemy escaped!
                this.loseLives(e.getLivesLost())
                return false
            } else {
                if (e.isAlive()) {
                    return true
                } else {
                    this.cash += e.deathMoney
                    if (e.type == enemyTypes.BOSS) {
                        e.deathEffect()
                    }
                    return false
                }
            }
        })
    }

    updateHUD() {
        this.HUD.roundNumber.text = "R " + this.roundNumber + "/" + this.roundQueue.length
        this.HUD.cash.text = "$ " + this.cash
        this.HUD.lives.text = "♥ " + this.lives
    }

    updateTrack() {
        this.startFlash -= this.startFlash > 0 ? 1 : 0
        this.endFlash -= this.endFlash > 0 ? 1 : 0
        this.track.startColor = this.startFlash > 0 ? colors.ULTRABRIGHT : colors.SOLID
        this.track.endColor = this.endFlash > 0 ? colors.ULTRABRIGHT : colors.SOLID
    }

    updateTowers() {
        this.towers.forEach(t => t.update())
    }

    updateProjectiles() {
        this.projectiles = this.projectiles.filter(p => {
            p.update()
            return p.isAlive()
        })
    }

    updateParticles() {
        this.particles = this.particles.filter(p => {
            p.update()
            return p.isAlive()
        })
    }

    updateShop() {
        this.shopUI.forEach(s => s.update())
        this.shopTowerButtons.forEach(b => {
            if (this.cash >= b.towerPrice) {
                b.disabled = false
            } else {
                b.disabled = true
            }
            b.update()
        })
    }


    updatePlaceTower() {
        this.canPlace = this.track.isValidPosition(cursor.x, cursor.y)
        this.buyText.text = "Click to place " + this.attemptingToBuy

        if (this.canPlace && cursor.click && this.showShop == shopState.PLACETOWER) {
            console.log("PLACE");
            this.addTower(towerGenerator.getTower(this.attemptingToBuy, cursor.x, cursor.y))
            this.cash -= towerGenerator.getBasePrice(this.attemptingToBuy)
            this.showShop = shopState.NONE
        }
    }
 
    update(): void {
        // this.HUD.track.text = "" + this.trackName

        if(this.currentState != sessionState.WAITING) {
            this.startButton.disabled = true
        }

        switch (this.showShop) {
            case shopState.NONE:
                this.shopButton.update()
                break
            case shopState.SHOP:
                this.updateShop()
                break
            case shopState.PLACETOWER:
                this.cancelButton.update()
                this.updatePlaceTower()
                break
        }

        this.startButton.update()
        this.pauseButton.update()

        this.speedButton.update()
        this.speedButton.baseColor = this.enabledFastForward ? colors.ULTRABRIGHT : colors.SOLID

        if (this.currentState == sessionState.ROUND) {            
            if (this.enabledFastForward) this.currentRound.update()
            this.currentRound.update()

            if (this.currentRound.numRemaining == 0 && this.enemies.length == 0) {
                this.endCurrentRound()
            }
        }

        if (cursor.click && this.selectedTower) {
            this.setSelectedTower(null)
            audioPlayer.playAudio(audios.CLOSE)
        }

        if (this.enabledFastForward) {
            this.updateEnemies()
            this.updateProjectiles()

            this.updateTrack()
            this.updateTowers()

            this.updateParticles()
        }

        this.updateEnemies()
        this.updateProjectiles()

        this.updateTrack()
        this.updateTowers()

        this.updateParticles()
        this.updateHUD()

        // if (cursor.click) {
        //     this.addProjectile(new Missile(cursor.x, cursor.y, 0, 5, 1, 1, 300, 1, 1, null, targeting.FIRST))
        // }
    }

    onLoad(): void {
        this.startButton.calcSize()
        this.shopButton.calcSize()
        this.pauseButton.calcSize()
        this.cancelButton.calcSize()
        this.speedButton.calcSize()
    }
}

const gameSession = new GameSession()

export { gameSession }