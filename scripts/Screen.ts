import { canvas } from "./Canvas.js";
import { colors } from "./Color.js";
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

    getUiObject(id: number): UiObject {
        return this.UiObjects.find(UiObj => UiObj.id === id)
    }

    update(): void {
        this.UiObjects.forEach(uiElement => {
            uiElement.update()
        })
    }

    draw() {
        this.canvas.clear()
        this.canvas.screenFill(colors.EMPTY) // Set the background color
        this.UiObjects.forEach(uiElement => {
            uiElement.draw()
        })
    }

    drawBoundingBoxes() {
        this.UiObjects.forEach(uiElement => {
            uiElement.drawBoundingBox()
        })
    }

    onLoad(): void {
        this.UiObjects.forEach(uiElement => {
            uiElement.onLoad()
        })
    }
}