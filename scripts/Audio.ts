export enum audios {
    SELECT="select.wav",
    EXPLOSION="explosion.wav",
    SHOOTLASER="shootLaser.wav",
    DESTROY="destroy.wav",
    OPEN="open.wav",
    CLOSE="close.wav",
    SHOOT="shoot.wav",
    HIT="hit.wav"
}

class AudioPlayer {

    loadingAudio = {}
    sounds = {}
    globalVolume = 0.5

    constructor(...audioNames: Array<audios>) {
        
        audioNames.forEach(audio => {
            this.loadingAudio[audio] = false
            
            const a = new Audio(`assets/audio/${audio}`)
            a.preload = "auto"
            this.sounds[audio] = a
            a.oncanplaythrough = () => {
                this.loadingAudio[audio] = true
            }
        })
    }

    isReady(): boolean {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const [_key, value] of Object.entries(this.loadingAudio)) {
            if (!value) return false
        }
        return true
    }

    playAudio(audioName: audios) {
        this.playRawAudio(audioName, this.globalVolume)
    }

    playRawAudio(audioName: audios, volume: number) {
        console.log("PLAYING: " + audioName);
        
        if (audioName in this.sounds) {
            const a = this.sounds[audioName].cloneNode(true)
            a.volume = volume
            a.play()
        } else {
            console.log(`Failed to play sound ${audioName}: not found`)
        }
    }
}

const audioPlayer = new AudioPlayer(
    audios.EXPLOSION, 
    audios.SELECT, 
    audios.SHOOTLASER,
    audios.DESTROY,
    audios.OPEN,
    audios.CLOSE,
    audios.HIT,
    audios.SHOOT
    )

export { audioPlayer }