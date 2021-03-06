import { colors } from "../Color.js";
import { Fonts } from "../Font.js";
import { cursor } from "./Cursor.js";
import { TextObject } from "./Text.js";
import { canvas } from "../Canvas.js";
import { audioPlayer, audios } from "../Audio.js";
export class Button extends TextObject {
    constructor(text, x, y, size, onClick, disabled = false) {
        super(text, x, y, size, Fonts.BODY, colors.SOLID, size * 0.5);
        this.isHover = false;
        this.hoverColor = colors.ULTRABRIGHT;
        this.borderHoverColor = colors.ULTRABRIGHT;
        this.baseColor = colors.SOLID;
        this.towerPrice = 0;
        this.disabled = disabled;
        this.onClick = onClick;
        this.borderWidth = 2;
    }
    update() {
        if (!this.disabled) {
            if (cursor.x > this.x &&
                cursor.y > this.y &&
                cursor.x < this.x + this.w &&
                cursor.y < this.y + this.h) {
                this.isHover = true;
                cursor.setPointer();
                if (cursor.click) {
                    audioPlayer.playAudio(audios.SELECT);
                    this.onClick();
                }
            }
            else {
                this.isHover = false;
            }
        }
        else {
            this.isHover = false;
        }
    }
    draw() {
        if (this.isHover) {
            this.color = colors.ULTRABRIGHT;
            canvas.fillRect(this.x, this.y, this.w, this.h, this.hoverColor);
        }
        else {
            this.color = this.disabled ? colors.MEDIUM : this.baseColor;
        }
        canvas.ctx.font = this.getFontString();
        canvas.ctx.fillStyle = this.isHover ? colors.VOID.toString() : this.color.toString();
        canvas.ctx.fillText("" + this.text, this.x + this.padding, this.y + this.fontOffset + this.padding + 0);
        if (this.borderWidth > 0) {
            canvas.strokeRect(this.x, this.y, this.w, this.h, this.isHover ? this.borderHoverColor.toString() : this.color.toString(), this.borderWidth);
        }
    }
}
