import { gameObject } from "../gameObjects.js"
import { canvas } from "../Canvas.js"
import { Colors } from "../Color.js"
import { State } from "../Screens.js"

let maxId = 0

function generateId() {
    const id = maxId
    maxId++
    return id
}

export class UiObject implements gameObject {
    x: number
    y: number
    w: number
    h: number
    id: number
    canvas = canvas

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.id = generateId()
    }

    draw() {
        this.canvas.fillRect(this.x, this.y, this.w, this.h, Colors.SOLID)
    }

    update(): void {
        null
    }

    drawBoundingBox() {
        this.canvas.strokeRect(this.x, this.y, this.w, this.h, Colors.DEBUG, 1)
    }
}