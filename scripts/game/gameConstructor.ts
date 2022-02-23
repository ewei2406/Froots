import { difficulties, gameModes } from "./GameModes.js";
import { gameSession } from "./GameSession.js";
import { Track, TrackNames, tracks } from "./Tracks.js";

class GameConstructor {
    trackName = TrackNames.TWO
    difficulty = difficulties.EASY
    gameMode = gameModes.NORMAL

    cycleDifficulty() {
        this.difficulty++
        if (this.difficulty >= Object.values(difficulties).length / 2) {
            this.difficulty = 0
        }
    }

    cycleGameMode() {
        this.gameMode++
        if (this.gameMode >= Object.values(gameModes).length / 2) {
            this.gameMode = 0
        }
    }

    createGameSession(): void {
        gameSession.initialize(this.trackName, this.difficulty, this.gameMode)
    }

    getTrackName(): TrackNames {
        return this.trackName
    }

    getDifficulty(): difficulties {
        return this.difficulty
    }

    getGameMode(): gameModes {
        return this.gameMode
    }

    reset() {
        this.trackName = TrackNames.TWO
        this.difficulty = difficulties.EASY
        this.gameMode = gameModes.NORMAL
    }
}

const gameConstructor = new GameConstructor()

export { gameConstructor }