import { canvas } from "./Canvas.js";
import { Colors } from "./Color.js";
export class Screen {
    constructor(matchState) {
        this.canvas = canvas;
        this.UiObjects = [];
        this.matchState = matchState;
    }
    addUiObject(newUiObject) {
        this.UiObjects.push(newUiObject);
    }
    getUiObject(id) {
        return this.UiObjects.find(UiObj => UiObj.id === id);
    }
    update() {
        let newState = null;
        this.UiObjects.every(uiElement => {
            newState = uiElement.update();
            return (newState === null);
        });
        return newState;
    }
    draw() {
        this.canvas.clear();
        this.canvas.screenFill(Colors.EMPTY); // Set the background color
        this.UiObjects.forEach(uiElement => {
            uiElement.draw();
        });
    }
    drawBoundingBoxes() {
        this.UiObjects.forEach(uiElement => {
            uiElement.drawBoundingBox();
        });
    }
}
