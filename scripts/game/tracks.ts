import { canvas } from "../Canvas.js"
import { colors } from "../Color.js"
import { UiObject } from "../ui/UiObject.js"



class TrackNode {
    x: number
    y: number
    distToNext = 1

    constructor(x: number, y: number, width: number, height: number) {
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

    constructor(nodes: Array<Array<number>>, n_width: number, n_height: number) {
        this.nodes = []
        nodes.forEach(node => {
            this.nodes.push(new TrackNode(node[0], node[1], n_width, n_height))
        })
        for (let i = 0; i < this.nodes.length - 1; i++) {
            this.nodes[i].setDistanceToNext(this.nodes[i+1])
            this.length += this.nodes[i].distToNext
        }
    }

    draw() {
        const startNode = this.nodes[0]
        canvas.startLine(startNode.x, startNode.y, 15, colors.BRIGHT)

        for (let i = 1; i < this.nodes.length; i++) {
            const node = this.nodes[i]
            canvas.lineTo(node.x, node.y)
        }

        canvas.finishLine()

        canvas.startLine(startNode.x, startNode.y, 10, colors.EMPTY)

        for (let i = 1; i < this.nodes.length; i++) {
            const node = this.nodes[i]
            canvas.lineTo(node.x, node.y)
        }

        canvas.finishLine()
    }
}

export class TrackUiObject extends UiObject {

    track: Track

    constructor(track: Track, x: number, y: number, w: number, h: number) {
        super(x, y, w, h)
        this.track = track

        for(let i = 0; i < this.track.nodes.length; i++) {
            this.track.nodes[i] = this.scaleNode(this.track.nodes[i])
        }
    }

    scaleNode(node: TrackNode): TrackNode {
        return new TrackNode(node.x, node.y, 
            (canvas.width ** 2) / this.w, 
            (canvas.height ** 2) / this.h)
    }

    setX(x : number) {
        this.x = x
    }

    draw(color=colors.BRIGHT): void {
        const startNode = this.track.nodes[0]
        canvas.startLine(startNode.x + this.x, startNode.y + this.y, 5, color)

        for (let i = 1; i < this.track.nodes.length; i++) {
            const node = this.track.nodes[i]
            canvas.lineTo(node.x + this.x, node.y + this.y)
        }

        canvas.finishLine()
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
        const t = this.tracks[trackName]
        return new TrackUiObject(t, x, y, w, h)
    }
}

export const enum TrackNames {
    TRACK1 = "Logs",
    TRACK2 = "Zig Zag",
    TRACK3 = "Pain"
}

const tracks = new Tracks()
tracks.addTrack(new Track([[5, 5], [35, 5], [35, 15], [5, 15], [5, 25], [35, 25]], 40, 30), TrackNames.TRACK1)
tracks.addTrack(new Track([[5, 5], [15, 20], [25, 10], [35, 25]], 40, 30), TrackNames.TRACK2)
tracks.addTrack(new Track([[5, 5], [35, 25]], 40, 30), TrackNames.TRACK3)

export { tracks }