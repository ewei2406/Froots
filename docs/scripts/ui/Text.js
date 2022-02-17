import { UiObject } from "./UiObject";
export class Text extends UiObject {
    constructor(text, x, y, size, font, color, alignment, canvas) {
        canvas.ctx.font = size + "px " + font;
        super(x, y, canvas.ctx.measureText(text).width, size);
        this.text = text;
        this.size = size;
        this.font = font;
        this.color = color;
        this.alignment = alignment;
    }
}
