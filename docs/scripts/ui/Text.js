import { Colors } from "../Color.js";
import { UiObject } from "./UiObject.js";
export class TextObject extends UiObject {
    constructor(text, x, y, size, font, color, canvas, padding = 0) {
        super(x, y, 0, 0);
        this.padding = padding;
        this.text = text;
        this.size = size;
        this.font = font;
        this.color = color;
        this.calcSize(canvas);
    }
    calcSize(canvas) {
        canvas.ctx.font = this.size + "px " + this.font;
        const c = canvas.ctx.measureText(this.text);
        this.w = c.width + this.padding * 2;
        this.h = c.actualBoundingBoxAscent + c.actualBoundingBoxDescent + this.padding * 2;
        this.fontOffset = c.actualBoundingBoxAscent;
    }
    draw(canvas) {
        canvas.ctx.font = this.size + "px " + this.font;
        canvas.ctx.fillStyle = this.color.toString();
        canvas.ctx.fillText(this.text, this.x + this.padding, this.y + this.fontOffset + this.padding, this.w);
    }
}
export class Heading extends TextObject {
    constructor(text, x, y, canvas) {
        super(text, x, y, 70, "Richland", Colors.BLUE, canvas, 30);
    }
}
