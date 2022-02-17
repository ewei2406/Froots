import { gameObject } from "../gameObjects.js"
import Canvas from "../Canvas.js"
import { Colors } from "../Color.js"

export class UiObject implements gameObject {
    x: number
    y: number
    w: number
    h: number

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
    }

    draw(canvas: Canvas) {
        canvas.fillRect(this.x, this.y, this.w, this.h, Colors.Red)
    }
}