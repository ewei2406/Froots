import { canvas } from "../Canvas.js"
import { colors } from "../Color.js"
import { UiObject } from "../ui/UiObject.js"


export class Point {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}


class TrackNode extends Point {
    distToNext = 1

    constructor(x: number, y: number, width: number, height: number) {
        super(x ,y)
        this.x = canvas.width * x / width
        this.y = canvas.height * y / height
    }

    setDistanceToNext(next: TrackNode) {
        const dx = this.x - next.x
        const dy = this.y - next.y
        this.distToNext = Math.sqrt(dy ** 2 + dx ** 2)
    }
}

export class Track {
    nodes: Array<TrackNode>
    length: 0
    startColor = colors.SOLID
    endColor = colors.SOLID
    nodeSize = 10

    constructor(nodes: Array<Array<number>>, n_width: number, n_height: number) {
        this.nodes = []
        nodes.forEach(node => {
            this.nodes.push(new TrackNode(node[0], node[1], n_width, n_height))
        })
        for (let i = 0; i < this.nodes.length - 1; i++) {
            this.nodes[i].setDistanceToNext(this.nodes[i+1])
            this.length += this.nodes[i].distToNext
        }

        this.nodes[this.nodes.length - 1].distToNext = 0

        this.updateLength()
    }

    updateLength() {
        this.length = 0
        this.nodes.forEach(n => {
            this.length += n.distToNext
        })
    }

    draw() {
        const startNode = this.nodes[0]
        canvas.startLine(startNode.x, startNode.y, 1.5, colors.MEDIUM)

        for (let i = 1; i < this.nodes.length; i++) {
            const node = this.nodes[i]
            canvas.lineTo(node.x, node.y)
        }

        canvas.finishLine()

        // canvas.startLine(startNode.x, startNode.y, 10, colors.EMPTY)

        // for (let i = 1; i < this.nodes.length; i++) {
        //     const node = this.nodes[i]
        //     canvas.lineTo(node.x, node.y)
        // }

        // canvas.finishLine()
    }

    drawStart() {
        const startNode = this.nodes[0]
        canvas.fillRect(
            startNode.x - (this.nodeSize / 2), 
            startNode.y - (this.nodeSize / 2), 
            this.nodeSize, this.nodeSize, colors.SOLID)
        canvas.strokeRect(
            startNode.x - (this.nodeSize / 2),
            startNode.y - (this.nodeSize / 2),
            this.nodeSize, this.nodeSize, this.startColor)
    }

    drawEnd() {
        const endNode = this.nodes[this.nodes.length - 1]
        canvas.fillRect(
            endNode.x - (this.nodeSize / 2), 
            endNode.y - (this.nodeSize / 2), 
            this.nodeSize, this.nodeSize, colors.EMPTY)
        canvas.strokeRect(
            endNode.x - (this.nodeSize / 2),
            endNode.y - (this.nodeSize / 2),
            this.nodeSize, this.nodeSize, this.endColor)
    }

    getPosition(distance: number): Point {
        
        const res = new Point(this.nodes[0].x, this.nodes[0].y)
        
        if (distance <= 0) {
            null
        } else if (distance >= this.length) {
            const lastNode = this.nodes.slice(-1)[0]
            res.x = lastNode.x
            res.y = lastNode.y
        } else {

            let a = 0
            let i = 0
            while (a <= distance) {

                if (i >= this.nodes.length) {
                    const lastNode = this.nodes.slice(-1)[0]
                    res.x = lastNode.x
                    res.y = lastNode.y
                    return res
                }

                a += this.nodes[i].distToNext
                i++
            }

            const prevNode = this.nodes[i - 1]
            const p = 1 - ((a - distance) / (prevNode.distToNext))
            res.x = prevNode.x + p * (this.nodes[i].x - prevNode.x)
            res.y = prevNode.y + p * (this.nodes[i].y - prevNode.y)

        }

        return res
    }
}

export class Tracks {
    tracks = {}
    trackNames = []

    addTrack(track: Track, trackName: TrackNames) {
        this.tracks[trackName] = track
        this.trackNames.push(trackName)
    }

    getTrack(trackName: TrackNames): Track {
        return this.tracks[trackName]
    }

    getTrackUiObject(trackName: TrackNames, x: number, y: number, w: number, h: number): TrackUiObject {
        return new TrackUiObject(trackName, x, y, w, h)
    }
}

export const enum TrackNames {
    TRACK1 = "2",
    TRACK2 = "Zig Zag",
    TRACK3 = "Pain"
}

export class TrackUiObject extends UiObject {

    trackName: TrackNames
    showEndpoint: boolean

    constructor(trackName: TrackNames, x: number, y: number, w: number, h: number, showEndpoint=false) {
        super(x, y, w, h)
        this.trackName = trackName
        this.showEndpoint = showEndpoint
    }

    scaleNode(node: TrackNode): TrackNode {
        return new TrackNode(node.x, node.y,
            (canvas.width ** 2) / this.w,
            (canvas.height ** 2) / this.h)
    }

    setX(x: number) {
        this.x = x
    }

    draw(color = colors.BRIGHT): void {
        
        const t = tracks.getTrack(this.trackName)
        
        const startNode = this.scaleNode(t.nodes[0])

        if (this.showEndpoint) {
            canvas.fillRect(startNode.x + this.x - 5, startNode.y + this.y - 5, 10, 10, color)
            canvas.strokeRect(this.x, this.y, this.w, this.h, colors.SOLID, 2.5)
        }

        canvas.startLine(startNode.x + this.x, startNode.y + this.y, 5, color)

        for (let i = 1; i < t.nodes.length - 1; i++) {
            const node = this.scaleNode(t.nodes[i])
            canvas.lineTo(node.x + this.x, node.y + this.y)
        }

        const lastNode = this.scaleNode(t.nodes[t.nodes.length - 1])
        if (this.showEndpoint) {
            const prevNode = this.scaleNode(t.nodes[t.nodes.length - 2])
            canvas.lineArrowTo(
                prevNode.x + this.x, prevNode.y + this.y,
                lastNode.x + this.x, lastNode.y + this.y, 
                5
                )
        } else {
            canvas.lineTo(lastNode.x + this.x, lastNode.y + this.y)
        }

        canvas.finishLine()

        
    }
}

const tracks = new Tracks()
tracks.addTrack(new Track([[0, 5], [35, 5], [35, 15], [5, 15], [5, 25], [40, 25]], 40, 30), TrackNames.TRACK1)
tracks.addTrack(new Track([[0, 5], [15, 20], [25, 10], [40, 25]], 40, 30), TrackNames.TRACK2)
tracks.addTrack(new Track([[0, 5], [40, 25]], 40, 30), TrackNames.TRACK3)

export { tracks }