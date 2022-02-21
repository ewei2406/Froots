import { Enemy } from "./enemy.js";
import { gameModes } from "./gameModes.js";
import { gameSession } from "./gameSession.js";
class GameModeRounds {
    constructor() {
        this.gameModeRounds = {};
    }
    addGameModeRounds(gameMode, rounds) {
        this.gameModeRounds[gameMode] = rounds;
    }
    getGameModeRounds(gameMode) {
        return this.gameModeRounds[gameMode];
    }
}
export class Rounds {
    constructor() {
        this.length = 0;
        this.rounds = {};
    }
    addRound(round) {
        this.length++;
        this.rounds[this.length] = round;
    }
    getRound(roundNum) {
        this.rounds[roundNum].reset();
        return this.rounds[roundNum];
    }
}
class EnemyData {
    constructor(dt, health, size = 0, distance = 0) {
        this.health = health;
        this.dt = dt;
    }
    getEnemy() {
        return new Enemy(this.health);
    }
}
export class Round {
    constructor() {
        this.t = 0;
        this.enemyData = [];
        this.numRemaining = 0;
    }
    reset() {
        this.t = 0;
        this.numRemaining = this.enemyData.length;
    }
    update() {
        this.enemyData.forEach(e => {
            if (this.t == e.dt) {
                this.numRemaining--;
                gameSession.addEnemy(e.getEnemy());
            }
        });
        this.t++;
    }
    addEnemyData(enemyData) {
        this.enemyData.push(enemyData);
        this.numRemaining++;
    }
    addGroup(t_0, spacing, count, health) {
        for (let i = 0; i < count; i++) {
            this.addEnemyData(new EnemyData(t_0 + spacing * i, health));
        }
        return this;
    }
}
const normalRounds = new Rounds();
normalRounds.addRound(new Round().addGroup(0, 20, 10, 1));
normalRounds.addRound(new Round().addGroup(0, 10, 10, 4).addGroup(110, 5, 10, 5));
const gameModeRounds = new GameModeRounds();
gameModeRounds.addGameModeRounds(gameModes.NORMAL, normalRounds);
export { gameModeRounds };
