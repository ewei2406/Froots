import { canvas } from "../Canvas.js";
import { Colors } from "../Color.js";
import { UiObject } from "../ui/UiObject.js";
class TrackNode {
    constructor(x, y, width, height) {
        this.distToNext = 1;
        this.x = 400 * x / width;
        this.y = 300 * y / height;
    }
    setDistanceToNext(next) {
        const dx = this.x - next.x;
        const dy = this.y - next.y;
        this.distToNext = Math.sqrt(Math.pow(dy, 2) + Math.pow(dx, 2));
    }
}
class Track {
    constructor(nodes, n_width, n_height) {
        this.nodes = [];
        nodes.forEach(node => {
            this.nodes.push(new TrackNode(node[0], node[1], n_width, n_height));
        });
        for (let i = 0; i < this.nodes.length - 1; i++) {
            this.nodes[i].setDistanceToNext(this.nodes[i + 1]);
            this.length += this.nodes[i].distToNext;
        }
    }
}
class TrackUiObject extends UiObject {
    constructor(track, x, y, w, h) {
        super(x, y, w, h);
        this.track = track;
    }
    draw() {
        const startNode = this.track.nodes[0];
        canvas.startLine(startNode.x, startNode.y, 5, Colors.SOLID);
    }
}
