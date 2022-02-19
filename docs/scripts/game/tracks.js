import { canvas } from "../Canvas.js";
import { colors } from "../Color.js";
import { UiObject } from "../ui/UiObject.js";
class TrackNode {
    constructor(x, y, width, height) {
        this.distToNext = 1;
        this.x = canvas.width * x / width;
        this.y = canvas.height * y / height;
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
    draw() {
        const startNode = this.nodes[0];
        canvas.startLine(startNode.x, startNode.y, 15, colors.BRIGHT);
        for (let i = 1; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            canvas.lineTo(node.x, node.y);
        }
        canvas.finishLine();
        canvas.startLine(startNode.x, startNode.y, 10, colors.EMPTY);
        for (let i = 1; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            canvas.lineTo(node.x, node.y);
        }
        canvas.finishLine();
    }
}
class TrackUiObject extends UiObject {
    constructor(track, x, y, w, h) {
        super(x, y, w, h);
        this.track = track;
        for (let i = 0; i < this.track.nodes.length; i++) {
            this.track.nodes[i] = this.scaleNode(this.track.nodes[i]);
            this.track.nodes[i].x += this.x;
            this.track.nodes[i].y += this.y;
        }
    }
    scaleNode(node) {
        return new TrackNode(node.x, node.y, (Math.pow(canvas.width, 2)) / this.w, (Math.pow(canvas.height, 2)) / this.h);
    }
    draw() {
        const startNode = this.track.nodes[0];
        canvas.startLine(startNode.x, startNode.y, 5, colors.BRIGHT);
        for (let i = 1; i < this.track.nodes.length; i++) {
            const node = this.track.nodes[i];
            canvas.lineTo(node.x, node.y);
        }
        canvas.finishLine();
    }
}
class Tracks {
    constructor() {
        this.tracks = {};
    }
    addTrack(track, trackName) {
        this.tracks[trackName] = track;
    }
    getTrack(trackName) {
        return this.tracks[trackName];
    }
    getTrackUiObject(trackName, x, y, w, h) {
        const t = this.tracks[trackName];
        return new TrackUiObject(t, x, y, w, h);
    }
}
const tracks = new Tracks();
tracks.addTrack(new Track([[5, 5], [15, 20], [25, 10], [35, 25]], 40, 30), "ZigZag" /* TRACK1 */);
export { tracks };
