import { difficulties, gameModes } from "./gameModes.js";
import { Track, TrackNames, tracks } from "./tracks.js";

class GameConstructor {
    trackName = TrackNames.TRACK1
    difficulty = difficulties.EASY
    gameMode = gameModes.NORMAL
}

const gameConstructor = new GameConstructor()

export { gameConstructor }