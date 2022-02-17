import Canvas from "../canvas";
import { Color } from "../Color";
import { UiObject } from "./UiObject";

export const enum Alignment {
    LEFT, CENTER, RIGHT
}
export class Text extends UiObject {

    text: string
    size: number
    font: string
    color: Color
    alignment: Alignment
    w: number
    h: number

    constructor (text: string, x: number, y: number, size: number, font: string, color: Color, alignment: Alignment, canvas: Canvas) {
        
        canvas.ctx.font = size + "px " + font
        super(x, y, canvas.ctx.measureText(text).width, size)
        
        this.text = text
        this.size = size
        this.font = font
        this.color = color
        this.alignment = alignment
    }
}