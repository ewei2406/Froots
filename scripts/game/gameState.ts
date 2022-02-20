import { difficulties, gameModes } from "./gameModes";
import { Track, TrackNames } from "./tracks";

class GameState {

    trackName: TrackNames
    difficulty: difficulties
    gameMode: gameModes

    constructor(trackName: TrackNames, difficulty: difficulties, gameMode: gameModes) {
        this.trackName = trackName
        this.difficulty = difficulty
        this.gameMode = gameMode
    }
}