export default class Canvas {
    constructor(canvasId) {
        console.log("Working!");
        this.id = canvasId;
        this.canvas = document.getElementById(canvasId);
        this.canvas.oncontextmenu = e => { e.preventDefault(); e.stopPropagation(); };
        this.ctx = this.canvas.getContext("2d");
        this.ctx.imageSmoothingEnabled = false;
        this.canvas.autofocus = true;
        this.canvas.width = 500;
        this.canvas.height = 500;
    }
}
