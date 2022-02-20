import { difficulties, gameModes } from "./gameModes.js";
class GameConstructor {
    constructor() {
        this.trackName = "Logs" /* TRACK1 */;
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
}
const gameConstructor = new GameConstructor();
export { gameConstructor };
