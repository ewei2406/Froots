import { tracks } from "./tracks";
class GameSession {
    constructor(trackName, difficulty, gameMode) {
        this.trackName = trackName;
        this.difficulty = difficulty;
        this.gameMode = gameMode;
        this.track = tracks.getTrack(this.trackName);
    }
    drawTrack() {
        this.track.draw();
    }
}
GameSession;
