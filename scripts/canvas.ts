import { Color, Colors } from "./Color.js"

export class Canvas {

    public canvas: HTMLCanvasElement
    public ctx: CanvasRenderingContext2D

    public id: string
    public width: number
    public height: number

    imageData: ImageData

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
        this.ctx.strokeRect(Math.round(x) - 0.5, Math.round(y) - 0.5, Math.round(w) + 1, Math.round(h) + 1)
    }

    public line(x1: number, y1: number, x2: number, y2: number, width: number, color=Colors.SOLID) {
        this.ctx.strokeStyle = color.toString()
        this.ctx.lineWidth = width
        this.ctx.beginPath()
        this.ctx.moveTo(x1, y1)
        this.ctx.lineTo(x2, y2)
        this.ctx.stroke()
    }

    public startLine(x: number, y: number, width: number, color = Colors.SOLID) {
        this.ctx.strokeStyle = color.toString()
        this.ctx.lineWidth = width
        this.ctx.beginPath()
        this.ctx.moveTo(x, y)
    }

    public lineTo(x: number, y: number) {
        this.ctx.moveTo(x, y)
    }

    public finishLine() {
        this.ctx.stroke()
    }

    public getPixel(x: number, y: number) {
        const idx = (y * this.imageData.width * 4) + (x * 4)
        return {
            r: this.imageData.data[idx],
            g: this.imageData.data[idx + 1],
            b: this.imageData.data[idx + 2],
            a: this.imageData.data[idx + 3]
        }
    }

    public setPixel(x: number, y: number, channel: number, value: number) {
        const idx = (y * this.imageData.width * 4) + (x * 4)
        this.imageData.data[idx + channel] = value
    }

    public incrementPixel(x: number, y: number, channel: number, value: number) {
        const idx = (y * this.imageData.width * 4) + (x * 4)
        this.imageData.data[idx + channel] += value
    }

    public getImageData() {
        this.imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    public setImageData() {
        this.ctx.putImageData(this.imageData, 0, 0);
    }

    public applyBloom() {
        for (let x = 0; x < this.canvas.width; x++) {
            for (let y = 0; y < this.canvas.height; y++) {
                const pixel = this.getPixel(x, y)

                if (pixel.b > 0) {
                    const blurRadius = 3
                    const brightness = pixel.b * (2 / 255)
                    for (let dx = -blurRadius; dx <= blurRadius; dx++) {
                        for (let dy = -blurRadius; dy <= blurRadius; dy++) {

                            const d = brightness * (blurRadius * 2 - (dx * dx + dy * dy) + 5)

                            this.incrementPixel(x + dx, y + dy, 0, Math.max(d, 0))
                        }
                    }
                }
            }
        }
    }

    public convertToWhite() {
        for (let x = 0; x < this.canvas.width; x++) {
            for (let y = 0; y < this.canvas.height; y++) {
                const pixel = this.getPixel(x, y)
                switch (true) {
                    case pixel.g > 150:
                        break;
                    case pixel.g == 1:
                        this.setPixel(x, y, 0, 0)
                        this.setPixel(x, y, 1, 0)
                        this.setPixel(x, y, 2, 0)
                        break
                    default:
                        this.setPixel(x, y, 1, pixel.r)
                        this.setPixel(x, y, 2, pixel.r)
                }
            }
        }
    }
 
    public postProcess() {
        this.getImageData()
        this.applyBloom()
        this.setImageData()
    }

    public processImage() {
        this.getImageData()
        this.convertToWhite()
        this.setImageData()
    }
}

const canvas = new Canvas("gameDisplay", 400, 300)

export { canvas }