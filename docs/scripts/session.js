export default class Session {
    constructor(canvas) {
        console.log("Session created");
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
}
