import { gameObject } from "../gameObjects.js"
import { canvas } from "../Canvas.js"
import { Color, colors } from "../Color.js"

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
    color: Color

    constructor(x: number, y: number, w: number, h: number, color=colors.SOLID) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.id = generateId()
        this.color = color
    }

    draw() {
        canvas.fillRect(this.x, this.y, this.w, this.h, this.color)
    }

    update(): void {
        null
    }

    drawBoundingBox() {
        canvas.strokeRect(this.x, this.y, this.w, this.h, colors.DEBUG, 1)
    }

    onLoad(): void {
        return null
    }
}