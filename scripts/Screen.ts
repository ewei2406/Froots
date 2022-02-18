import { canvas } from "./Canvas.js";
import { Colors } from "./Color.js";
import { State } from "./Screens.js";
import { UiObject } from "./ui/UiObject.js";

export class Screen {

    UiObjects: Array<UiObject>
    matchState: State
    canvas = canvas

    constructor(matchState: State) {
        this.UiObjects = []
        this.matchState = matchState
    }

    addUiObject(newUiObject: UiObject) {
        this.UiObjects.push(newUiObject)
    }

    getUiObject(id: number): UiObject {
        return this.UiObjects.find(UiObj => UiObj.id === id)
    }

    update(): State {
        let newState = null
        this.UiObjects.every(uiElement => {
            newState = uiElement.update()
            return (newState === null)
        })

        return newState
    }

    draw() {
        this.canvas.clear()
        this.canvas.screenFill(Colors.EMPTY) // Set the background color
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