export interface Color {
    toString(): null | string
}

export class RgbColor implements Color {

    public r: number
    public g: number
    public b: number

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

class Colors {

    lifespan = 0

    SOLID = new RgbColor(255, 0, 0)
    MEDIUM = new RgbColor(50, 0, 0)
    EMPTY = new RgbColor(0, 0, 0)
    VOID = new RgbColor(0, 1, 0)
    DEBUG = new RgbColor(0, 255, 0)
    BRIGHT = new RgbColor(255, 0, 150)
    FLASHING = new RgbColor(255, 0, 150)
    ULTRABRIGHT = new RgbColor(255, 0, 255)

    update() {
        this.lifespan++
        this.FLASHING.b = 80 + (Math.sin(this.lifespan * 0.2) * 100)
    }
}

const colors = new Colors()

export { colors }