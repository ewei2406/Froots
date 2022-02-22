import { Enemy, enemyTypes } from "./Enemy.js";
import { gameModes } from "./GameModes.js";
import { gameSession } from "./GameSession.js";
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
    constructor(dt, health, type) {
        this.health = health;
        this.dt = dt;
        this.type = type;
    }
    getEnemy() {
        return new Enemy(this.health, this.type);
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
    addGroup(t_0, spacing, count, health, type = enemyTypes.REGULAR) {
        for (let i = 0; i < count; i++) {
            this.addEnemyData(new EnemyData(t_0 + spacing * i, health, type));
        }
        return this;
    }
}
const normalRounds = new Rounds();
normalRounds.addRound(new Round().addGroup(0, 20, 25, 1).addGroup(500, 1, 1, 2));
normalRounds.addRound(new Round().addGroup(0, 5, 30, 1));
normalRounds.addRound(new Round().addGroup(0, 10, 10, 2).addGroup(150, 10, 10, 2).addGroup(300, 10, 10, 1));
normalRounds.addRound(new Round().addGroup(0, 7, 20, 2).addGroup(180, 7, 20, 3));
normalRounds.addRound(new Round().addGroup(0, 3, 120, 1));
normalRounds.addRound(new Round().addGroup(0, 100, 1, 50, enemyTypes.BOSS));
normalRounds.addRound(new Round().addGroup(0, 8, 15, 5));
normalRounds.addRound(new Round().addGroup(0, 4, 15, 4).addGroup(80, 4, 15, 4).addGroup(160, 4, 15, 4));
normalRounds.addRound(new Round().addGroup(0, 1, 30, 3));
normalRounds.addRound(new Round().addGroup(0, 100, 1, 100, enemyTypes.BOSS));
const gameModeRounds = new GameModeRounds();
gameModeRounds.addGameModeRounds(gameModes.NORMAL, normalRounds);
export { gameModeRounds };
