export default class Screen {
    constructor(canvas) {
        this.canvas = canvas;
        this.UiObjects = [];
    }
    addUiObject(newUiObject) {
        this.UiObjects.push(newUiObject);
    }
    draw() {
        this.UiObjects.forEach(uiElement => {
            uiElement.draw(this.canvas);
        });
    }
    drawBoundingBoxes() {
        this.UiObjects.forEach(uiElement => {
            uiElement.drawBoundingBox(this.canvas);
        });
    }
}
