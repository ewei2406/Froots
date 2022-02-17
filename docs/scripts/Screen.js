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
    update() {
        return null;
    }
    draw() {
        this.canvas.clear();
        this.canvas.screenFill(Colors.BLACK); // Set the background color
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
