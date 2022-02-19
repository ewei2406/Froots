import { canvas } from "../Canvas.js"
import { Colors } from "../Color.js"
import { UiObject } from "../ui/UiObject.js"

class TrackNode {
    x: number
    y: number
    distToNext = 1

    constructor(x: number, y: number, width: number, height: number) {
        this.x = 400 * x / width
        this.y = 300 * y / height
    }

    setDistanceToNext(next: TrackNode) {
        const dx = this.x - next.x
        const dy = this.y - next.y
        this.distToNext = Math.sqrt(dy ** 2 + dx ** 2)
    }
}


class Track {
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
}

class TrackUiObject extends UiObject {

    track: Track

    constructor(track: Track, x: number, y: number, w: number, h: number) {
        super(x, y, w, h)
        this.track = track
    }

    draw(): void {
        const startNode = this.track.nodes[0]
        canvas.startLine(startNode.x, startNode.y, 5, Colors.SOLID)
    }
}