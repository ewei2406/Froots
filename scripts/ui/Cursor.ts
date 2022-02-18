import { canvas } from "../Canvas.js";

class Cursor {
    x = 0
    y = 0
    mouseDown = false
    prevState = false
    click = false

    update(): void {
        this.click = false
        if (this.mouseDown && !this.prevState) this.click = true
        this.prevState = this.mouseDown
    }

    setMouseDown(): void {
        this.mouseDown = true
    }

    setMouseUp(): void {
        this.mouseDown = false
        this.click = false
    }
}

const cursor = new Cursor()

const c = canvas.canvas

c.addEventListener("mousemove", evt => {
    const rect = c.getBoundingClientRect(),
        scaleX = c.width / rect.width,
        scaleY = c.height / rect.height;

    cursor.x = (evt.clientX - rect.left) * scaleX,
    cursor.y = (evt.clientY - rect.top) * scaleY
}, false)

c.addEventListener("mousedown", () => {
    cursor.setMouseDown()
}, false)

c.addEventListener("mouseleave", () => {
    cursor.setMouseUp()
}, false)

c.addEventListener("mouseup", () => {
    cursor.setMouseUp()
}, false)

export { cursor }