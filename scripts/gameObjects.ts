import Canvas from "./Canvas.js"
import { Colors } from "./Color.js"

export interface gameObject {
    x: number
    y: number
    w: number
    h: number
    draw(canvas: Canvas)
}