export interface Color {
    toString(): null | string
}

export class RgbColor implements Color {

    r: number
    g: number
    b: number

    constructor(r: number, g: number, b: number) {
        this.r = r
        this.g = g
        this.b = b
    }

    toString(): string {
        return `rgb(${this.r}, ${this.g}, ${this.b})`
    }
}

export class RgbaColor implements Color {
    
    r: number
    g: number
    b: number
    a: number

    constructor(r: number, g: number, b: number, a: number) {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }

    toString(): string {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
    }
}

const Colors = {
    RED: new RgbColor(255, 0, 0),
    GREEN: new RgbColor(0, 255, 0),
    BLUE: new RgbColor(0, 0, 255),
    BLACK: new RgbColor(0, 0, 0)
}

export { Colors }