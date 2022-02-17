export default class Canvas {

    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private id: string

    constructor(canvasId: string) {

        console.log("Working!");

        this.id = canvasId
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement
        this.canvas.oncontextmenu = e => { e.preventDefault(); e.stopPropagation() }
        this.ctx = this.canvas.getContext("2d")
        this.ctx.imageSmoothingEnabled = false

        this.canvas.autofocus = true
        this.canvas.width = 500
        this.canvas.height = 500
    }
}