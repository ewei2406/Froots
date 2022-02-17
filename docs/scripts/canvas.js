export default class Canvas {
    constructor(canvasId, width, height) {
        this.id = canvasId;
        this.width = width;
        this.height = height;
        this.initializeCanvas();
    }
    initializeCanvas() {
        this.canvas = document.getElementById(this.id);
        this.canvas.oncontextmenu = e => { e.preventDefault(); e.stopPropagation(); };
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.canvas.autofocus = true;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    fillRect(x, y, w, h, color) {
        this.ctx.fillStyle = color.toString();
        this.ctx.fillRect(x, y, w, h);
    }
}
