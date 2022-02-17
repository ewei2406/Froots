import { Colors } from "../Color.js";
import { UiObject } from "./UiObject.js";
export class TextObject extends UiObject {
    constructor(text, x, y, size, font, color, padding = 0) {
        super(x, y, 0, 0);
        this.padding = padding;
        this.text = text;
        this.size = size;
        this.font = font;
        this.color = color;
        this.calcSize();
    }
    getFontString() {
        return this.size + "px " + this.font;
    }
    calcSize() {
        this.canvas.ctx.font = this.getFontString();
        const c = this.canvas.ctx.measureText(this.text);
        this.w = c.width + this.padding * 2;
        this.h = c.actualBoundingBoxAscent + c.actualBoundingBoxDescent + this.padding * 2;
        this.fontOffset = c.actualBoundingBoxAscent;
    }
    draw() {
        this.canvas.ctx.font = this.getFontString();
        this.canvas.ctx.fillStyle = this.color.toString();
        this.canvas.ctx.fillText(this.text, this.x + this.padding, this.y + this.fontOffset + this.padding, this.w);
    }
}
export class Heading extends TextObject {
    constructor(text, x, y) {
        super(text, x, y, 70, "Richland", Colors.BLUE, 30);
    }
}
