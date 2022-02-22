import { difficulties, gameModes } from "./GameModes.js";
import { gameSession } from "./GameSession.js";
class GameConstructor {
    constructor() {
        this.trackName = "2" /* TRACK1 */;
        this.difficulty = difficulties.EASY;
        this.gameMode = gameModes.NORMAL;
    }
    cycleDifficulty() {
        this.difficulty++;
        if (this.difficulty >= Object.values(difficulties).length / 2) {
            this.difficulty = 0;
        }
    }
    cycleGameMode() {
        this.gameMode++;
        if (this.gameMode >= Object.values(gameModes).length / 2) {
            this.gameMode = 0;
        }
    }
    createGameSession() {
        gameSession.initialize(this.trackName, this.difficulty, this.gameMode);
    }
    getTrackName() {
        return this.trackName;
    }
    getDifficulty() {
        return this.difficulty;
    }
    getGameMode() {
        return this.gameMode;
    }
    reset() {
        this.trackName = "2" /* TRACK1 */;
        this.difficulty = difficulties.EASY;
        this.gameMode = gameModes.NORMAL;
    }
}
const gameConstructor = new GameConstructor();
export { gameConstructor };
