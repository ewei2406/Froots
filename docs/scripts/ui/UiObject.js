import { canvas } from "../Canvas.js";
import { colors } from "../Color.js";
let maxId = 0;
function generateId() {
    const id = maxId;
    maxId++;
    return id;
}
export class UiObject {
    constructor(x, y, w, h) {
        this.color = colors.SOLID;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.id = generateId();
    }
    draw() {
        canvas.fillRect(this.x, this.y, this.w, this.h, this.color);
    }
    update() {
        null;
    }
    drawBoundingBox() {
        canvas.strokeRect(this.x, this.y, this.w, this.h, colors.DEBUG, 1);
    }
}
