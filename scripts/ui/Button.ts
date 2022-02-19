import { colors } from "../Color.js";
import { Fonts } from "../Font.js";
import { cursor } from "./Cursor.js";
import { TextObject } from "./Text.js";
import { canvas } from "../Canvas.js";

export class Button extends TextObject {

    onClick: () => void
    isHover = false
    hoverColor = colors.ULTRABRIGHT
    borderHoverColor = colors.ULTRABRIGHT
    baseColor = colors.SOLID
    disabled: boolean

    constructor(text: string, x: number, y: number, size: number, onClick: () => void, disabled=false) {
        super(text, x, y, size, Fonts.BODY, colors.SOLID, size * 0.5)
        this.disabled = disabled
        this.onClick = onClick
    }

    update(): void {
        if (!this.disabled) {
            if (cursor.x > this.x &&
                cursor.y > this.y &&
                cursor.x < this.x + this.w &&
                cursor.y < this.y + this.h) {
                this.isHover = true
                cursor.setPointer()

                if (cursor.click) this.onClick()

            } else {
                this.isHover = false
            }
        } else {
            this.isHover = false
        }
    }

    draw() {

        if (this.isHover) {
            this.color = colors.ULTRABRIGHT
            canvas.fillRect(this.x, this.y, this.w, this.h, this.hoverColor)
        } else {
            this.color = this.disabled ? colors.MEDIUM : this.baseColor
        }

        canvas.ctx.font = this.getFontString()
        canvas.ctx.fillStyle = this.isHover ? colors.VOID.toString() : this.color.toString()

        canvas.ctx.fillText(
            "" + this.text,
            this.x + this.padding,
            this.y + this.fontOffset + this.padding + 0.5,
            this.w)

        canvas.strokeRect(this.x, this.y, this.w, this.h, 
            this.isHover ? this.borderHoverColor.toString() : this.color.toString(), 
            this.padding * 0.5)
    }
}