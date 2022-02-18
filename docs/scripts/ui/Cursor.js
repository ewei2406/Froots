import { canvas } from "../Canvas.js";
class Cursor {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.mouseDown = false;
        this.prevState = false;
        this.click = false;
    }
    update() {
        this.click = false;
        if (this.mouseDown && !this.prevState)
            this.click = true;
        this.prevState = this.mouseDown;
    }
    setMouseDown() {
        this.mouseDown = true;
    }
    setMouseUp() {
        this.mouseDown = false;
        this.click = false;
    }
}
const cursor = new Cursor();
const c = canvas.canvas;
c.addEventListener("mousemove", evt => {
    const rect = c.getBoundingClientRect(), scaleX = c.width / rect.width, scaleY = c.height / rect.height;
    cursor.x = (evt.clientX - rect.left) * scaleX,
        cursor.y = (evt.clientY - rect.top) * scaleY;
}, false);
c.addEventListener("mousedown", () => {
    cursor.setMouseDown();
}, false);
c.addEventListener("mouseleave", () => {
    cursor.setMouseUp();
}, false);
c.addEventListener("mouseup", () => {
    cursor.setMouseUp();
}, false);
export { cursor };
