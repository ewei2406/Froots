export var audios;
(function (audios) {
    audios["SELECT"] = "select.wav";
    audios["EXPLOSION"] = "explosion.wav";
    audios["SHOOTLASER"] = "shootLaser.wav";
})(audios || (audios = {}));
class AudioPlayer {
    constructor(...audioNames) {
        this.loadingAudio = {};
        this.sounds = {};
        this.globalVolume = 0.5;
        audioNames.forEach(audio => {
            this.loadingAudio[audio] = false;
            const a = new Audio(`assets/audio/${audio}`);
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
        switch (audioName) {
            case audios.SELECT:
                this.playRawAudio(audioName, this.globalVolume, 0.045);
                break;
            default:
                this.playRawAudio(audioName, this.globalVolume, 0);
        }
    }
    playRawAudio(audioName, volume, delay) {
        if (audioName in this.sounds) {
            const a = this.sounds[audioName].cloneNode();
            a.volume = volume;
            a.currentTime = delay;
            a.play();
            return a;
        }
        else {
            console.log(`Failed to play sound ${audioName}: not found`);
        }
    }
}
const audioPlayer = new AudioPlayer(audios.EXPLOSION, audios.SELECT, audios.SHOOTLASER);
export { audioPlayer };
