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
// awdawdawd
// awdwad
export class Rounds {
    constructor() {
        this.length = 0;
        this.rounds = {};
    }
    addRound(round) {
        this.length++;
        this.rounds[this.length] = round;
        console.log(this.length, round.totalHp);
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
        this.totalHp = 0;
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
        this.totalHp += enemyData.health;
    }
    addGroup(t_0, spacing, count, health, type = enemyTypes.REGULAR) {
        for (let i = 0; i < count; i++) {
            this.addEnemyData(new EnemyData(t_0 + spacing * i, health, type));
        }
        return this;
    }
}
const normalRounds = new Rounds();
// normalRounds.addRound(new Round().addGroup(0, 60, 10, 8))
normalRounds.addRound(new Round().addGroup(0, 15, 35, 1).addGroup(550, 1, 1, 2));
normalRounds.addRound(new Round().addGroup(0, 8, 35, 2));
normalRounds.addRound(new Round().addGroup(0, 10, 15, 2).addGroup(200, 10, 15, 2).addGroup(400, 10, 15, 2));
normalRounds.addRound(new Round().addGroup(0, 3, 120, 2));
normalRounds.addRound(new Round().addGroup(0, 5, 80, 1).addGroup(0, 100, 1, 60, enemyTypes.BOSS));
normalRounds.addRound(new Round().addGroup(0, 7, 20, 2).addGroup(180, 7, 20, 3));
normalRounds.addRound(new Round().addGroup(0, 8, 15, 6).addGroup(120, 8, 15, 6).addGroup(240, 8, 15, 6));
normalRounds.addRound(new Round().addGroup(0, 4, 15, 4).addGroup(80, 4, 15, 4).addGroup(160, 4, 15, 4));
normalRounds.addRound(new Round().addGroup(0, 1, 30, 3).addGroup(150, 1, 30, 3).addGroup(300, 1, 30, 3));
normalRounds.addRound(new Round().addGroup(0, 5, 120, 2).addGroup(0, 100, 1, 120, enemyTypes.BOSS));
normalRounds.addRound(new Round().addGroup(0, 5, 80, 2).addGroup(0, 10, 40, 6));
normalRounds.addRound(new Round().addGroup(0, 10, 30, 5).addGroup(0, 3, 100, 2));
normalRounds.addRound(new Round().addGroup(0, 1, 60, 3).addGroup(150, 1, 60, 3).addGroup(300, 1, 60, 3));
normalRounds.addRound(new Round().addGroup(0, 10, 30, 10));
normalRounds.addRound(new Round().addGroup(0, 5, 160, 3).addGroup(0, 100, 8, 40, enemyTypes.BOSS));
normalRounds.addRound(new Round().addGroup(0, 10, 45, 3).addGroup(200, 10, 45, 3).addGroup(400, 10, 45, 3));
normalRounds.addRound(new Round().addGroup(0, 10, 30, 14));
normalRounds.addRound(new Round().addGroup(0, 5, 100, 4).addGroup(100, 25, 20, 10));
normalRounds.addRound(new Round().addGroup(0, 12, 70, 8));
normalRounds.addRound(new Round().addGroup(0, 10, 120, 4).addGroup(0, 100, 12, 50, enemyTypes.BOSS).addGroup(1500, 1, 1, 250, enemyTypes.BOSS));
const gameModeRounds = new GameModeRounds();
gameModeRounds.addGameModeRounds(gameModes.NORMAL, normalRounds);
export { gameModeRounds };
