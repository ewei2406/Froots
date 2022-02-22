import { colors } from "./Color.js";
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
    fillCircle(x, y, r, color) {
        this.ctx.fillStyle = color.toString();
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI * 2);
        this.ctx.fill();
    }
    strokeCircle(x, y, r, color, lineWidth = 5) {
        this.ctx.strokeStyle = color.toString();
        this.ctx.lineWidth = lineWidth;
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, Math.PI * 2);
        this.ctx.stroke();
    }
    line(x1, y1, x2, y2, width, color = colors.SOLID, lineJoin = "round") {
        this.ctx.strokeStyle = color.toString();
        this.ctx.lineWidth = width;
        // @ts-ignore
        this.ctx.lineJoin = lineJoin;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }
    startLine(x, y, width, color, lineJoin = "round") {
        this.ctx.strokeStyle = color.toString();
        this.ctx.lineWidth = width;
        // @ts-ignore
        this.ctx.lineJoin = lineJoin;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
    }
    lineTo(x, y) {
        this.ctx.lineTo(x, y);
    }
    finishLine() {
        this.ctx.stroke();
    }
    arrowDeg(x, y, theta, magnitude, headsize, lineWidth, color, cap = "butt", lineJoin = "miter") {
        this.ctx.lineWidth = lineWidth;
        this.ctx.lineJoin = lineJoin;
        this.ctx.lineCap = cap;
        this.ctx.strokeStyle = color.toString();
        this.ctx.beginPath();
        const dTheta = Math.atan(headsize / (2 * (magnitude - headsize)));
        this.ctx.moveTo(x, y);
        this.lineTo((magnitude - headsize) * Math.cos(theta) + x, (magnitude - headsize) * Math.sin(theta) + y);
        this.lineTo((magnitude - headsize) * Math.cos(theta + dTheta) + x, (magnitude - headsize) * Math.sin(theta + dTheta) + y);
        this.lineTo((magnitude) * Math.cos(theta) + x, (magnitude) * Math.sin(theta) + y);
        this.lineTo((magnitude - headsize) * Math.cos(theta - dTheta) + x, (magnitude - headsize) * Math.sin(theta - dTheta) + y);
        this.lineTo((magnitude - headsize) * Math.cos(theta) + x, (magnitude - headsize) * Math.sin(theta) + y);
        this.ctx.stroke();
    }
    arrowDegTo(x, y, theta, magnitude, headsize) {
        const dTheta = Math.atan(headsize / (2 * (magnitude - headsize)));
        this.ctx.lineJoin = "miter";
        this.lineTo((magnitude - headsize) * Math.cos(theta) + x, (magnitude - headsize) * Math.sin(theta) + y);
        this.lineTo((magnitude - headsize) * Math.cos(theta + dTheta) + x, (magnitude - headsize) * Math.sin(theta + dTheta) + y);
        this.lineTo((magnitude) * Math.cos(theta) + x, (magnitude) * Math.sin(theta) + y);
        this.lineTo((magnitude - headsize) * Math.cos(theta - dTheta) + x, (magnitude - headsize) * Math.sin(theta - dTheta) + y);
        this.lineTo((magnitude - headsize) * Math.cos(theta) + x, (magnitude - headsize) * Math.sin(theta) + y);
    }
    lineArrow(x1, y1, x2, y2, headsize, lineWidth, color) {
        const theta = Math.atan((y2 - y1) / (x2 - x1));
        const magnitude = Math.sqrt(Math.pow((y2 - y1), 2) + Math.pow((x2 - x1), 2));
        this.arrowDeg(x1, y1, theta, magnitude, headsize, lineWidth, color);
    }
    lineArrowTo(x1, y1, x2, y2, headsize) {
        const theta = Math.atan((y2 - y1) / (x2 - x1));
        const magnitude = Math.sqrt(Math.pow((y2 - y1), 2) + Math.pow((x2 - x1), 2));
        this.arrowDegTo(x1, y1, theta, magnitude, headsize);
    }
    drawPixel(x, y, size, color) {
        this.fillRect(x - size / 2, y - size / 2, size, size, color);
    }
    // PIXEL MANIPULATION
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
                switch (true) {
                    case pixel.g > 150:
                        break;
                    case pixel.g == 1:
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
