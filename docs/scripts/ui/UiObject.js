import { canvas } from "../Canvas.js";
import { colors } from "../Color.js";
let maxId = 0;
function generateId() {
    const id = maxId;
    maxId++;
    return id;
}
export class UiObject {
    constructor(x, y, w, h, color = colors.SOLID, borderColor = null, borderWidth = null) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.id = generateId();
        this.color = color;
        this.borderColor = borderColor;
        this.borderWidth = borderWidth;
    }
    draw() {
        canvas.fillRect(this.x, this.y, this.w, this.h, this.color);
        if (this.borderWidth)
            canvas.strokeRect(this.x, this.y, this.w, this.h, this.borderColor, this.borderWidth);
    }
    update() {
        null;
    }
    drawBoundingBox() {
        canvas.strokeRect(this.x, this.y, this.w, this.h, colors.DEBUG, 1);
    }
    onLoad() {
        return null;
    }
}
