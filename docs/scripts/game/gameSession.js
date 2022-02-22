import { audioPlayer, audios } from "../Audio.js";
import { canvas } from "../Canvas.js";
import { colors } from "../Color.js";
import { Fonts } from "../Font.js";
import { session } from "../Session.js";
import { Button } from "../ui/Button.js";
import { cursor } from "../ui/Cursor.js";
import { TextObject } from "../ui/Text.js";
import { UiObject } from "../ui/UiObject.js";
import { difficulties } from "./gameModes.js";
import { gameModeRounds } from "./rounds.js";
import { towerGenerator } from "./tower.js";
import { tracks } from "./tracks.js";
var sessionState;
(function (sessionState) {
    sessionState[sessionState["WAITING"] = 0] = "WAITING";
    sessionState[sessionState["ROUND"] = 1] = "ROUND";
})(sessionState || (sessionState = {}));
var shopState;
(function (shopState) {
    shopState[shopState["NONE"] = 0] = "NONE";
    shopState[shopState["SHOP"] = 1] = "SHOP";
    shopState[shopState["PLACETOWER"] = 2] = "PLACETOWER";
})(shopState || (shopState = {}));
export class GameSession extends UiObject {
    constructor() {
        super(0, 0, canvas.width, canvas.height);
        this.startFlash = 0;
        this.endFlash = 0;
        this.showShop = shopState.NONE;
        this.buyText = new TextObject("Click to place tower", 70, 282, 10, Fonts.BODY, colors.SOLID);
        this.cancelButton = new Button("CANCEL", 5, 277, 10, () => null);
        this.HUD = {
            // "track": new TextObject("T", 30, 5, 10, Fonts.BODY, colors.SOLID),
            "roundNumber": new TextObject("R", 340, 5, 10, Fonts.BODY, colors.SOLID),
            "lives": new TextObject("♥", 30, 5, 10, Fonts.BODY, colors.SOLID),
            "cash": new TextObject("$", 30, 15, 10, Fonts.BODY, colors.SOLID),
        };
        this.startButton = new Button("NEXT ROUND", 310, 277, 10, () => null);
        this.shopButton = new Button("SHOP", 5, 277, 10, () => null);
        this.pauseButton = new Button("❚❚", 5, 5, 10, () => null);
        this.startButton.onClick = (function () {
            this.startNextRound();
        }).bind(this);
        this.pauseButton.onClick = (function () {
            session.setCurrentScreen("PAUSED" /* PAUSED */);
        }).bind(this);
        this.shopUI = [];
        this.shopTowerButtons = [];
        this.shopButton.onClick = (function () {
            this.showShop = shopState.SHOP;
        }).bind(this);
        const n = towerGenerator.numTowers;
        const size = 20;
        const width = 100;
        this.addShopUI(new UiObject(5, 275 - (size * n), width, (size * n) + size, colors.EMPTY, colors.SOLID, 2));
        towerGenerator.availableTowers.forEach((towerName, i) => {
            const towerButton = new Button(towerName + " $" + towerGenerator.getBasePrice(towerName), 10, 275 - (size * i), 8, () => null);
            towerButton.w = width - 10;
            towerButton.onClick = (function () {
                this.buyTower(towerName);
            }).bind(this);
            towerButton.towerPrice = towerGenerator.getBasePrice(towerName);
            this.shopTowerButtons.push(towerButton);
        });
        this.addShopUI(new TextObject("SHOP", 7, 280 - (size * n), 10, Fonts.BODY, colors.SOLID));
        const closeShop = new Button("X", width - 12, 275 - (size * n), 10, () => null);
        closeShop.onClick = (function () {
            this.showShop = shopState.NONE;
        }).bind(this);
        closeShop.borderWidth = 0;
        this.addShopUI(closeShop);
        this.cancelButton.onClick = (function () {
            this.showShop = shopState.SHOP;
        }).bind(this);
        // this.initialize(TrackNames.TRACK3, difficulties.DEATH, gameModes.NORMAL)
    }
    createTowerButton() {
        //
    }
    addShopUI(uiObject) {
        this.shopUI.push(uiObject);
    }
    initialize(trackName, difficulty, gameMode) {
        console.log("INITALIZED!");
        this.trackName = trackName;
        this.difficulty = difficulty;
        this.gameMode = gameMode;
        this.enemies = [];
        this.towers = [];
        this.projectiles = [];
        this.particles = [];
        this.track = tracks.getTrack(this.trackName);
        switch (difficulty) {
            case difficulties.MEDIUM:
                this.cash = 800;
                this.lives = 100;
                break;
            case difficulties.HARD:
                this.cash = 600;
                this.lives = 40;
                break;
            case difficulties.DEATH:
                this.cash = 400;
                this.lives = 1;
                break;
            default: // Easy
                this.cash = 1000;
                this.lives = 200;
                break;
        }
        this.startButton.calcSize();
        this.roundNumber = 0;
        this.roundQueue = gameModeRounds.getGameModeRounds(this.gameMode);
        this.currentRound = this.roundQueue.getRound(1);
        this.currentState = sessionState.WAITING;
        this.startButton.disabled = false;
        this.canPlace = false;
        // this.addTower(new LaserTower(100, 80))
        // this.addTower(new Tower(150, 80))
        // this.addTower(new BombTower(100, 80))
    }
    buyTower(towerName) {
        if (this.cash >= towerGenerator.getBasePrice(towerName)) {
            this.attemptingToBuy = towerName;
            this.showShop = shopState.PLACETOWER;
        }
    }
    addTower(tower) {
        this.towers.push(tower);
    }
    addProjectile(projectile) {
        this.projectiles.push(projectile);
    }
    addParticle(particle) {
        this.particles.push(particle);
    }
    setSelectedTower(tower) {
        if (this.selectedTower)
            this.selectedTower.isSelected = false;
        this.selectedTower = tower;
        if (this.selectedTower)
            this.selectedTower.isSelected = true;
    }
    addEnemy(enemy) {
        this.enemies.push(enemy);
        this.startFlash = 5;
    }
    drawTrack() {
        this.track.draw();
    }
    drawTrackStart() {
        this.track.drawStart();
    }
    drawTrackEnd() {
        this.track.drawEnd();
    }
    drawHUD() {
        this.HUD.roundNumber.draw();
        this.HUD.cash.draw();
        this.HUD.lives.draw();
        // this.HUD.track.draw()
    }
    drawEnemies() {
        this.enemies.forEach(e => e.draw());
    }
    drawTowers() {
        this.towers.forEach(t => t.draw());
        if (this.selectedTower)
            this.selectedTower.drawRange();
    }
    drawProjectiles() {
        this.projectiles.forEach(p => p.draw());
    }
    drawParticles() {
        this.particles.forEach(p => p.draw());
    }
    drawShop() {
        this.shopUI.forEach(s => s.draw());
        this.shopTowerButtons.forEach(b => b.draw());
    }
    drawPlaceTower() {
        if (this.canPlace) {
            canvas.arrowDeg(cursor.x, cursor.y - 10, Math.PI / 2, 5, 3, 2, colors.SOLID);
            canvas.arrowDeg(cursor.x + 8, cursor.y + 4, (7 / 6) * Math.PI, 5, 3, 2, colors.SOLID);
            canvas.arrowDeg(cursor.x - 8, cursor.y + 4, -(1 / 6) * Math.PI, 5, 3, 2, colors.SOLID);
        }
        canvas.strokeCircle(cursor.x, cursor.y, towerGenerator.getRange(this.attemptingToBuy), colors.MEDIUM, 2);
    }
    draw() {
        this.drawTrack();
        this.drawTrackStart();
        this.drawTrackEnd();
        this.drawEnemies();
        this.drawTowers();
        this.drawProjectiles();
        this.drawParticles();
        this.drawHUD();
        this.startButton.draw();
        this.pauseButton.draw();
        switch (this.showShop) {
            case shopState.NONE:
                this.shopButton.draw();
                break;
            case shopState.SHOP:
                this.drawShop();
                break;
            case shopState.PLACETOWER:
                this.drawPlaceTower();
                this.cancelButton.draw();
                this.buyText.draw();
                break;
        }
    }
    loseLives(numLives) {
        audioPlayer.playAudio(audios.DESTROY);
        this.endFlash = 5;
        this.lives -= numLives;
        if (this.lives <= 0) {
            session.setCurrentScreen("LOSE" /* LOSE */);
        }
    }
    startNextRound() {
        if (this.roundNumber < this.roundQueue.length) {
            this.startButton.disabled = true;
            this.currentState = sessionState.ROUND;
            this.projectiles = [];
            this.currentRound = this.roundQueue.getRound(this.roundNumber + 1);
        }
    }
    endCurrentRound() {
        this.currentState = sessionState.WAITING;
        this.startButton.disabled = false;
        this.roundNumber++;
        this.cash += 150 - (this.difficulty * 25);
        if (this.roundNumber == this.roundQueue.length) {
            session.currentScreen = "WIN" /* WIN */;
        }
    }
    updateEnemies() {
        this.enemies = this.enemies.filter(e => {
            e.update(this.track);
            if (e.distance >= this.track.length) { // Enemy escaped!
                this.loseLives(e.getLivesLost());
                return false;
            }
            else {
                if (e.isAlive()) {
                    return true;
                }
                else {
                    this.cash += e.deathMoney;
                    return false;
                }
            }
        });
    }
    updateHUD() {
        this.HUD.roundNumber.text = "R " + this.roundNumber + "/" + this.roundQueue.length;
        this.HUD.cash.text = "$ " + this.cash;
        this.HUD.lives.text = "♥ " + this.lives;
    }
    updateTrack() {
        this.startFlash -= this.startFlash > 0 ? 1 : 0;
        this.endFlash -= this.endFlash > 0 ? 1 : 0;
        this.track.startColor = this.startFlash > 0 ? colors.ULTRABRIGHT : colors.SOLID;
        this.track.endColor = this.endFlash > 0 ? colors.ULTRABRIGHT : colors.SOLID;
    }
    updateTowers() {
        this.towers.forEach(t => t.update());
    }
    updateProjectiles() {
        this.projectiles = this.projectiles.filter(p => {
            p.update();
            return p.isAlive();
        });
    }
    updateParticles() {
        this.particles = this.particles.filter(p => {
            p.update();
            return p.isAlive();
        });
    }
    updateShop() {
        this.shopUI.forEach(s => s.update());
        this.shopTowerButtons.forEach(b => {
            if (this.cash >= b.towerPrice) {
                b.disabled = false;
            }
            else {
                b.disabled = true;
            }
            b.update();
        });
    }
    updatePlaceTower() {
        this.canPlace = this.track.isValidPosition(cursor.x, cursor.y);
        this.buyText.text = "Click to place " + this.attemptingToBuy;
        if (this.canPlace && cursor.click && this.showShop == shopState.PLACETOWER) {
            console.log("PLACE");
            this.addTower(towerGenerator.getTower(this.attemptingToBuy, cursor.x, cursor.y));
            this.cash -= towerGenerator.getBasePrice(this.attemptingToBuy);
            this.showShop = shopState.NONE;
        }
    }
    update() {
        // this.HUD.track.text = "" + this.trackName
        if (this.currentState != sessionState.WAITING) {
            this.startButton.disabled = true;
        }
        switch (this.showShop) {
            case shopState.NONE:
                this.shopButton.update();
                break;
            case shopState.SHOP:
                this.updateShop();
                break;
            case shopState.PLACETOWER:
                this.cancelButton.update();
                this.updatePlaceTower();
                break;
        }
        this.startButton.update();
        this.pauseButton.update();
        if (this.currentState == sessionState.ROUND) {
            this.currentRound.update();
            if (this.currentRound.numRemaining == 0 && this.enemies.length == 0) {
                this.endCurrentRound();
            }
        }
        if (cursor.click && this.selectedTower) {
            this.setSelectedTower(null);
            audioPlayer.playAudio(audios.CLOSE);
        }
        this.updateEnemies();
        this.updateProjectiles();
        this.updateTrack();
        this.updateTowers();
        this.updateParticles();
        this.updateHUD();
    }
    onLoad() {
        this.startButton.calcSize();
        this.shopButton.calcSize();
        this.pauseButton.calcSize();
        this.cancelButton.calcSize();
    }
}
const gameSession = new GameSession();
export { gameSession };
