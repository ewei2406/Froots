import { Color, Colors } from "../Color.js";
import { Fonts } from "../Font.js";
import { State } from "../Screens.js";
import { cursor } from "./Cursor.js";
import { TextObject } from "./Text.js";

export class Button extends TextObject {

    onClick: () => void
    isHover = false

    constructor(text: string, x: number, y: number, size: number, onClick: () => void) {
        super(text, x, y, size, Fonts.BODY, Colors.SOLID, size * 0.5)
        this.onClick = onClick
    }

    update(): void {
        if (cursor.x > this.x &&
            cursor.y > this.y &&
            cursor.x < this.x + this.w &&
            cursor.y < this.y + this.h) {
            this.isHover = true
            
            if (cursor.click) this.onClick()

        } else {
            this.isHover = false
        }
    }

    draw() {
        if (this.isHover) {
            this.color = Colors.ULTRABRIGHT
            this.canvas.fillRect(this.x, this.y, this.w, this.h, this.color.toString())
        } else {
            this.color = Colors.SOLID
        }

        this.canvas.ctx.font = this.getFontString()

        this.canvas.ctx.fillStyle = this.isHover ? Colors.VOID.toString() : this.color.toString()

        this.canvas.ctx.fillText(
            "" + this.text,
            this.x + this.padding,
            this.y + this.fontOffset + this.padding + 0.5,
            this.w)

        this.canvas.strokeRect(this.x, this.y, this.w, this.h, this.color, this.padding * 0.5)
    }
}