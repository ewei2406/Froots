import Canvas from "./canvas.js";
class App {
    constructor() {
        this.display = new Canvas("gameDisplay", 1080, 1080);
        console.log("Working!");
    }
}
new App();
