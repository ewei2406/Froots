export var audios;
(function (audios) {
    audios["SELECT"] = "select.wav";
    audios["EXPLOSION"] = "explosion.wav";
    audios["SHOOTLASER"] = "shootLaser.wav";
    audios["DESTROY"] = "destroy.wav";
    audios["OPEN"] = "open.wav";
    audios["CLOSE"] = "close.wav";
    audios["SHOOT"] = "shoot.wav";
    audios["HIT"] = "hit.wav";
})(audios || (audios = {}));
class AudioPlayer {
    constructor(...audioNames) {
        this.loadingAudio = {};
        this.sounds = {};
        this.globalVolume = 0.5;
        audioNames.forEach(audio => {
            this.loadingAudio[audio] = false;
            const a = new Audio(`assets/audio/${audio}`);
            a.preload = "auto";
            this.sounds[audio] = a;
            a.oncanplaythrough = () => {
                this.loadingAudio[audio] = true;
            };
        });
    }
    isReady() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [_key, value] of Object.entries(this.loadingAudio)) {
            if (!value)
                return false;
        }
        return true;
    }
    playAudio(audioName) {
        this.playRawAudio(audioName, this.globalVolume);
    }
    playRawAudio(audioName, volume) {
        console.log("PLAYING: " + audioName);
        if (audioName in this.sounds) {
            const a = this.sounds[audioName].cloneNode(true);
            a.volume = volume;
            a.play();
        }
        else {
            console.log(`Failed to play sound ${audioName}: not found`);
        }
    }
}
const audioPlayer = new AudioPlayer(audios.EXPLOSION, audios.SELECT, audios.SHOOTLASER, audios.DESTROY, audios.OPEN, audios.CLOSE);
export { audioPlayer };
