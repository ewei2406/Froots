import { Colors } from "../Color.js";
import { Fonts } from "../Font.js";
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
        const c = this.canvas.ctx.measureText("" + this.text);
        this.w = c.actualBoundingBoxRight + this.padding * 2 - c.actualBoundingBoxLeft;
        this.h = c.actualBoundingBoxAscent + c.actualBoundingBoxDescent + this.padding * 2;
        this.fontOffset = c.actualBoundingBoxAscent;
    }
    draw() {
        this.canvas.ctx.font = this.getFontString();
        this.canvas.ctx.fillStyle = this.color.toString();
        this.canvas.ctx.fillText("" + this.text, this.x + this.padding + 0.5, this.y + this.fontOffset + this.padding + 0.5);
    }
}
export class Heading extends TextObject {
    constructor(text, x, y, size) {
        super(text, x, y, size, Fonts.TITLE, Colors.BRIGHT, 0);
        this.lifespan = 0;
    }
    update() {
        this.lifespan++;
        this.color.b = 80 + (Math.sin(this.lifespan * 0.2) * 100);
    }
}
export class Body extends TextObject {
    constructor(text, x, y) {
        super(text, x, y, 20, Fonts.BODY, Colors.SOLID, 5);
    }
}
