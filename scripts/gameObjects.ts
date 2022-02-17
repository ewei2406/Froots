import Canvas from "./Canvas.js"

export interface gameObject {
    x: number
    y: number
    w: number
    h: number
    draw(canvas: Canvas)
    drawBoundingBox(canvas: Canvas)
}