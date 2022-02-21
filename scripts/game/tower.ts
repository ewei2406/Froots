import { audioPlayer, audios } from "../Audio.js"
import { canvas } from "../Canvas.js"
import { colors } from "../Color.js"
import { cursor } from "../ui/Cursor.js"
import { gameSession } from "./gameSession.js"

enum towerState {
    IDLE
}

export class Tower {

    x: number
    y: number
    size = 15
    range = 50
    theta: number
    state = towerState.IDLE 

    isHover = false
    isSelected = false

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.theta = 0
    }

    draw() {
        const color = this.isHover || this.isSelected ? colors.ULTRABRIGHT : colors.SOLID
    
        canvas.arrowDeg(this.x, this.y, this.theta, 10, 3, 5, color)
        canvas.arrowDeg(this.x, this.y, this.theta + Math.PI, 10, 0, 5, color)

        canvas.strokeRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size, color, 1)
    }

    drawRange() {
        canvas.strokeCircle(this.x, this.y, this.range, colors.ULTRABRIGHT, 1)
    }

    update() {
        const dx = Math.abs(cursor.x - this.x)
        const dy = Math.abs(cursor.y - this.y)
        if (dx < this.size / 2 && dy < this.size / 2) {
            this.isHover = true

            if (cursor.click) {
                audioPlayer.playAudio(audios.OPEN)
                gameSession.setSelectedTower(this)
            }
            
        } else {
            this.isHover = false
        }
    }
}