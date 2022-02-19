import { canvas } from "./Canvas.js";
import { Colors } from "./Color.js";
export class Screen {
    constructor() {
        this.canvas = canvas;
        this.UiObjects = [];
    }
    addUiObject(newUiObject) {
        this.UiObjects.push(newUiObject);
    }
    getUiObject(id) {
        return this.UiObjects.find(UiObj => UiObj.id === id);
    }
    update() {
        this.UiObjects.forEach(uiElement => {
            uiElement.update();
        });
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
