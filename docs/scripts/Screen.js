import { canvas } from "./Canvas.js";
import { colors } from "./Color.js";
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
        this.canvas.screenFill(colors.EMPTY); // Set the background color
        this.UiObjects.forEach(uiElement => {
            uiElement.draw();
        });
    }
    drawBoundingBoxes() {
        this.UiObjects.forEach(uiElement => {
            uiElement.drawBoundingBox();
        });
    }
    onLoad() {
        this.UiObjects.forEach(uiElement => {
            uiElement.onLoad();
        });
    }
}
