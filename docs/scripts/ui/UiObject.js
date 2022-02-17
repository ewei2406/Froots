import { Colors } from "../Color.js";
export class UiObject {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    draw(canvas) {
        this.drawBoundingBox(canvas);
    }
    drawBoundingBox(canvas) {
        canvas.fillRect(this.x, this.y, this.w, this.h, Colors.RED);
    }
}
