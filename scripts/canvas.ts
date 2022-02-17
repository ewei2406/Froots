import { Color, Colors } from "./Color.js"

export class Canvas {

    public canvas: HTMLCanvasElement
    public ctx: CanvasRenderingContext2D

    public id: string
    public width: number
    public height: number

    constructor(canvasId: string, width: number, height: number) {

        this.id = canvasId
        this.width = width
        this.height = height

        this.initializeCanvas()

    }

    private initializeCanvas() {
        this.canvas = document.getElementById(this.id) as HTMLCanvasElement
        this.canvas.oncontextmenu = e => { e.preventDefault(); e.stopPropagation() }
        this.ctx = this.canvas.getContext("2d")
        this.ctx.imageSmoothingEnabled = false

        this.canvas.autofocus = true
        this.canvas.width = this.width
        this.canvas.height = this.height
    }

    public screenFill(color: Color) {
        this.ctx.fillStyle = color.toString()
        this.ctx.fillRect(0, 0, this.width, this.height)
    }

    public clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }

    public fillRect(x: number, y: number, w:number, h:number, color: Color) {
        this.ctx.fillStyle = color.toString()
        this.ctx.fillRect(x, y, w, h)
    }

    public strokeRect(x: number, y: number, w: number, h: number, color: Color, lineWidth = 5) {
        this.ctx.strokeStyle = color.toString()
        this.ctx.lineWidth = lineWidth
        this.ctx.strokeRect(x, y, w, h)
    }
}

const canvas = new Canvas("gameDisplay", 1080, 1080)

export { canvas }