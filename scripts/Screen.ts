import { Canvas, canvas } from "./Canvas.js";
import { Colors } from "./Color.js";
import { UiObject } from "./ui/UiObject.js";

export class Screen {

    UiObjects: Array<UiObject>
    canvas = canvas

    constructor() {
        this.UiObjects = []
    }

    addUiObject(newUiObject: UiObject) {
        this.UiObjects.push(newUiObject)
    }

    update() {
        return null
    }

    draw() {
        this.canvas.clear()
        this.canvas.screenFill(Colors.BLACK) // Set the background color
        this.UiObjects.forEach(uiElement => {
            uiElement.draw()
        })
    }

    drawBoundingBoxes() {
        this.UiObjects.forEach(uiElement => {
            uiElement.drawBoundingBox()
        })
    }
}