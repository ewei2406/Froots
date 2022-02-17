import Canvas from "./canvas";
import { UiObject } from "./gameObjects"

export default class Session {

    UiObjects: Array<UiObject>
    canvas: Canvas

    constructor(canvas: Canvas) {
        console.log("Session created");
        this.canvas = canvas
        this.UiObjects = []
    }

    addUiObject(newUiObject: UiObject) {
        this.UiObjects.push(newUiObject)
    }

    draw() {
        this.UiObjects.forEach(uiElement => {
            uiElement.draw(this.canvas)
        })
    }
}