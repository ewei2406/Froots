import { canvas } from "../Canvas.js";
import { Colors } from "../Color.js";
export class UiObject {
    constructor(x, y, w, h) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    draw() {
        this.canvas.fillRect(this.x, this.y, this.w, this.h, Colors.RED);
    }
    drawBoundingBox() {
        this.canvas.strokeRect(this.x, this.y, this.w, this.h, Colors.GREEN, 1);
    }
}
