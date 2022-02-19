import { canvas } from "../Canvas.js";
import { Colors } from "../Color.js";
let maxId = 0;
function generateId() {
    const id = maxId;
    maxId++;
    return id;
}
export class UiObject {
    constructor(x, y, w, h) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.id = generateId();
    }
    draw() {
        this.canvas.fillRect(this.x, this.y, this.w, this.h, Colors.SOLID);
    }
    update() {
        null;
    }
    drawBoundingBox() {
        this.canvas.strokeRect(this.x, this.y, this.w, this.h, Colors.DEBUG, 1);
    }
}
