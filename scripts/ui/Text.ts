import { colors, RgbColor } from "../Color.js";
import { Fonts } from "../Font.js";
import { UiObject } from "./UiObject.js";

export class TextObject extends UiObject {

    text: string | number
    size: number
    font: string
    color: RgbColor
    fontOffset: number
    padding: number

    constructor(text: string | number, x: number, y: number, size: number, font: Fonts, color: RgbColor, padding = 0) {
        super(x, y, 0, 0)
        this.padding = padding
        this.text = text
        this.size = size
        this.font = font
        this.color = color
        this.calcSize()
    }

    getFontString(): string {
        return this.size + "px " + this.font
    }

    calcSize() {
        this.canvas.ctx.font = this.getFontString()
        
        const c = this.canvas.ctx.measureText("" + this.text)
        
        this.w = c.actualBoundingBoxRight + this.padding * 2 - c.actualBoundingBoxLeft
        this.h = c.actualBoundingBoxAscent + c.actualBoundingBoxDescent + this.padding * 2
        this.fontOffset = c.actualBoundingBoxAscent
    }

    draw() {
        this.canvas.ctx.font = this.getFontString()
        
        this.canvas.ctx.fillStyle = this.color.toString()
        this.canvas.ctx.fillText(
            "" + this.text, 
            this.x + this.padding + 0.5, 
            this.y + this.fontOffset + this.padding + 0.5)
    }
}

export class Heading extends TextObject {
    constructor(text: string, x: number, y: number, size: number) {
        super(text, x, y, size, Fonts.TITLE, colors.FLASHING, 0)
    }
}

export class Body extends TextObject {
    constructor(text: string, x: number, y: number) {
        super(text, x, y, 20, Fonts.BODY, colors.SOLID, 5)
    }
}