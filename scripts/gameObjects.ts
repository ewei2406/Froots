export interface gameObject {
    x: number
    y: number
    w: number
    h: number
    id: number
    draw()
    update()
    drawBoundingBox()
}

