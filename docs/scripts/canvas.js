export class Canvas {
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
    screenFill(color) {
        this.ctx.fillStyle = color.toString();
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    fillRect(x, y, w, h, color) {
        this.ctx.fillStyle = color.toString();
        this.ctx.fillRect(x, y, w, h);
    }
    strokeRect(x, y, w, h, color, lineWidth = 5) {
        this.ctx.strokeStyle = color.toString();
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeRect(Math.round(x) - 0.5, Math.round(y) - 0.5, Math.round(w) + 1, Math.round(h) + 1);
    }
    getPixel(x, y) {
        const idx = (y * this.imageData.width * 4) + (x * 4);
        return {
            r: this.imageData.data[idx],
            g: this.imageData.data[idx + 1],
            b: this.imageData.data[idx + 2],
            a: this.imageData.data[idx + 3]
        };
    }
    setPixel(x, y, channel, value) {
        const idx = (y * this.imageData.width * 4) + (x * 4);
        this.imageData.data[idx + channel] = value;
    }
    incrementPixel(x, y, channel, value) {
        const idx = (y * this.imageData.width * 4) + (x * 4);
        this.imageData.data[idx + channel] += value;
    }
    getImageData() {
        this.imageData = this.ctx.getImageData(0, 0, canvas.width, canvas.height);
    }
    setImageData() {
        this.ctx.putImageData(this.imageData, 0, 0);
    }
    applyBloom() {
        for (let x = 0; x < this.canvas.width; x++) {
            for (let y = 0; y < this.canvas.height; y++) {
                const pixel = this.getPixel(x, y);
                if (pixel.b > 0) {
                    const blurRadius = 3;
                    const brightness = pixel.b * (2 / 255);
                    for (let dx = -blurRadius; dx <= blurRadius; dx++) {
                        for (let dy = -blurRadius; dy <= blurRadius; dy++) {
                            const d = brightness * (blurRadius * 2 - (dx * dx + dy * dy) + 5);
                            this.incrementPixel(x + dx, y + dy, 0, Math.max(d, 0));
                        }
                    }
                }
            }
        }
    }
    convertToWhite() {
        for (let x = 0; x < this.canvas.width; x++) {
            for (let y = 0; y < this.canvas.height; y++) {
                const pixel = this.getPixel(x, y);
                switch (pixel.g) {
                    case 255:
                        break;
                    case 1:
                        this.setPixel(x, y, 0, 0);
                        this.setPixel(x, y, 1, 0);
                        this.setPixel(x, y, 2, 0);
                        break;
                    default:
                        this.setPixel(x, y, 1, pixel.r);
                        this.setPixel(x, y, 2, pixel.r);
                }
            }
        }
    }
    postProcess() {
        this.getImageData();
        this.applyBloom();
        this.setImageData();
    }
    processImage() {
        this.getImageData();
        this.convertToWhite();
        this.setImageData();
    }
}
const canvas = new Canvas("gameDisplay", 400, 300);
export { canvas };
