import Canvas from "./canvas.js"

interface gameObject {
    x: number
    y: number
    draw(display: Canvas)
}

class uiObject implements gameObject {
    x: number
    y: number;
    
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    draw(display: Canvas) {
    }
}